/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { $fetch } from "@/lib/fetch";

export const updateReview = async ({
  id,
  payload,
}: {
  id: string;
  payload: { rating?: number; comment?: string };
}): Promise<any> => {
  try {
    const result = await $fetch.patch<any>(`/reviews/${id}`, payload);
    return result;
  } catch (error: any) {
    console.log("UPDATE_REVIEW_ERROR:", error);

    return {
      success: false,
      message:
        process.env.NODE_ENV === "development"
          ? error.message
          : "Review update failed. Please try again.",
    };
  }
};
