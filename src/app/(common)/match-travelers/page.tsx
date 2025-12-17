import { TravelPlanCard } from "@/components/modules/travelPlan/TravelPlanCard";
import PaginationCommon from "@/components/shared/pagination-common";
import { me } from "@/services/auth/me";
import { matchTravelPlans } from "@/services/travelPlans/matchTravelPlans";
import { TravelPlanSearchParams } from "@/types/travelPlan";
import { Metadata } from "next";
interface MatchTravelersPageProps {
  searchParams: Promise<TravelPlanSearchParams>;
}

export const metadata: Metadata = {
  title: "Explore Travel Plan",
  description: "Explore Travel Plan",
};

const MatchTravelersPage = async ({
  searchParams,
}: MatchTravelersPageProps) => {
  const params = await searchParams;

  const userInfo = await me();
  const response = await matchTravelPlans(params);

  if (!userInfo || !response) return;

  console.log(response);

  if (!response.success) {
    return <div className="mx-auto px-6 py-20 pt-32">{response.message}</div>;
  }
  const totalPages = Math.ceil(response.meta?.total / response.meta?.limit);
  return (
    <section className="mx-auto px-6 py-20 pt-32">
      <h2 className="text-3xl font-bold mb-4 text-center">
        Travel Plan According to the Interest
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {response.data.map((travel) => (
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
            currentPage={response.meta.page}
            totalPages={totalPages}
          />
        </div>
      )}
    </section>
  );
};

export default MatchTravelersPage;
