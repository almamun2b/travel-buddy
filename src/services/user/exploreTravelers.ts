"use server";

import { $fetch } from "@/lib/fetch";
import {
  GetAllTravelersParams,
  PublicUserProfileResponse,
  TravelersResponse,
} from "@/types/user";

export const exploreTravelers = async (params: GetAllTravelersParams = {}) => {
  const res = await $fetch.get<TravelersResponse, GetAllTravelersParams>(
    `/user/explore/travelers`,
    {
      cache: "force-cache",
      next: {
        tags: ["users", "explore-travelers"],
      },
      params,
    }
  );
  return res;
};

export async function getPublicProfile({ id }: { id: string }) {
  const res = await $fetch.get<PublicUserProfileResponse>(
    `/user/profile/${id}`,
    {
      cache: "force-cache",
      next: {
        tags: ["users", "public-profile"],
      },
    }
  );
  return res;
}
