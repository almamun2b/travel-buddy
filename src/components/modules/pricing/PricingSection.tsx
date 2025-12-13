/* eslint-disable @typescript-eslint/no-explicit-any */
// components/pricing/pricing-section.tsx
"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { createCheckoutSession } from "@/services/payment/createCheckoutSession";
import {
  Award,
  Check,
  Crown,
  Globe,
  Shield,
  Star,
  TrendingUp,
  Users,
  Zap,
} from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { toast } from "sonner";

interface Feature {
  name: string;
  icon: React.ReactNode;
  description: string;
}

interface Plan {
  plan: string;
  price: number;
  features: string[];
}

interface PricingSectionProps {
  plans: Plan[];
}

const PricingSection = ({ plans }: PricingSectionProps) => {
  const router = useRouter();
  const [billingCycle, setBillingCycle] = useState<"monthly" | "yearly">(
    "monthly"
  );
  const [isLoading, setIsLoading] = useState(false);

  const valueFeatures: Feature[] = [
    {
      name: "Verified Community",
      icon: <Shield className="h-5 w-5" />,
      description: "All members are ID verified for safety",
    },
    {
      name: "Global Network",
      icon: <Globe className="h-5 w-5" />,
      description: "Connect with travelers in 85+ countries",
    },
    {
      name: "Smart Matching",
      icon: <Users className="h-5 w-5" />,
      description: "AI-powered compatibility matching",
    },
    {
      name: "Priority Support",
      icon: <Award className="h-5 w-5" />,
      description: "24/7 dedicated support team",
    },
  ];

  const handleSubscribe = async (planType: string) => {
    if (planType.toLowerCase() === "free") {
      router.push("/register");
      return;
    }

    try {
      setIsLoading(true);

      const res = await createCheckoutSession({
        plan: planType.toUpperCase() as any,
      });

      if (res.success && res.data?.url) {
        window.location.href = res.data.url;
      } else {
        throw new Error(res.message || "Failed to create checkout session");
      }
    } catch (error: any) {
      console.error("Subscription error:", error);

      toast.error("Failed to initiate subscription. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  // Find the plans
  const freePlan = plans.find((p) => p.plan === "FREE");
  const monthlyPlan = plans.find((p) => p.plan === "MONTHLY");
  const yearlyPlan = plans.find((p) => p.plan === "YEARLY");

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="py-12 lg:py-20">
        <div className="container px-4 md:px-6">
          <div className="mx-auto max-w-4xl text-center">
            <Badge variant="outline" className="mb-6">
              <TrendingUp className="mr-2 h-3 w-3" />
              Join 50,000+ Travelers
            </Badge>
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
              Simple, Transparent{" "}
              <span className="bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                Pricing
              </span>
            </h1>
            <p className="mt-6 text-xl text-muted-foreground">
              Choose the perfect plan for your travel adventures. All plans
              include our core features to connect you with amazing travel
              buddies.
            </p>
          </div>
        </div>
      </section>

      {/* Billing Toggle */}
      <section className="py-8">
        <div className="container px-4 md:px-6">
          <div className="mx-auto flex max-w-md items-center justify-center rounded-lg bg-muted p-1">
            <button
              onClick={() => setBillingCycle("monthly")}
              className={`flex-1 rounded-md px-6 py-3 text-sm font-medium transition-all ${
                billingCycle === "monthly"
                  ? "bg-background shadow"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Monthly Billing
            </button>
            <button
              onClick={() => setBillingCycle("yearly")}
              className={`flex-1 rounded-md px-6 py-3 text-sm font-medium transition-all ${
                billingCycle === "yearly"
                  ? "bg-background shadow"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Yearly Billing
              <Badge variant="secondary" className="ml-2">
                Save 33%
              </Badge>{" "}
            </button>
          </div>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="py-8">
        <div className="container px-4 md:px-6">
          <div className="grid gap-8 lg:grid-cols-3 lg:gap-6">
            {/* Free Plan */}
            {freePlan && (
              <Card className="flex flex-col border-2">
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span>{freePlan.plan}</span>
                    <Badge variant="outline">Popular</Badge>
                  </CardTitle>
                  <CardDescription>Perfect for getting started</CardDescription>
                  <div className="mt-4">
                    <span className="text-4xl font-bold">
                      ${freePlan.price}
                    </span>
                    <span className="text-muted-foreground">/month</span>
                  </div>
                </CardHeader>
                <CardContent className="flex-1">
                  <ul className="space-y-3">
                    {freePlan.features.map((feature, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <Check className="h-5 w-5 text-green-500" />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button
                    disabled
                    variant="outline"
                    className="w-full"
                    onClick={() => handleSubscribe("free")}
                  >
                    Get Started Free
                  </Button>
                </CardFooter>
              </Card>
            )}

            {/* Monthly Plan */}
            {monthlyPlan && (
              <Card className="relative flex flex-col border-2 border-primary shadow-lg">
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <Badge className="gap-2 bg-primary px-4 py-1">
                    <Zap className="h-3 w-3" />
                    Most Popular
                  </Badge>
                </div>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span>{monthlyPlan.plan}</span>
                    <Crown className="h-5 w-5 text-yellow-500" />
                  </CardTitle>
                  <CardDescription>Best for regular travelers</CardDescription>
                  <div className="mt-4">
                    <span className="text-4xl font-bold">
                      ${monthlyPlan.price}
                    </span>
                    <span className="text-muted-foreground">/month</span>
                  </div>
                </CardHeader>
                <CardContent className="flex-1">
                  <ul className="space-y-3">
                    {monthlyPlan.features.map((feature, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <Check className="h-5 w-5 text-green-500" />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button
                    disabled={isLoading}
                    className="w-full"
                    onClick={() => handleSubscribe("monthly")}
                  >
                    Get Monthly Plan {isLoading ? "..." : ""}
                  </Button>
                </CardFooter>
              </Card>
            )}

            {/* Yearly Plan */}
            {yearlyPlan && (
              <Card className="relative flex flex-col border-2">
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <Badge variant="secondary" className="gap-2 px-4 py-1">
                    <Star className="h-3 w-3" />
                    Best Value
                  </Badge>
                </div>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span>{yearlyPlan.plan}</span>
                  </CardTitle>
                  <CardDescription>
                    Perfect for frequent travelers
                  </CardDescription>
                  <div className="mt-4">
                    <div className="flex items-baseline gap-2">
                      <span className="text-4xl font-bold">
                        ${yearlyPlan.price}
                      </span>
                      <span className="text-muted-foreground">/year</span>
                    </div>
                    <p className="mt-2 text-sm text-muted-foreground">
                      <span className="line-through">
                        $
                        {monthlyPlan
                          ? (monthlyPlan.price * 12).toFixed(2)
                          : "119.88"}
                      </span>{" "}
                      <span className="text-green-600">Save 33%</span>
                    </p>
                  </div>
                </CardHeader>
                <CardContent className="flex-1">
                  <ul className="space-y-3">
                    {yearlyPlan.features.map((feature, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <Check className="h-5 w-5 text-green-500" />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button
                    disabled={isLoading}
                    variant="outline"
                    className="w-full"
                    onClick={() => handleSubscribe("yearly")}
                  >
                    Get Yearly Plan {isLoading ? "..." : ""}
                  </Button>
                </CardFooter>
              </Card>
            )}
          </div>
        </div>
      </section>

      {/* Value Features */}
      <section className="py-16">
        <div className="container px-4 md:px-6">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-bold tracking-tight">
              Why Travelers Love Us
            </h2>
            <p className="mt-4 text-xl text-muted-foreground">
              All plans include our core features designed for the best travel
              buddy experience
            </p>
          </div>

          <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {valueFeatures.map((feature) => (
              <div key={feature.name} className="text-center">
                <div className="mb-4 inline-flex rounded-full bg-primary/10 p-3">
                  <div className="text-primary">{feature.icon}</div>
                </div>
                <h3 className="mb-2 font-semibold">{feature.name}</h3>
                <p className="text-sm text-muted-foreground">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-muted/30">
        <div className="container px-4 md:px-6">
          <div className="mx-auto max-w-3xl">
            <h2 className="text-center text-3xl font-bold tracking-tight">
              Frequently Asked Questions
            </h2>

            <div className="mt-12 space-y-6">
              <div className="rounded-lg border bg-card p-6">
                <h3 className="font-semibold">Can I switch plans anytime?</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  Yes! You can upgrade or downgrade your plan at any time.
                  Changes take effect immediately.
                </p>
              </div>

              <div className="rounded-lg border bg-card p-6">
                <h3 className="font-semibold">
                  Is there a free trial for paid plans?
                </h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  We offer a 7-day free trial for both Monthly and Yearly plans.
                  No credit card required.
                </p>
              </div>

              <div className="rounded-lg border bg-card p-6">
                <h3 className="font-semibold">How do cancellations work?</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  You can cancel anytime. If you cancel a paid plan, youll keep
                  access until the end of your billing period.
                </p>
              </div>

              <div className="rounded-lg border bg-card p-6">
                <h3 className="font-semibold">
                  What payment methods do you accept?
                </h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  We accept all major credit cards, PayPal, and in some regions,
                  local payment methods.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16">
        <div className="container px-4 md:px-6">
          <div className="mx-auto max-w-4xl">
            <Card className="border-0 bg-gradient-to-r from-primary/10 to-primary/5 shadow-2xl">
              <CardContent className="p-8 text-center md:p-12">
                <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                  Ready to Find Your Perfect Travel Buddy?
                </h2>
                <p className="mt-4 text-xl text-muted-foreground">
                  Join thousands of travelers whove found amazing adventures and
                  lifelong friends.
                </p>
                <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:justify-center">
                  <Button
                    size="lg"
                    className="gap-2"
                    onClick={() => monthlyPlan && handleSubscribe("monthly")}
                  >
                    Start Free Trial
                  </Button>
                  <Button size="lg" variant="outline" asChild>
                    <a href="/contact">Contact Sales</a>
                  </Button>
                </div>
                <p className="mt-6 text-sm text-muted-foreground">
                  Free plan available. No credit card required to start.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <Separator />

      {/* Trust Badges */}
      <div className="py-8">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
            <div className="text-center text-sm text-muted-foreground">
              <p>
                ✅ 30-day money-back guarantee • 🔒 Secure payment • 🌍 Trusted
                by 50,000+ travelers
              </p>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Shield className="h-4 w-4" />
              <span>SSL Secured</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PricingSection;
