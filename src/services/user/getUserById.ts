/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { $fetch } from "@/lib/fetch";

export async function getUserById({ id }: { id: string }) {
  try {
    const data = await $fetch.get<any>(`/user/${id}`, {
      cache: "force-cache",
      next: {
        tags: ["users", "user-by-id"],
      },
    });
    return data;
  } catch (err: any) {
    console.log("GET_USER_BY_ID_ERROR:", err);
    return {
      success: false,
      message: "Something went wrong",
    };
  }
}
