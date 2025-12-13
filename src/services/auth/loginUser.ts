"use server";

/* eslint-disable @typescript-eslint/no-explicit-any */
import { $fetch } from "@/lib/server-fetch";
import { parse } from "cookie";
import { setCookie } from "./tokenHandlers";

export const loginUser = async (data: any) => {
  try {
    const payload = {
      email: data.email,
      password: data.password,
    };

    // 🔥 call backend
    const res = await $fetch.post("/auth/login", {
      body: JSON.stringify(payload),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const result = await res.json();

    if (!result?.success) {
      return result;
    }

    // 🔥 extract Set-Cookie headers
    const setCookieHeaders = res.headers.getSetCookie();

    if (!setCookieHeaders || setCookieHeaders.length === 0) {
      return {
        success: false,
        message: "No cookies received from backend",
      };
    }

    let accessTokenObject: any = null;
    let refreshTokenObject: any = null;

    setCookieHeaders.forEach((cookieString: string) => {
      const parsed = parse(cookieString);

      if (parsed.accessToken) accessTokenObject = parsed;
      if (parsed.refreshToken) refreshTokenObject = parsed;
    });

    if (!accessTokenObject || !refreshTokenObject) {
      return {
        success: false,
        message: "Tokens missing in cookie response",
      };
    }

    await setCookie("accessToken", accessTokenObject.accessToken, {
      secure: true,
      httpOnly: true,
      maxAge: parseInt(accessTokenObject["Max-Age"]) || 60 * 60,
      path: accessTokenObject.Path || "/",
      sameSite: accessTokenObject["SameSite"] || "none",
    });

    // save refresh token
    await setCookie("refreshToken", refreshTokenObject.refreshToken, {
      secure: true,
      httpOnly: true,
      maxAge: parseInt(refreshTokenObject["Max-Age"]) || 60 * 60 * 24 * 90,
      path: refreshTokenObject.Path || "/",
      sameSite: refreshTokenObject["SameSite"] || "none",
    });

    return result;
  } catch (error: any) {
    console.error("Login Error:", error);

    return {
      success: false,
      message:
        process.env.NODE_ENV === "development"
          ? error.message
          : "Login failed. Incorrect email or password.",
    };
  }
};
