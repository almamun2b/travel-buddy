/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { $fetch } from "@/lib/server-fetch";

export const registerUser = async (data: any): Promise<any> => {
  try {
    const payload = {
      email: data.email,
      password: data.password,
    };

    const res = await $fetch.post("/auth/register", {
      body: JSON.stringify(payload),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const result = await res.json();

    if (!result.success) {
      throw new Error(result.message || "Registration failed");
    }
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
