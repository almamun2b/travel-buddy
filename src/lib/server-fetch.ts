import { getCookie } from "@/services/auth/tokenHandlers";

const BACKEND_API_URL =
  process.env.NEXT_PUBLIC_BASE_API_URL || "http://localhost:5000/api/v1";

const fetchHelper = async (
  endpoint: string,
  options: RequestInit
): Promise<Response> => {
  const { headers, ...restOptions } = options;
  const accessToken = await getCookie("accessToken");

  //to stop recursion loop
  // if (endpoint !== "/auth/refresh-token") {
  //   await getNewAccessToken();
  // }

  const response = await fetch(`${BACKEND_API_URL}${endpoint}`, {
    headers: {
      Cookie: accessToken ? `accessToken=${accessToken}` : "",
      ...headers,
    },
    ...restOptions,
    cache: "no-store",
  });

  return response;
};

export const $fetch = {
  get: async (endpoint: string, options: RequestInit = {}): Promise<Response> =>
    fetchHelper(endpoint, { ...options, method: "GET" }),

  post: async (
    endpoint: string,
    options: RequestInit = {}
  ): Promise<Response> => fetchHelper(endpoint, { ...options, method: "POST" }),

  put: async (endpoint: string, options: RequestInit = {}): Promise<Response> =>
    fetchHelper(endpoint, { ...options, method: "PUT" }),

  patch: async (
    endpoint: string,
    options: RequestInit = {}
  ): Promise<Response> =>
    fetchHelper(endpoint, { ...options, method: "PATCH" }),

  delete: async (
    endpoint: string,
    options: RequestInit = {}
  ): Promise<Response> =>
    fetchHelper(endpoint, { ...options, method: "DELETE" }),
};

/**
 *
 * $fetch.get("/auth/me")
 * $fetch.post("/auth/login", { body: JSON.stringify({}) })
 */
