/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { $fetch } from "@/lib/server-fetch";

export async function deleteTravelPlan({ id }: { id: string }) {
  try {
    const res = await $fetch.delete(`/travel-plans/${id}`, {
      headers: { "Content-Type": "application/json" },
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
