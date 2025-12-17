"use server";
/* eslint-disable @typescript-eslint/no-explicit-any */

// import { $fetch } from "@/lib/server-fetch";
import { $fetch } from "@/lib/fetch";
import { AuthResponse } from "@/types/travelPlan";
import { parse } from "cookie";
import { setCookie } from "./tokenHandlers";

export interface ParsedCookie {
  [key: string]: string | undefined;
}

export const loginUser = async (data: any) => {
  const response = await $fetch.post<AuthResponse & any>("/auth/login", {
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
    skipAuth: true,
    returnResponse: true,
  });

  if (!response?.success) {
    return { success: false, error: response?.message || "Login failed" };
  }

  // Extract Set-Cookie headers from the response
  const setCookieHeaders = response.response?.headers.getSetCookie();

  if (setCookieHeaders && setCookieHeaders.length > 0) {
    let accessTokenData: ParsedCookie = {};
    let refreshTokenData: ParsedCookie = {};

    setCookieHeaders.forEach((cookieString: string) => {
      const parsed: ParsedCookie = parse(cookieString);

      if (parsed.accessToken) {
        accessTokenData = parsed;
      }
      if (parsed.refreshToken) {
        refreshTokenData = parsed;
      }
    });

    if (accessTokenData.accessToken) {
      await setCookie("accessToken", accessTokenData.accessToken, {
        secure: true,
        httpOnly: true,
        maxAge: accessTokenData["Max-Age"]
          ? Number.parseInt(accessTokenData["Max-Age"])
          : 3600,
        path: accessTokenData.Path || "/",
        sameSite:
          (accessTokenData.SameSite?.toLowerCase() as
            | "strict"
            | "lax"
            | "none") || "lax",
      });
    }

    if (refreshTokenData.refreshToken) {
      await setCookie("refreshToken", refreshTokenData.refreshToken, {
        secure: true,
        httpOnly: true,
        maxAge: refreshTokenData["Max-Age"]
          ? Number.parseInt(refreshTokenData["Max-Age"])
          : 7776000, // 90 days default
        path: refreshTokenData.Path || "/",
        sameSite:
          (refreshTokenData.SameSite?.toLowerCase() as
            | "strict"
            | "lax"
            | "none") || "lax",
      });
    }
  }

  return { success: true, message: response.message, data: response.data };
};
