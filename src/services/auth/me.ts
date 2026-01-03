"use server";

import { $fetch } from "@/lib/fetch";
import { UserProfileResponse } from "@/types/user";

export async function me() {
  try {
    return await $fetch.get<UserProfileResponse>("/auth/me", {
      cache: "force-cache",
    });
  } catch (error) {
    console.error("Error fetching user info:", error);
    return null;
  }
}
