type FetchOptions = RequestInit & {
  params?: Record<string, string | number | boolean>;
};

export type FetchError = {
  success: false;
  message: string;
  error?: string;
  statusCode?: number;
  errors?: Record<string, string[]>; // For validation errors
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

  private async request<T>(
    endpoint: string,
    options: FetchOptions = {}
  ): Promise<T | FetchError> {
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
          return {
            success: false,
            message: `HTTP error! status: ${response.status}`,
            statusCode: response.status,
          } as FetchError;
        }
        // For successful non-JSON responses, return empty success object
        return { success: true } as T;
      }

      const data = await response.json();

      if (!response.ok) {
        return {
          success: false,
          message: data.message || `HTTP error! status: ${response.status}`,
          error: data.error,
          statusCode: response.status,
          errors: data.errors,
        } as FetchError;
      }

      return data as T;
    } catch (error) {
      console.error("[Fetch Error]:", error);
      return {
        success: false,
        message:
          error instanceof Error ? error.message : "Network error occurred",
        error: "CLIENT_ERROR",
      } as FetchError;
    }
  }

  async get<T>(
    endpoint: string,
    options?: FetchOptions
  ): Promise<T | FetchError> {
    return this.request<T>(endpoint, { ...options, method: "GET" });
  }

  async post<T>(
    endpoint: string,
    body?: unknown,
    options?: FetchOptions
  ): Promise<T | FetchError> {
    return this.request<T>(endpoint, {
      ...options,
      method: "POST",
      body: body ? JSON.stringify(body) : undefined,
    });
  }

  async put<T>(
    endpoint: string,
    body?: unknown,
    options?: FetchOptions
  ): Promise<T | FetchError> {
    return this.request<T>(endpoint, {
      ...options,
      method: "PUT",
      body: body ? JSON.stringify(body) : undefined,
    });
  }

  async patch<T>(
    endpoint: string,
    body?: unknown,
    options?: FetchOptions
  ): Promise<T | FetchError> {
    return this.request<T>(endpoint, {
      ...options,
      method: "PATCH",
      body: body ? JSON.stringify(body) : undefined,
    });
  }

  async delete<T>(
    endpoint: string,
    options?: FetchOptions
  ): Promise<T | FetchError> {
    return this.request<T>(endpoint, { ...options, method: "DELETE" });
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

export function isFetchError(
  response: unknown
): response is { success: false; message: string } {
  return (
    typeof response === "object" &&
    response !== null &&
    "success" in response &&
    response.success === false
  );
}

// Also export the class for custom instances
export { FetchClient };
export type { FetchOptions };
