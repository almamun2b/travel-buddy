/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { $fetch } from "@/lib/fetch";

export const getSubscriptionStatus = async (): Promise<any> => {
  try {
    const result = await $fetch.get<any>("/payment/subscription/status", {
      cache: "force-cache",
      next: {
        tags: ["subscription", "payment"],
      },
    });
    return result;
  } catch (error: any) {
    console.log("GET_SUBSCRIPTION_STATUS_ERROR:", error);

    return {
      success: false,
      message:
        process.env.NODE_ENV === "development"
          ? error.message
          : "Failed to fetch subscription status. Please try again.",
    };
  }
};
