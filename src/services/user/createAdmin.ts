/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { $fetch } from "@/lib/fetch";
import { User } from "lucide-react";

type User = {
  email: string;
  fullName: string;
  contactNumber?: string;
  currentLocation?: string;
  travelInterests?: string;
  bio?: string;
  password: string;
};
export const createAdmin = async ({
  file,
  data,
}: {
  file: File;
  data: User;
}): Promise<any> => {
  try {
    const formData = new FormData();
    
    if (file) {
      formData.append("file", file);
    }
    
    formData.append("data", JSON.stringify(data));

    const result = await $fetch.post<any>("/user/create-admin", {
      body: formData,
    });

    return result;
  } catch (error: any) {
    console.log("CREATE_ADMIN_ERROR:", error);

    return {
      success: false,
      message:
        process.env.NODE_ENV === "development"
          ? error.message
          : "Admin creation failed. Please try again.",
    };
  }
};
