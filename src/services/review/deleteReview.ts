/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { $fetch } from "@/lib/fetch";

export async function deleteReview({ id }: { id: string }) {
  try {
    const data = await $fetch.delete<any>(`/reviews/${id}`);
    return data;
  } catch (err: any) {
    return {
      success: false,
      message: "Something went wrong",
    };
  }
}
