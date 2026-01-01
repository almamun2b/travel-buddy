/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { $fetch } from "@/lib/fetch";

interface ICreateReviewPayload {
  travelPlanId: string;
  revieweeId: string;
  rating: number;
  comment: string;
}
export const createReview = async (
  payload: ICreateReviewPayload
): Promise<any> => {
  try {
    const result = await $fetch.post<any>("/reviews", payload);
    return result;
  } catch (error: any) {
    console.log("CREATE_REVIEW_ERROR:", error);

    return {
      success: false,
      message:
        process.env.NODE_ENV === "development"
          ? error.message
          : "Review creation failed. Please try again.",
    };
  }
};
