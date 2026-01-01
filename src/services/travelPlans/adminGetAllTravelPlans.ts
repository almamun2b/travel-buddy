/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { $fetch } from "@/lib/fetch";

interface GetAllTourPlans {
  limit?: number;
  page?: number;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
  searchTerm?: string;
  destination?: string;
  travelType?: string;
  status?: string;
  isDeleted?: string;
}

export const adminGetAllTravelPlans = async (
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
      status = "",
      isDeleted = "",
    } = params;

    const result = await $fetch.get<any, GetAllTourPlans>("/travel-plans", {
      params: {
        limit,
        page,
        sortBy,
        sortOrder,
        searchTerm,
        destination,
        travelType,
        status,
        isDeleted,
      },
    });

    return result;
  } catch (error: any) {
    console.log("ADMIN_GET_ALL_TRAVEL_PLANS_ERROR:", error);

    return {
      success: false,
      message:
        process.env.NODE_ENV === "development"
          ? error.message
          : "Failed to fetch travel plans. Please try again.",
    };
  }
};
