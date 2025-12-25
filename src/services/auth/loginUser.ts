"use server";
/* eslint-disable @typescript-eslint/no-explicit-any */

import { $fetch } from "@/lib/server-fetch";
import { AuthResponse } from "@/types/travelPlan";

export interface ParsedCookie {
  [key: string]: string | undefined;
}

export const loginUser = async (data: any) => {
  const res = await $fetch.post("/auth/login", {
    body: JSON.stringify({
      email: data?.email,
      password: data?.password,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  const result = (await res.json()) as AuthResponse;

  if (!result?.success) {
    return {
      success: false,
      message: result?.message || "Login failed",
      error: (result as any)?.error,
    };
  }

  return { success: true, message: result.message };
};
