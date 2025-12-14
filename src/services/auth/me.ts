/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { $fetch } from "@/lib/fetch";

export async function me() {
  try {
    const response = await $fetch.get<any>("/auth/me", {
      cache: "no-store",
    });
    return response;
  } catch (error) {
    return null;
  }
}
