/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { $fetch } from "@/lib/fetch";

export const getPendingRequestsForMyPlans = async (): Promise<any> => {
  try {
    const result = await $fetch.get<any>("/travel-plans/requests/pending");
    return result;
  } catch (error: any) {
    console.log("GET_PENDING_REQUESTS_ERROR:", error);

    return {
      success: false,
      message:
        process.env.NODE_ENV === "development"
          ? error.message
          : "Failed to fetch pending requests. Please try again.",
    };
  }
};
