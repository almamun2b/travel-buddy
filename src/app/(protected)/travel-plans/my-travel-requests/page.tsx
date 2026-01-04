import MyTravelRequest from "@/components/modules/travelPlan/MyTravelRequest";
import { getMyTravelRequests } from "@/services/travelPlans/getMyTravelRequests";

const page = async () => {
  const result = await getMyTravelRequests();

  return <MyTravelRequest travelRequests={result.success ? result.data : []} />;
};

export default page;
