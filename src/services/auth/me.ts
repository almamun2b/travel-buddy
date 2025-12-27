"use server";

import { UserProfileResponse } from "@/types/user";
import { $fetch } from "@/lib/server-fetch";

export async function me() {
  const res = await $fetch.get("/auth/me", {
    cache: "force-cache",
  });

  return (await res.json()) as UserProfileResponse;
}
