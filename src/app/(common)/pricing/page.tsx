// app/pricing/page.tsx
import PricingSection from "@/components/modules/pricing/PricingSection";
import { getSubscriptionPlans } from "@/services/payment/getSubscriptionPlans";

const PricingPage = async () => {
  const result = await getSubscriptionPlans();

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
