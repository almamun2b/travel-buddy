"use server";
/* eslint-disable @typescript-eslint/no-explicit-any */

// import { $fetch } from "@/lib/server-fetch";
import { $fetch } from "@/lib/fetch";
import { AuthResponse } from "@/types/travelPlan";

export interface ParsedCookie {
  [key: string]: string | undefined;
}

export const loginUser = async (data: any) => {
  const response = await $fetch.post<AuthResponse>("/auth/login", data);

  if (!response) {
    return { success: false, error: "Login failed" };
  }

  return { success: true, message: response.message };
};
