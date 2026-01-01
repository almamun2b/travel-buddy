/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { $fetch } from "@/lib/fetch";

export async function deleteTravelPlan({ id }: { id: string }) {
  try {
    const data = await $fetch.delete<any>(`/travel-plans/${id}`);
    return data;
  } catch (err: any) {
    return {
      success: false,
      message: "Something went wrong",
    };
  }
}
