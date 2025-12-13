/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { $fetch } from "@/lib/server-fetch";
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
    const payload = { file, data };
    const res = await $fetch.post("/user/create-admin", {
      body: JSON.stringify(payload),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const result = await res.json();

    return result;
  } catch (error: any) {
    console.log("REGISTER_ERROR:", error);

    return {
      success: false,
      message:
        process.env.NODE_ENV === "development"
          ? error.message
          : "Registration failed. Please try again.",
    };
  }
};
