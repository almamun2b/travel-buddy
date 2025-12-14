type Params = Record<string, string | number | boolean>;

type FetchOptions<P = Params> = RequestInit & {
  params?: P;
};

class FetchClient {
  private baseURL: string;
  private defaultHeaders: HeadersInit;

  constructor(baseURL: string, defaultHeaders: HeadersInit = {}) {
    this.baseURL = baseURL;
    this.defaultHeaders = {
      "Content-Type": "application/json",
      ...defaultHeaders,
    };
  }

  private async request<T, P = Params>(
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

    try {
      const response = await fetch(url, {
        ...restOptions,
        credentials: "include", // Include cookies for auth
        headers: {
          ...this.defaultHeaders,
          ...headers,
        },
      });

      // Handle non-JSON responses
      const contentType = response.headers.get("content-type");
      if (!contentType || !contentType.includes("application/json")) {
        if (!response.ok) {
          console.error(`[Fetch Error]: HTTP ${response.status} - ${endpoint}`);
          return null;
        }
        // For successful non-JSON responses, return empty success object
        return { success: true } as T;
      }

      const data = await response.json();

      if (!response.ok) {
        // Log API error
        console.warn(`[API Error]: ${data?.message || response?.status}`, {
          endpoint,
          status: response?.status,
          data: data,
        });
      }

      return data as T;
    } catch (error) {
      // Log client/network error
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
    body?: unknown,
    options?: FetchOptions<P>
  ): Promise<T | null> {
    return this.request<T, P>(endpoint, {
      ...options,
      method: "POST",
      body: body ? JSON.stringify(body) : undefined,
    });
  }

  async put<T, P = Params>(
    endpoint: string,
    body?: unknown,
    options?: FetchOptions<P>
  ): Promise<T | null> {
    return this.request<T, P>(endpoint, {
      ...options,
      method: "PUT",
      body: body ? JSON.stringify(body) : undefined,
    });
  }

  async patch<T, P = Params>(
    endpoint: string,
    body?: unknown,
    options?: FetchOptions<P>
  ): Promise<T | null> {
    return this.request<T, P>(endpoint, {
      ...options,
      method: "PATCH",
      body: body ? JSON.stringify(body) : undefined,
    });
  }

  async delete<T, P = Params>(
    endpoint: string,
    options?: FetchOptions<P>
  ): Promise<T | null> {
    return this.request<T, P>(endpoint, {
      ...options,
      method: "DELETE",
    });
  }

  // Method to update base URL if needed
  setBaseURL(newBaseURL: string) {
    this.baseURL = newBaseURL;
  }

  // Method to update default headers
  setHeaders(headers: HeadersInit) {
    this.defaultHeaders = { ...this.defaultHeaders, ...headers };
  }
}

// Create and export the default instance
export const $fetch = new FetchClient(
  "https://travel-buddy-api-5xvg.onrender.com/api/v1"
);

// Also export the class for custom instances
export { FetchClient };
export type { FetchOptions };
