"use server";

import { $fetch } from "@/lib/fetch";
import {
  TravelPlanSearchParams,
  TravelPlansResponse,
} from "@/types/travelPlan";

export async function getTravelPlans(params: TravelPlanSearchParams = {}) {
  const response = await $fetch.get<
    TravelPlansResponse,
    TravelPlanSearchParams
  >(`/travel-plans`, {
    cache: "no-store",
    params: params,
  });

  return response;
}
