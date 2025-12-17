import {
  deleteCookieClient,
  getCookieClient,
  setCookieClient,
} from "./cookies-client";

type Params = Record<string, string | number | boolean>;

type FetchOptions<P = Params> = RequestInit & {
  params?: P;
  skipAuth?: boolean;
  returnResponse?: boolean;
};

interface QueuedRequest<T = unknown> {
  endpoint: string;
  options: FetchOptions;
  resolve: (value: T | PromiseLike<T | null> | null) => void;
  reject: (reason?: Error) => void;
}

class FetchClient {
  private baseURL: string;
  private defaultHeaders: HeadersInit;
  private isRefreshing = false;
  private failedRequestsQueue: QueuedRequest<unknown>[] = [];

  constructor(baseURL: string, defaultHeaders: HeadersInit = {}) {
    this.baseURL = baseURL;
    this.defaultHeaders = {
      "Content-Type": "application/json",
      ...defaultHeaders,
    };
  }

  private async getAccessToken(): Promise<string | null> {
    if (typeof window !== "undefined") {
      return getCookieClient("accessToken");
    }

    try {
      const { cookies } = await import("next/headers");
      const cookieStore = await cookies();
      return cookieStore.get("accessToken")?.value || null;
    } catch (error) {
      console.error("[Auth Error]: Failed to get cookies", error);
      return null;
    }
  }

