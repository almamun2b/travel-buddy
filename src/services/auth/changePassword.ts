/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { $fetch } from "@/lib/fetch";
import { revalidateTag } from "next/cache";

export const changePassword = async (payload: any): Promise<any> => {
  try {
    const result = await $fetch.post<any>("/auth/change-password", {
      ...payload,
    });

    if (result?.success) {
      revalidateTag("user", "");
      revalidateTag("users", "");
    }

    return result;
  } catch (error: any) {
    console.log("CHANGE_PASSWORD_ERROR:", error);
    return {
      success: false,
      message:
        process.env.NODE_ENV === "development"
          ? error.message
          : "Failed to change password. Please try again.",
    };
  }
};
