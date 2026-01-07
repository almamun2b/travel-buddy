"use client";

import { useState } from "react";
import PricingCards from "./PricingCards";
import PricingToggle from "./PricingToggle";

interface Plan {
  plan: string;
  price: number;
  features: string[];
}

interface PricingInteractiveProps {
  plans: Plan[];
}

export default function PricingInteractive({ plans }: PricingInteractiveProps) {
  const [billingCycle, setBillingCycle] = useState<"monthly" | "yearly">(
    "monthly"
  );

  return (
    <>
      <PricingToggle onBillingCycleChange={setBillingCycle} />
      <PricingCards plans={plans} billingCycle={billingCycle} />
    </>
  );
}
