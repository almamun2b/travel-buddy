type FetchOptions<P = Record<string, string | number | boolean>> =
  RequestInit & {
    params?: P;
    skipAuthRefresh?: boolean;
  };

type RequestContext<P> = {
  endpoint: string;
  url: string;
  options: FetchOptions<P>;
};

type ResponseContext<P> = {
  endpoint: string;
  url: string;
  options: FetchOptions<P>;
  response: Response;
};

type FetchHooks = {
  onRequest?: <P>(ctx: RequestContext<P>) => void | Promise<void>;
  onResponse?: <P>(ctx: ResponseContext<P>) => void | Promise<void>;
  onError?: <P>(error: unknown, ctx: RequestContext<P>) => void | Promise<void>;
};

function toAbsoluteUrl(url: string) {
  if (typeof window !== "undefined") return url;
  if (!url.startsWith("/")) return url;
  const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";
  return new URL(url, appUrl).toString();
}

async function getServerCookieHeader(): Promise<string> {
  if (typeof window !== "undefined") return "";

  // Use dynamic import so this file can still be bundled for the client.
  const { cookies } = await import("next/headers");
  const store = await cookies();
  const all = store.getAll();
  if (!all.length) return "";
  return all.map((c) => `${c.name}=${c.value}`).join("; ");
}

class FetchClient {
  private baseURL: string;
  private defaultHeaders: HeadersInit;
  private hooks: FetchHooks;

  constructor(
    baseURL: string,
    defaultHeaders: HeadersInit = {},
    hooks: FetchHooks = {}
  ) {
    this.baseURL = baseURL;
    this.defaultHeaders = {
      "Content-Type": "application/json",
      ...defaultHeaders,
    };
    this.hooks = hooks;
  }

  private async request<T, P = Record<string, string | number | boolean>>(
    endpoint: string,
    options: FetchOptions<P> = {} as FetchOptions<P>
  ): Promise<T | null> {
    const { params, headers, ...restOptions } = options;

    // Build URL with query params
    let url = `${this.baseURL}${endpoint}`;
    if (params) {
      const queryString = new URLSearchParams(
        Object.entries(params).reduce((acc, [key, value]) => {
          acc[key] = String(value);
          return acc;
        }, {} as Record<string, string>)
      ).toString();
      url += `?${queryString}`;
    }

    url = toAbsoluteUrl(url);

    const serverCookieHeader = await getServerCookieHeader();
    const mergedHeaders: HeadersInit = {
      ...this.defaultHeaders,
      ...(typeof headers === "object" ? (headers as HeadersInit) : {}),
      ...(serverCookieHeader ? { Cookie: serverCookieHeader } : {}),
    };

    const reqCtx: RequestContext<P> = {
      endpoint,
      url,
      options,
    };

    try {
      await this.hooks.onRequest?.(reqCtx);

      const response = await fetch(url, {
        ...restOptions,
        credentials: "include", // Include cookies for auth
        headers: mergedHeaders,
      });

      // axios-like: if unauthorized, attempt refresh once then retry
      if (
        response.status === 401 &&
        endpoint !== "/auth/refresh-token" &&
        options.skipAuthRefresh !== true
      ) {
        const refreshed = await this.refreshAuth();
        if (refreshed) {
          const retryRes = await fetch(url, {
            ...restOptions,
            credentials: "include",
            headers: mergedHeaders,
          });
          await this.hooks.onResponse?.({
            endpoint,
            url,
            options,
            response: retryRes,
          });
          return await this.parseResponse<T>(endpoint, retryRes);
        }
      }

      await this.hooks.onResponse?.({
        endpoint,
        url,
        options,
        response,
      });

      return await this.parseResponse<T>(endpoint, response);
    } catch (error) {
      await this.hooks.onError?.(error, reqCtx);
      // Log client/network error
      console.warn(
        "[Network Error]:",
        error instanceof Error ? error.message : "Unknown error",
        {
          endpoint,
        }
      );
      return null;
    }
  }

