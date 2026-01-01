"use server";

import { UserProfileResponse } from "@/types/user";
import { $fetch } from "@/lib/fetch";

export async function me() {
  return await $fetch.get<UserProfileResponse>("/auth/me");
}
