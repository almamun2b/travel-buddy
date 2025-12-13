/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { $fetch } from "@/lib/server-fetch";

interface SubscriptionPlan {
  FREE: "FREE";
  MONTHLY: "MONTHLY";
  YEARLY: "YEARLY";
}
export const createCheckoutSession = async (payload: {
  plan: SubscriptionPlan;
}): Promise<any> => {
  try {
    const res = await $fetch.post("/payment/create-checkout-session", {
      body: JSON.stringify(payload),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const result = await res.json();

    return result;
  } catch (error: any) {
    console.log("REGISTER_ERROR:", error);

    return {
      success: false,
      message:
        process.env.NODE_ENV === "development"
          ? error.message
          : "Registration failed. Please try again.",
    };
  }
};
