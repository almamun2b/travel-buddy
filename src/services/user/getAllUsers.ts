/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { $fetch } from "@/lib/fetch";

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

export const getAllUsers = async (
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

    const result = await $fetch.get<any, GetAllUsersParams>(
      `/user`,
      {
        params: {
          limit,
          page,
          sortBy,
          sortOrder,
          searchTerm,
          travelInterest,
          currentLocation,
          hasVerifiedBadge,
        },
      }
    );

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
