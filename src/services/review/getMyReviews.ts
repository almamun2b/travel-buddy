/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { toQueryParams } from "@/lib/queryParams";
import { $fetch } from "@/lib/server-fetch";

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

    const query = toQueryParams({
      limit,
      page,
      sortBy,
      sortOrder,
    });
    const res = await $fetch.get(`/reviews/my${query}`, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    const result = await res.json();
    return result;
  } catch (error: any) {
    console.log("GET_ALL_TOUR_PLANS_ERROR:", error);

    return {
      success: false,
      message:
        process.env.NODE_ENV === "development"
          ? error.message
          : "Failed to fetch tour plans. Please try again.",
    };
  }
};
