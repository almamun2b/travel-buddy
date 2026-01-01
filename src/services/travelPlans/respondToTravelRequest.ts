/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { $fetch } from "@/lib/fetch";

export const respondToTravelRequest = async (
  requestId: string,
  action: "ACCEPT" | "REJECT"
): Promise<any> => {
  try {
    const result = await $fetch.post<any>(`/travel-plans/requests/${requestId}/respond`, {
      action,
    });
    return result;
  } catch (error: any) {
    console.log("RESPOND_TO_TRAVEL_REQUEST_ERROR:", error);

    return {
      success: false,
      message:
        process.env.NODE_ENV === "development"
          ? error.message
          : "Failed to respond to travel request. Please try again.",
    };
  }
};
