/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { $fetch } from "@/lib/fetch";

export async function updateTravelPlanStatus({
  id,
  payload,
}: {
  id: string;
  payload: {
    status: string;
  };
}) {
  try {
    const data = await $fetch.patch<any>(`/travel-plans/${id}/status`, payload);
    return data;
  } catch (err: any) {
    return {
      success: false,
      message: "Something went wrong",
    };
  }
}
