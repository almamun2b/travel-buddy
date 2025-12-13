/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { $fetch } from "@/lib/server-fetch";
import { deleteCookie } from "./tokenHandlers";

export async function logoutUser() {
  try {
    const res = await $fetch.post("/auth/logout", {
      headers: { "Content-Type": "application/json" },
    });

    const data = await res.json();

    if (data.success) {
      await deleteCookie("accessToken");
      await deleteCookie("refreshToken");
    }

    return data;
  } catch (err: any) {
    return {
      success: false,
      message: "Something went wrong",
    };
  }
}
