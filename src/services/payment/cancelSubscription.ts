"use server";

import { $fetch } from "@/lib/fetch";

export interface CancelSubscriptionResponse {
  success: boolean;
  message: string;
}

export const cancelSubscription =
  async (): Promise<CancelSubscriptionResponse> => {
    try {
      const result = await $fetch.post<CancelSubscriptionResponse>(
        "/payment/subscription/cancel"
      );
      return (
        result || {
          success: false,
          message: "Failed to cancel subscription. Please try again.",
        }
      );
    } catch (error: unknown) {
      console.log("CANCEL_SUBSCRIPTION_ERROR:", error);

      return {
        success: false,
        message:
          process.env.NODE_ENV === "development"
            ? error instanceof Error
              ? error.message
              : "Unknown error"
            : "Subscription cancellation failed. Please try again.",
      };
    }
  };
