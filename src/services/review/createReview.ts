/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { $fetch } from "@/lib/server-fetch";

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
    const res = await $fetch.post("/reviews", {
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
