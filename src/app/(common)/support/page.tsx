import ComingSoon from "@/components/shared/ComingSoon";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Support Center - Travel Buddy",
  description:
    "Get help and support for your Travel Buddy account and travel planning needs.",
};

export default function Support() {
  return (
    <ComingSoon
      title="Support Center"
      description="Our comprehensive support center is coming soon. You'll find help articles, FAQs, contact options, and live chat support to assist with all your travel buddy needs."
    />
  );
}