  private async parseResponse<T>(endpoint: string, response: Response): Promise<T | null> {
    const contentType = response.headers.get("content-type");
    if (!contentType || !contentType.includes("application/json")) {
      if (!response.ok) {
        console.warn(`[Fetch Error]: HTTP ${response.status} - ${endpoint}`);
        return null;
      }
      return { success: true } as T;
    }

    const data = await response.json();

    if (!response.ok) {
      console.warn(`[API Error]: ${data?.message || response.status}`, {
        endpoint,
        status: response.status,
        error: data?.error,
        errors: data?.errors,
      });
      return null;
    }

    return data as T;
  }

  private async refreshAuth(): Promise<boolean> {
    try {
      const refreshUrl = toAbsoluteUrl(`${this.baseURL}/auth/refresh-token`);
      const serverCookieHeader = await getServerCookieHeader();
      const res = await fetch(refreshUrl, {
        method: "POST",
        credentials: "include",
        headers: {
          ...this.defaultHeaders,
          ...(serverCookieHeader ? { Cookie: serverCookieHeader } : {}),
        },
        cache: "no-store",
      });
      return res.ok;
    } catch {
      return false;
    }
  }

  async get<T, P = Record<string, string | number | boolean>>(
    endpoint: string,
    options?: FetchOptions<P>
  ): Promise<T | null> {
    return this.request<T, P>(endpoint, {
      ...options,
      method: "GET",
    } as FetchOptions<P>);
  }

  async post<T, P = Record<string, string | number | boolean>>(
    endpoint: string,
    bodyOrOptions?: unknown,
    options?: FetchOptions<P>
  ): Promise<T | null> {
    // Support both:
    // - post(endpoint, body, options)
    // - post(endpoint, options)   (used by server-fetch style)
    const inferredOptions: FetchOptions<P> | undefined =
      options ??
      (typeof bodyOrOptions === "object" && bodyOrOptions !== null
        ? (bodyOrOptions as FetchOptions<P>)
        : undefined);

    const inferredBody = options ? bodyOrOptions : undefined;

    return this.request<T, P>(endpoint, {
      ...inferredOptions,
      method: "POST",
      body: inferredBody ? JSON.stringify(inferredBody) : inferredOptions?.body,
    } as FetchOptions<P>);
  }

  async put<T, P = Record<string, string | number | boolean>>(
    endpoint: string,
    body?: unknown,
    options?: FetchOptions<P>
  ): Promise<T | null> {
    return this.request<T, P>(endpoint, {
      ...options,
      method: "PUT",
      body: body ? JSON.stringify(body) : undefined,
    } as FetchOptions<P>);
  }

  async patch<T, P = Record<string, string | number | boolean>>(
    endpoint: string,
    body?: unknown,
    options?: FetchOptions<P>
  ): Promise<T | null> {
    return this.request<T, P>(endpoint, {
      ...options,
      method: "PATCH",
      body: body ? JSON.stringify(body) : undefined,
    } as FetchOptions<P>);
  }

  async delete<T, P = Record<string, string | number | boolean>>(
    endpoint: string,
    options?: FetchOptions<P>
  ): Promise<T | null> {
    return this.request<T, P>(endpoint, {
      ...options,
      method: "DELETE",
    } as FetchOptions<P>);
  }

  // Method to update base URL if needed
  setBaseURL(newBaseURL: string) {
    this.baseURL = newBaseURL;
  }

  // Method to update default headers
  setHeaders(headers: HeadersInit) {
    this.defaultHeaders = { ...this.defaultHeaders, ...headers };
  }

  setHooks(hooks: FetchHooks) {
    this.hooks = hooks;
  }
}

// Create and export the default instance
export const $fetch = new FetchClient(
  "/api/v1"
);

// Also export the class for custom instances
export { FetchClient };
export type { FetchOptions };
