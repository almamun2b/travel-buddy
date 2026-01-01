/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { $fetch } from "@/lib/fetch";

interface GetAllUsersParams {
  limit?: number;
  page?: number;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
  searchTerm?: string;
  email?: string;
  role?: string;
  status?: string;
  gender?: string;
  isVerified?: boolean;
  hasVerifiedBadge?: boolean;
  travelInterest?: string[];
  currentLocation?: string;
}

export const getAllUsers = async (
  params: GetAllUsersParams = {}
): Promise<any> => {
  try {
    const result = await $fetch.get<any, GetAllUsersParams>(`/user`, {
      params,
    });

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
