/* eslint-disable @typescript-eslint/no-explicit-any */
import { TravelerCard } from "@/components/modules/user/TravelerCard";
import PaginationCommon from "@/components/shared/pagination-common";
import { me } from "@/services/auth/me";
import { exploreTravelers } from "@/services/user/exploreTravelers";
import { GetAllTravelersParams } from "@/types/user";
import { Metadata } from "next";

interface ProjectPageProps {
  searchParams: Promise<GetAllTravelersParams>;
}

export const metadata: Metadata = {
  title: "Travelers",
  description: "Explore Travelers",
};
export const dynamic = "force-dynamic";
const TravelersPage = async ({ searchParams }: ProjectPageProps) => {
  const params = await searchParams;
  const userInfo = await me();
  const response = await exploreTravelers(params);

  if (!userInfo || !response) return;

  if (!response.success) {
    throw new Error("Some thing went ");
  }
  const totalPages = Math.ceil(response.meta.total / response.meta.limit);
  return (
    <section className="mx-auto px-6 py-20 pt-32">
      <h2 className="text-3xl font-bold mb-4 text-center">Explore Travelers</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {response.data.map((user: any) => (
          <TravelerCard
            key={user.id}
            traveler={user}
            userInfo={userInfo}
          ></TravelerCard>
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

export default TravelersPage;
