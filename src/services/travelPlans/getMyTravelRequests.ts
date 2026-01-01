/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { $fetch } from "@/lib/fetch";

export const getMyTravelRequests = async (): Promise<any> => {
  try {
    const result = await $fetch.get<any>("/travel-plans/requests/my");
    return result;
  } catch (error: any) {
    console.log("GET_MY_TRAVEL_REQUESTS_ERROR:", error);

    return {
      success: false,
      message:
        process.env.NODE_ENV === "development"
          ? error.message
          : "Failed to fetch travel requests. Please try again.",
    };
  }
};
