import PricingSection from "@/components/modules/pricing/PricingSection";
import { getSubscriptionPlans } from "@/services/payment/getSubscriptionPlans";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pricing - Travel Buddy",
  description:
    "Explore Travel Buddy's subscription plans and pricing options. Find the perfect plan for your travel companion matching needs.",
};

const PricingPage = async () => {
  const result = await getSubscriptionPlans();

  if (!result) return;

  if (!result.success) {
    return (
      <div className="container px-4 py-16 text-center">
        <h1 className="text-3xl font-bold">Pricing</h1>
        <p className="mt-4 text-muted-foreground">
          Unable to load pricing plans. Please try again later.
        </p>
      </div>
    );
  }

  const subscriptionPlans = result.data;

  return <PricingSection plans={subscriptionPlans} />;
};

export default PricingPage;
