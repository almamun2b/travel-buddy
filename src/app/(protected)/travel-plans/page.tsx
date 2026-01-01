import TravelPlansTable from "@/components/modules/travelPlan/TravelPlansTable";
import { getAllTravelPlans } from "@/services/travelPlans/getAllTravelPlans";

interface TravelPlanPageProps {
  searchParams: Promise<{
    page?: string;
    search?: string;
    destination?: string;
    travelType?: string;
    minBudget?: string;
    maxBudget?: string;
    startDate?: string;
    endDate?: string;
    status?: string;
    sortBy?: string;
    sortOrder?: string;
  }>;
}

export default async function TravelPlanPage({ searchParams }: TravelPlanPageProps) {
  const params = await searchParams;
  const currentPage = Number(params.page) || 1;
  
  // Build query parameters
  const queryParams = {
    page: currentPage,
    limit: 14,
    searchTerm: params.search || '',
    destination: params.destination || '',
    travelType: params.travelType === 'all' ? '' : (params.travelType || ''),
    minBudget: params.minBudget || '',
    maxBudget: params.maxBudget || '',
    startDate: params.startDate || '',
    endDate: params.endDate || '',
    status: params.status === 'all' ? '' : (params.status || ''),
    sortBy: params.sortBy || 'createdAt',
    sortOrder: (params.sortOrder as 'asc' | 'desc') || 'desc',
  };

  // Fetch travel plans on server
  const result = await getAllTravelPlans(queryParams);

  const travelPlans = result?.success ? (result.data || []) : [];
  const meta = result?.success ? (result.meta || { page: 1, limit: 14, total: 0 }) : { page: 1, limit: 14, total: 0 };

  return (
    <div className="container mx-auto py-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold">Travel Plans Admin</h1>
        <p className="text-muted-foreground">Manage all travel plans in the system</p>
      </div>
      
      {!result?.success ? (
        <div className="text-center py-8">
          <p className="text-muted-foreground">Failed to load travel plans. Please try again later.</p>
        </div>
      ) : (
        <TravelPlansTable 
          travelPlans={travelPlans} 
          meta={meta} 
          searchParams={queryParams}
        />
      )}
    </div>
  );
}
