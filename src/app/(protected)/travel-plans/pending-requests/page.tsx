import PendingRequests from "@/components/modules/travelPlan/PendingRequests";
import { getPendingRequestsForMyPlans } from "@/services/travelPlans/getPendingRequestsForMyPlans";

const page = async () => {
  const result = await getPendingRequestsForMyPlans();

  return (
    <PendingRequests pendingRequests={result.success ? result.data : []} />
  );
};

export default page;
