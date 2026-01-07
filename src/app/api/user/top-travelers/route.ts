import { getTopTravelers } from "@/services/user/getAllUsers";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const topTravelers = await getTopTravelers();
    return NextResponse.json(topTravelers);
  } catch (error) {
    console.error("Error in top travelers API route:", error);
    return NextResponse.json(
      {
        success: false,
        message:
          error instanceof Error
            ? error.message
            : "Failed to fetch top travelers",
      },
      { status: 500 }
    );
  }
}
