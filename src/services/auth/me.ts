"use server";

import { UserProfileResponse } from "@/types/user";
import { $fetch } from "@/lib/fetch";

export async function me() {
  try {
    return await $fetch.get<UserProfileResponse>("/auth/me");
  } catch (error) {
    console.error("Error fetching user info:", error);
    return null;
  }
}
