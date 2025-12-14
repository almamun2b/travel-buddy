/* eslint-disable @typescript-eslint/no-explicit-any */
import { TravelPlanCard } from "@/components/modules/travelPlan/TravelPlanCard";
import PaginationCommon from "@/components/shared/pagination-common";
import { $fetch, isFetchError } from "@/lib/fetch";
import { TravelPlansResponse } from "@/types/types";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Travel Buddy - Discover Amazing Travel Experiences",
  description:
    "Connect with fellow adventurers and discover amazing travel plans around the world",
};

interface SearchParams {
  page?: string;
  limit?: string;
  searchTerm?: string;
  sortBy?: string;
  sortOrder?: string;
}

interface ProjectPageProps {
  searchParams: Promise<SearchParams>;
}

const TravelPlanPage = async ({ searchParams }: ProjectPageProps) => {
  const params = await searchParams;
  const page = params.page || "1";
  const limit = params.limit || "20";
  const searchTerm = params.searchTerm || "";
  const sortBy = params.sortBy || "createdAt";
  const sortOrder = params.sortOrder || "desc";

  const query = new URLSearchParams({
    page,
    limit,
    ...(searchTerm && { searchTerm }),
    sortBy,
    sortOrder,
  }).toString();

  const userInfo = await $fetch.get<any>(`/auth/me`, {
    headers: {
      "Content-Type": "application/json",
    },
    cache: "no-store",
  });

  const response = await $fetch.get<TravelPlansResponse>(
    `/travel-plans?${query}`,
    {
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-store",
    }
  );

  const travelPlans = isFetchError(response) ? [] : response.data;
  const meta = isFetchError(response)
    ? { page: 1, limit: 20, total: 0 }
    : response.meta;

  const totalPages = Math.ceil(meta.total / meta.limit);

  return (
    <section className="mx-auto px-6 py-20 pt-32">
      <h2 className="text-3xl font-bold mb-4 text-center">
        Explore Travel Plan
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {travelPlans.map((travel) => (
          <TravelPlanCard
            key={travel.id}
            travelPlan={travel}
            userInfo={userInfo}
          ></TravelPlanCard>
        ))}
      </div>

      {totalPages > 1 && (
        <div className="mt-10 text-center">
          <PaginationCommon currentPage={meta.page} totalPages={totalPages} />
        </div>
      )}
    </section>
  );
};

export default TravelPlanPage;
