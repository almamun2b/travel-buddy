import { TravelPlanCard } from "@/components/modules/travelPlan/TravelPlanCard";
import PaginationCommon from "@/components/shared/pagination-common";
import { me } from "@/services/auth/me";
import { getTravelPlans } from "@/services/travelPlans/travelPlans";
import { TravelPlanSearchParams } from "@/types/travelPlan";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Travel Buddy - Travel Plans",
  description: "Browse travel plans and connect with fellow travelers",
};

interface PageProps {
  searchParams: Promise<TravelPlanSearchParams>;
}

export default async function TravelPlansPage({ searchParams }: PageProps) {
  const params = await searchParams;

  const [response, userInfo] = await Promise.all([
    getTravelPlans(params),
    me().catch(() => null),
  ]);

  const travelPlans = response?.success ? response.data : [];
  const meta = response?.success
    ? response.meta
    : { page: 1, limit: Number(params?.limit ?? 20), total: 0 };

  const totalPages = Math.ceil(meta.total / meta.limit);
  const safeUserInfo = userInfo ?? { success: false, data: null };

  return (
    <section className="mx-auto px-6 py-20 pt-32">
      <div className="mx-auto flex max-w-2xl flex-col items-center gap-2 text-center">
        <h1 className="text-3xl font-bold">Explore Travel Plans</h1>
        <p className="text-muted-foreground">
          Discover amazing trips and connect with like-minded travelers.
        </p>
      </div>

      <div className="mt-10 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
        {travelPlans.map((travel) => (
          <TravelPlanCard
            key={travel.id}
            travelPlan={travel}
            userInfo={safeUserInfo}
          />
        ))}
      </div>

      {totalPages > 1 && (
        <div className="mt-10 text-center">
          <PaginationCommon currentPage={meta.page} totalPages={totalPages} />
        </div>
      )}
    </section>
  );
}