  private async refreshAccessToken(): Promise<boolean> {
    let refreshToken: string | null = null;

    if (typeof window !== "undefined") {
      refreshToken = getCookieClient("refreshToken");
    } else {
      try {
        const { cookies } = await import("next/headers");
        const cookieStore = await cookies();
        refreshToken = cookieStore.get("refreshToken")?.value || null;
      } catch (error) {
        console.error("[Auth Error]: Failed to get refresh token", error);
      }
    }

    if (!refreshToken) {
      console.error("[Auth Error]: No refresh token available");

      if (typeof window !== "undefined") {
        deleteCookieClient("accessToken");
        deleteCookieClient("refreshToken");
        window.location.href = "/login";
      }

      return false;
    }

    try {
      const response = await fetch(`${this.baseURL}/auth/refresh-token`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ refreshToken }),
      });

      if (!response.ok) {
        throw new Error("Failed to refresh token");
      }

      const data = await response.json();

      if (data.success && data.data?.accessToken) {
        if (typeof window !== "undefined") {
          setCookieClient("accessToken", data.data.accessToken);
          if (data.data.refreshToken) {
            setCookieClient("refreshToken", data.data.refreshToken);
          }
        }

        console.log("[Auth]: Token refreshed successfully");
        return true;
      }

      throw new Error("Invalid refresh token response");
    } catch (error) {
      console.error("[Auth Error]: Token refresh failed", error);

      if (typeof window !== "undefined") {
        deleteCookieClient("accessToken");
        deleteCookieClient("refreshToken");
        window.location.href = "/login";
      }

      return false;
    }
  }

  private async processQueue() {
    const queue = [...this.failedRequestsQueue];
    this.failedRequestsQueue = [];

    for (const queuedRequest of queue) {
      try {
        const result = await this.request(
          queuedRequest.endpoint,
          queuedRequest.options
        );
        queuedRequest.resolve(result);
      } catch (error) {
        queuedRequest.reject(
          error instanceof Error ? error : new Error("Unknown error")
        );
      }
    }
  }

  private async request<T, P = Params>(
    endpoint: string,
    options: FetchOptions<P> = {} as FetchOptions<P>,
    isRetry = false
  ): Promise<T | null> {
    const { params, headers, skipAuth, returnResponse, ...restOptions } =
      options;

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

    const accessToken = await this.getAccessToken();

    const requestHeaders: HeadersInit = {
      ...this.defaultHeaders,
      ...headers,
    };

    if (accessToken && !skipAuth) {
      (requestHeaders as Record<string, string>)["Authorization"] = accessToken;
    } else {
      console.log(
        "No authorization header - skipAuth:",
        skipAuth,
        "hasToken:",
        !!accessToken
      );
    }

    try {
      const response = await fetch(url, {
        ...restOptions,
        credentials: "include",
        headers: requestHeaders,
      });

      if (response.status === 401 && !isRetry && !skipAuth) {
        if (this.isRefreshing) {
          return new Promise<T | null>((resolve, reject) => {
            this.failedRequestsQueue.push({
              endpoint,
              options: options as FetchOptions,
              resolve: resolve as (
                value: unknown | PromiseLike<unknown | null> | null
              ) => void,
              reject,
            });
          });
        }

        this.isRefreshing = true;

        try {
          const refreshSuccess = await this.refreshAccessToken();

          if (refreshSuccess) {
            const retryResult = await this.request<T, P>(
              endpoint,
              options,
              true
            );
            await this.processQueue();
            return retryResult;
          } else {
            this.failedRequestsQueue.forEach((req) =>
              req.reject(new Error("Token refresh failed"))
            );
            this.failedRequestsQueue = [];
            return null;
          }
        } finally {
          this.isRefreshing = false;
        }
      }

      const contentType = response.headers.get("content-type");
      if (!contentType || !contentType.includes("application/json")) {
        if (!response.ok) {
          console.error(`[Fetch Error]: HTTP ${response.status} - ${endpoint}`);
          return null;
        }
        if (returnResponse) {
          return { success: true, response } as T;
        }
        return { success: true } as T;
      }

      const data = await response.json();

      if (!response.ok) {
        console.warn(`[API Error]: ${data?.message || response?.status}`, {
          endpoint,
          status: response?.status,
          data: data,
        });
      }

      if (returnResponse) {
        return { ...data, response } as T;
      }

      return data as T;
    } catch (error) {
      console.error(
        "[Network Error]:",
        error instanceof Error ? error.message : "Unknown error",
        {
          endpoint,
          error,
        }
      );
      return null;
    }
  }

  async get<T, P = Params>(
    endpoint: string,
    options?: FetchOptions<P>
  ): Promise<T | null> {
    return this.request<T, P>(endpoint, {
      ...options,
      method: "GET",
    });
  }

  async post<T, P = Params>(
    endpoint: string,
    options?: FetchOptions<P>
  ): Promise<T | null> {
    return this.request<T, P>(endpoint, {
      ...options,
      method: "POST",
    } as FetchOptions<P>);
  }

  async put<T, P = Params>(
    endpoint: string,
    options?: FetchOptions<P>
  ): Promise<T | null> {
    return this.request<T, P>(endpoint, {
      ...options,
      method: "PUT",
    } as FetchOptions<P>);
  }

  async patch<T, P = Params>(
    endpoint: string,
    options?: FetchOptions<P>
  ): Promise<T | null> {
    return this.request<T, P>(endpoint, {
      ...options,
      method: "PATCH",
    } as FetchOptions<P>);
  }

  async delete<T, P = Params>(
    endpoint: string,
    options?: FetchOptions<P>
  ): Promise<T | null> {
    return this.request<T, P>(endpoint, {
      ...options,
      method: "DELETE",
    } as FetchOptions<P>);
  }

  setBaseURL(newBaseURL: string) {
    this.baseURL = newBaseURL;
  }

  // Method to update default headers
  setHeaders(headers: HeadersInit) {
    this.defaultHeaders = { ...this.defaultHeaders, ...headers };
  }

  clearAuth() {
    if (typeof window !== "undefined") {
      deleteCookieClient("accessToken");
      deleteCookieClient("refreshToken");
    }
  }
}

export const $fetch = new FetchClient(
  process.env.NEXT_PUBLIC_BASE_API_URL || "http://localhost:5000/api/v1"
);

// Also export the class for custom instances
export { FetchClient };
export type { FetchOptions };
