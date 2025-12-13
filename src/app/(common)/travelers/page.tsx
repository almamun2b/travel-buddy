/* eslint-disable @typescript-eslint/no-explicit-any */
import { TravelerCard } from "@/components/modules/user/TravelerCard";
import PaginationCommon from "@/components/shared/pagination-common";
import { me } from "@/services/auth/me";
import { exploreTravelers } from "@/services/user/exploreTravelers";
import { Metadata } from "next";

interface ProjectPageProps {
  searchParams: Promise<{ page?: string }>;
}

export const metadata: Metadata = {
  title: "Travelers",
  description: "Explore Travelers",
};

const TravelersPage = async ({ searchParams }: ProjectPageProps) => {
  const { page } = await searchParams;
  const userInfo = await me();
  const data: any = await exploreTravelers({
    limit: 9,
    page: page ? Number(page) : 1,
  });
  const totalPages = Math.ceil(data.meta.total / data.meta.limit);
  if (!data.success) {
    throw new Error("Some thing went ");
  }
  return (
    <section className="mx-auto px-6 py-20 pt-32">
      <h2 className="text-3xl font-bold mb-4 text-center">Explore Travelers</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {data.data.map((user: any) => (
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
            currentPage={data.meta.page}
            totalPages={totalPages}
          />
        </div>
      )}
    </section>
  );
};

export default TravelersPage;
