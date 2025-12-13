/* eslint-disable @typescript-eslint/no-explicit-any */
import { TravelPlanCard } from "@/components/modules/travelPlan/TravelPlanCard";
import PaginationCommon from "@/components/shared/pagination-common";
import { me } from "@/services/auth/me";
import { getAllTourPlans } from "@/services/travelPlans/getAllTravelPlans";
import { Metadata } from "next";
export const dynamic = "force-static";

interface ProjectPageProps {
  searchParams: Promise<{ page?: string }>;
}

export const metadata: Metadata = {
  title: "Explore Travel Plan",
  description: "Explore Travel Plan",
};

const TravelPlanPage = async ({ searchParams }: ProjectPageProps) => {
  const { page } = await searchParams;
  const userInfo = await me();
  const data: any = await getAllTourPlans({
    limit: 9,
    page: page ? Number(page) : 1,
  });
  const totalPages = Math.ceil(data.meta.total / data.meta.limit);
  if (!data.success) {
    throw new Error("Some thing went ");
  }
  return (
    <section className="mx-auto px-6 py-20 pt-32">
      <h2 className="text-3xl font-bold mb-4 text-center">
        Explore Travel Plan
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

export default TravelPlanPage;
