/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { $fetch } from "@/lib/fetch";

export async function updateStatus({
  id,
  payload,
}: {
  id: string;
  payload: {
    status: string;
    isVerified: boolean;
    hasVerifiedBadge: boolean;
  };
}) {
  try {
    const data = await $fetch.patch<any>(`/user/${id}/status`, payload);
    return data;
  } catch (err: any) {
    return {
      success: false,
      message: "Something went wrong",
    };
  }
}
