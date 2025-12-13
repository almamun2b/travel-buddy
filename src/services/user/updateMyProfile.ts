/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { $fetch } from "@/lib/server-fetch";

type User = {
  email: string;
  fullName: string;
  contactNumber?: string;
  currentLocation?: string;
  travelInterests?: string;
  bio?: string;
  gender?: "MALE" | "FEMALE";
};

export const updateMyProfile = async ({
  file,
  data,
}: {
  file: File | null;
  data: User;
}): Promise<any> => {
  try {
    const formData = new FormData();

    if (file) {
      formData.append("file", file);
    }

    formData.append("data", JSON.stringify(data));

    Object.entries(data).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        formData.append(key, String(value));
      }
    });

    const res = await $fetch.patch("/user/profile/update", {
      body: formData,
    });

    const result = await res.json();
    return result;
  } catch (error: any) {
    console.log("UPDATE_PROFILE_ERROR:", error);

    return {
      success: false,
      message:
        process.env.NODE_ENV === "development"
          ? error.message
          : "Profile update failed. Please try again.",
    };
  }
};
