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

export interface TravelPlanSearchParams {
  limit?: number;
  page?: number;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
  searchTerm?: string;
  destination?: string;
  travelType?: string;
  minBudget?: string;
  maxBudget?: string;
  startDate?: string;
  endDate?: string;
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
  data?: {
    accessToken?: string;
    refreshToken?: string;
  };
}

export interface TravelPlanDetails {
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
  creator: {
    id: string;
    fullName: string;
    avatar: string;
    isVerified: boolean;
    hasVerifiedBadge: boolean;
  };
  travelRequests: unknown[];
  _count: {
    travelRequests: number;
  };
}

export interface TravelPlanDetailsResponse {
  success: boolean;
  message: string;
  data: TravelPlan;
}

export type Params = Record<string, string | number | boolean>;

export interface TravelPlansParams extends Partial<Params> {
  page?: string;
  limit?: string;
  searchTerm?: string;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
}
