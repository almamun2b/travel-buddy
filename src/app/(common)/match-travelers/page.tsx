/* eslint-disable @typescript-eslint/no-explicit-any */
import { TravelPlanCard } from "@/components/modules/travelPlan/TravelPlanCard";
import PaginationCommon from "@/components/shared/pagination-common";
import { me } from "@/services/auth/me";
import { matchTravelPlans } from "@/services/travelPlans/matchTravelPlans";
import { Metadata } from "next";

interface MatchTravelersPageProps {
  searchParams: Promise<{ page?: string }>;
}

export const metadata: Metadata = {
  title: "Explore Travel Plan",
  description: "Explore Travel Plan",
};

const MatchTravelersPage = async ({
  searchParams,
}: MatchTravelersPageProps) => {
  const { page } = await searchParams;
  const userInfo = await me();
  const data: any = await matchTravelPlans({
    limit: 9,
    page: page ? Number(page) : 1,
  });
  if (!data.success) {
    throw new Error("Some thing went ");
  }
  const totalPages = Math.ceil(data.meta?.total / data.meta?.limit);
  return (
    <section className="mx-auto px-6 py-20 pt-32">
      <h2 className="text-3xl font-bold mb-4 text-center">
        Travel Plan According to the Interest
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {data.data.map((travel: any) => (
          <TravelPlanCard
            key={travel.id}
            travelPlan={travel}
            userInfo={userInfo}
          ></TravelPlanCard>
        ))}
      </div>

      {totalPages > 1 && (
        <div className="mt-10 text-center">
          <PaginationCommon
            currentPage={data.meta.page}
            totalPages={totalPages}
          />
        </div>
      )}
    </section>
  );
};

export default MatchTravelersPage;
