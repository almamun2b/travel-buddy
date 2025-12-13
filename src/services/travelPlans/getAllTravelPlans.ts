/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { toQueryParams } from "@/lib/queryParams";
import { $fetch } from "@/lib/server-fetch";

interface GetAllTourPlans {
  limit?: number;
  page?: number;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
  searchTerm?: string;
  destination?: string;
  travelType?: string;
  minBudget?: string;
  maxBudget?: string;
  startDate?: string;
  endDate?: string;
}

export const getAllTourPlans = async (
  params: GetAllTourPlans = {}
): Promise<any> => {
  try {
    const {
      limit = 20,
      page = 1,
      sortBy = "createdAt",
      sortOrder = "desc",
      searchTerm = "",
      destination = "",
      travelType = "",
      minBudget = "",
      maxBudget = "",
      startDate = "",
      endDate = "",
    } = params;

    const query = toQueryParams({
      limit,
      page,
      sortBy,
      sortOrder,
      searchTerm,
      destination,
      travelType,
      minBudget,
      maxBudget,
      startDate,
      endDate,
    });
    const res = await $fetch.get(`/travel-plans?${query}`, {
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
