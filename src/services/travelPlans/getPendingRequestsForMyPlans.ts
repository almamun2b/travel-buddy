/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { $fetch } from "@/lib/server-fetch";

export const getPendingRequestsForMyPlans = async (): Promise<any> => {
  try {
    const res = await $fetch.get(`/travel-plans/requests/pending`, {
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
