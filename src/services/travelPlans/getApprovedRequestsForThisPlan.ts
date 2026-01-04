/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

// {
//     "success": true,
//     "message": "Approved requests retrieved successfully!",
//     "data": [
//         {
//             "id": "eaa5d11a-378b-4af3-983a-916f0e3f3334",
//             "travelPlanId": "8c956f06-9fdc-40ad-84c3-6a78c30e8fa0",
//             "message": "This message new",
//             "user": {
//                 "id": "24de6385-6dc2-4c28-95a8-83da905a35d2",
//                 "fullName": "User",
//                 "avatar": null,
//                 "isVerified": true,
//                 "travelInterests": [
//                     "Sea"
//                 ],
//                 "bio": "This is bio",
//                 "email": "user@gmail.com",
//                 "contactNumber": "01745323411",
//                 "gender": null,
//                 "dateOfBirth": null,
//                 "currentLocation": null,
//                 "visitedCountries": []
//             }
//         }
//     ]
// }

import { $fetch } from "@/lib/fetch";
import type { ApprovedRequestsResponse } from "@/types/travelPlan";

export const getApprovedRequestsForThisPlan = async ({
  travelPlanId,
}: {
  travelPlanId: string;
}): Promise<ApprovedRequestsResponse> => {
  try {
    const result = await $fetch.get<ApprovedRequestsResponse>(
      `/travel-plans/requests/approved/${travelPlanId}`
    );
    return (
      result || {
        success: false,
        message: "No response received from server",
        data: [],
      }
    );
  } catch (error: any) {
    console.log("GET_APPROVED_REQUESTS_ERROR:", error);

    return {
      success: false,
      message:
        process.env.NODE_ENV === "development"
          ? error.message
          : "Failed to fetch approved requests. Please try again.",
      data: [],
    };
  }
};
