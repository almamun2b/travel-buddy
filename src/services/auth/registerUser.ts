/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { $fetch } from "@/lib/fetch";
import { revalidateTag } from "next/cache";

export const registerUser = async (payload: any): Promise<any> => {
  try {
    const result = await $fetch.post<any>("/auth/register", { ...payload });

    if (result?.success) {
      revalidateTag("user", "");
      revalidateTag("users", "");
    }

    return result;
  } catch (error: any) {
    console.log("REGISTER_USER_ERROR:", error);
    return {
      success: false,
      message:
        process.env.NODE_ENV === "development"
          ? error.message
          : "Registration failed. Please try again.",
    };
  }
};
