/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { $fetch } from "@/lib/server-fetch";

export const updateReview = async ({
  id,
  payload,
}: {
  id: string;
  payload: { rating?: number; comment?: string };
}): Promise<any> => {
  try {
    const res = await $fetch.patch(`/reviews/${id}`, {
      body: JSON.stringify(payload),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const result = await res.json();

    return result;
  } catch (error: any) {
    console.log("REGISTER_ERROR:", error);

    return {
      success: false,
      message:
        process.env.NODE_ENV === "development"
          ? error.message
          : "Registration failed. Please try again.",
    };
  }
};
