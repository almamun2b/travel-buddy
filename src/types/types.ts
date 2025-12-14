export type TravelType = "SOLO" | "GROUP" | "FAMILY" | "COUPLE";
export type TravelStatus = "OPEN" | "CLOSED" | "FULL";

export interface Creator {
  id: string;
  fullName: string;
  avatar: string;
  isVerified: boolean;
  hasVerifiedBadge: boolean;
}

export interface TravelPlan {
  id: string;
  title: string;
  description: string;
  destination: string;
  startDate: string;
  endDate: string;
  budget: number;
  travelType: TravelType;
  maxMembers: number;
  activities: string[];
  images: string[];
  status: TravelStatus;
  createdAt: string;
  updatedAt: string;
  creator: Creator;
}

export interface TravelPlansResponse {
  success: boolean;
  message: string;
  meta: {
    page: number;
    limit: number;
    total: number;
  };
  data: TravelPlan[];
}

export interface AuthResponse {
  success: boolean;
  message: string;
}
