/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { toQueryParams } from "@/lib/queryParams";
import { $fetch } from "@/lib/server-fetch";

interface GetAllUsersParams {
  limit?: number;
  page?: number;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
  searchTerm?: string;
  travelInterest?: string[];
  currentLocation?: string;
  hasVerifiedBadge?: string;
}

export const exploreTravelers = async (
  params: GetAllUsersParams = {}
): Promise<any> => {
  try {
    const {
      limit = 20,
      page = 1,
      sortBy = "createdAt",
      sortOrder = "desc",
      searchTerm = "",
      travelInterest = [],
      currentLocation = "",
      hasVerifiedBadge = "",
    } = params;

    const query = toQueryParams({
      limit,
      page,
      sortBy,
      sortOrder,
      searchTerm,
      travelInterest,
      currentLocation,
      hasVerifiedBadge,
    });

    const res = await $fetch.get(`/user/explore/travelers?${query}`, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    const result = await res.json();

    return result;
  } catch (error: any) {
    console.log("GET_ALL_USERS_ERROR:", error);

    return {
      success: false,
      message:
        process.env.NODE_ENV === "development"
          ? error.message
          : "Failed to fetch users. Please try again.",
    };
  }
};
