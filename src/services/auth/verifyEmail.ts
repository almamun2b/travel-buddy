/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { $fetch } from "@/lib/server-fetch";

export async function verifyEmailAction({
  email,
  code,
}: {
  email: string;
  code: string;
}) {
  try {
    const res = await $fetch.post("/auth/verify-email", {
      body: JSON.stringify({ email, code }),
      headers: { "Content-Type": "application/json" },
    });

    const data = await res.json();

    return data;
  } catch (err: any) {
    return {
      success: false,
      message: "Something went wrong",
    };
  }
}

export async function resendVerificationCode({ email }: { email: string }) {
  try {
    const res = await $fetch.post("/auth/resend-verification-code", {
      body: JSON.stringify({ email }),
      headers: { "Content-Type": "application/json" },
    });

    const data = await res.json();

    return data;
  } catch (err: any) {
    return {
      success: false,
      message: "Something went wrong",
    };
  }
}
