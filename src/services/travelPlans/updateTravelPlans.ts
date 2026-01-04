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
export const updateTravelPlans = async ({
  id,
  images,
  data,
}: {
  id: string;
  images?: File[];
  data: TravelPlan;
}): Promise<any> => {
  try {
    const formData = new FormData();

    if (images && images.length > 0) {
      images.forEach((image) => {
        formData.append("images", image);
      });
    }

    formData.append("data", JSON.stringify(data));

    const result = await $fetch.patch<any>(`/travel-plans/${id}`, formData);

    return result;
  } catch (error: any) {
    console.log("UPDATE_TRAVEL_PLANS_ERROR:", error);

    return {
      success: false,
      message:
        process.env.NODE_ENV === "development"
          ? error.message
          : "Travel plan update failed. Please try again.",
    };
  }
};
