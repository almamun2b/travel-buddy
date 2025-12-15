export interface SubscriptionPlan {
  plan: string;
  price: number;
  features: string[];
}

export interface SubscriptionPlansResponse {
  success: boolean;
  message: string;
  data: SubscriptionPlan[];
}
