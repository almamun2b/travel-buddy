/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { $fetch } from "@/lib/server-fetch";

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
    const res = await $fetch.patch(`/travel-plans/${id}/status`, {
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...payload }),
    });

    const data = await res.json();

    return data;
  } catch (err: any) {
    return {
      success: false,
      message: "Something went wrong",
    };
  }
}
