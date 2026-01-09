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
    cache: "force-cache",
    next: {
      tags: ["travel-plans"],
    },
    params: params,
  });

  return response;
}
export async function getAdminTravelPlans(params: TravelPlanSearchParams = {}) {
  const response = await $fetch.get<
    TravelPlansResponse,
    TravelPlanSearchParams
  >(`/travel-plans/admin/all`, {
    cache: "force-cache",
    next: {
      tags: ["travel-plans", "admin-travel-plans"],
    },
    params: params,
  });

  return response;
}

export async function getTravelPlansById({ id }: { id: string }) {
  const res = await $fetch.get<TravelPlanDetailsResponse | null>(
    `/travel-plans/${id}`,
    {
      cache: "force-cache",
      next: {
        tags: ["travel-plans", "travel-plan-by-id"],
      },
    }
  );
  return res;
}
