"use server";

import { $fetch } from "@/lib/fetch";
import { UserProfileResponse } from "@/types/user";

export async function me() {
  const response = await $fetch.get<UserProfileResponse>("/auth/me", {
    cache: "force-cache",
  });
  return response;
}
