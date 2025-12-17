"use server";

import { $fetch } from "@/lib/fetch";
import {
  TravelPlanDetailsResponse,
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

export async function getTravelPlansById({ id }: { id: string }) {
  const res = await $fetch.get<TravelPlanDetailsResponse | null>(
    `/travel-plans/${id}`
  );
  return res;
}
