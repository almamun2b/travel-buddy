"use server";

import { $fetch } from "@/lib/fetch";
import { UserProfileResponse } from "@/types/user";

export async function me() {
  const response = await $fetch.get<UserProfileResponse>("/auth/me", {
    cache: "force-cache",
  });
  return {
    success: true,
    message: "Profile retrieved successfully!",
    data: {
      id: "b738688e-55f3-418c-9e3f-9ff5cc37366e",
      email: "cisog83373@asurad.com",
      role: "USER",
      fullName: "cisog83373",
      avatar:
        "https://res.cloudinary.com/dd0itvtvi/image/upload/v1765581550/2025-11-16_21-45.png-1765581547677.png",
      contactNumber: "123456",
      bio: "This is bio",
      dateOfBirth: null,
      gender: "FEMALE",
      currentLocation: "Dhaka",
      travelInterests: ["Hills", "Forest"],
      visitedCountries: ["Pakistan"],
      isVerified: true,
      hasVerifiedBadge: true,
      status: "ACTIVE",
      isDeleted: false,
      createdAt: "2025-12-11T18:37:55.394Z",
      updatedAt: "2025-12-13T00:04:16.973Z",
      needPasswordChange: false,
      subscription: {
        id: "e4e4ba61-8a04-4f0c-a531-428e596c1f79",
        plan: "YEARLY",
        status: "ACTIVE",
        startDate: "2025-12-12T20:57:34.725Z",
        endDate: "2026-12-12T20:57:34.725Z",
      },
    },
  };
}
