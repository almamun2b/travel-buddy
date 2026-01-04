/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { $fetch } from "@/lib/fetch";

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
    const formData = new FormData();

    images.forEach((image, index) => {
      formData.append(`images`, image);
    });

    formData.append("data", JSON.stringify(data));

    const result = await $fetch.post<any>("/travel-plans", formData);

    return result;
  } catch (error: any) {
    console.log("CREATE_TRAVEL_PLANS_ERROR:", error);

    return {
      success: false,
      message:
        process.env.NODE_ENV === "development"
          ? error.message
          : "Travel plan creation failed. Please try again.",
    };
  }
};
