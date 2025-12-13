const BACKEND_API_URL =
  process.env.NEXT_PUBLIC_BASE_API_URL ?? "http://localhost:5000/api/v1";

export const fetchHelper = async (
  endpoint: string,
  options: RequestInit = {}
) => {
  return fetch(`${BACKEND_API_URL}${endpoint}`, {
    ...options,
    cache: "no-store",
    credentials: "include", // ✅ important
  });
};

export const $fetch = {
  get: (endpoint: string, options?: RequestInit) =>
    fetchHelper(endpoint, { ...options, method: "GET" }),

  post: (endpoint: string, options?: RequestInit) =>
    fetchHelper(endpoint, { ...options, method: "POST" }),

  put: (endpoint: string, options?: RequestInit) =>
    fetchHelper(endpoint, { ...options, method: "PUT" }),

  patch: (endpoint: string, options?: RequestInit) =>
    fetchHelper(endpoint, { ...options, method: "PATCH" }),

  delete: (endpoint: string, options?: RequestInit) =>
    fetchHelper(endpoint, { ...options, method: "DELETE" }),
};
