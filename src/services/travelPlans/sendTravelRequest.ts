/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { $fetch } from "@/lib/server-fetch";

interface TravelPlan {
  travelPlanId: string;
  message: string;
}
export const sendTravelRequest = async (payload: TravelPlan): Promise<any> => {
  try {
    const res = await $fetch.post("/travel-plans/requests/send", {
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
