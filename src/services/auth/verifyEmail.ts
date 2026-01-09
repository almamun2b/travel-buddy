/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { $fetch } from "@/lib/fetch";
import { revalidateTag } from "next/cache";

export async function verifyEmailAction({
  email,
  code,
}: {
  email: string;
  code: string;
}) {
  try {
    const data = await $fetch.post<any>("/auth/verify-email", {
      email,
      code,
    });

    if (data?.success) {
      revalidateTag("user", "");
      revalidateTag("users", "");
    }

    return data;
  } catch (err: any) {
    return {
      success: false,
      message: err?.message || "Something went wrong",
    };
  }
}

export async function resendVerificationCode({ email }: { email: string }) {
  try {
    const data = await $fetch.post<any>("/auth/resend-verification-code", {
      email,
    });

    if (data?.success) {
      revalidateTag("user", "");
      revalidateTag("users", "");
    }

    return data;
  } catch (err: any) {
    return {
      success: false,
      message: err?.message || "Something went wrong",
    };
  }
}
