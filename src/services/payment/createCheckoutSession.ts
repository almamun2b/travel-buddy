/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { $fetch } from "@/lib/server-fetch";
export const createCheckoutSession = async (data: any): Promise<any> => {
  try {
    const res = await $fetch.post("/payment/create-checkout-session", {
      body: JSON.stringify(data),
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
