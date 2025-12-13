/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { $fetch } from "@/lib/server-fetch";

interface TravelPlan {
  title: string;
  description: string;
  destination: string;
  startDate: string; // or Date if parsed
  endDate: string; // or Date
  budget?: number;
  travelType: string;
  maxMembers?: number;
  activities: string[];
}
export const createTravelPlans = async ({
  images,
  data,
}: {
  images: File[];
  data: TravelPlan;
}): Promise<any> => {
  try {
    const payload = { images, data };
    const res = await $fetch.post("/travel-plans", {
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
