/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { $fetch } from "@/lib/fetch";

interface GetAllTourPlans {
  limit?: number;
  page?: number;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
}

export const getMyReviews = async (
  params: GetAllTourPlans = {}
): Promise<any> => {
  try {
    const {
      limit = 20,
      page = 1,
      sortBy = "createdAt",
      sortOrder = "desc",
    } = params;

    const result = await $fetch.get<any, GetAllTourPlans>("/reviews/my", {
      params: {
        limit,
        page,
        sortBy,
        sortOrder,
      },
    });

    return result;
  } catch (error: any) {
    console.log("GET_MY_REVIEWS_ERROR:", error);

    return {
      success: false,
      message:
        process.env.NODE_ENV === "development"
          ? error.message
          : "Failed to fetch reviews. Please try again.",
    };
  }
};
