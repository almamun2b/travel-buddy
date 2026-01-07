import ComingSoon from "@/components/shared/ComingSoon";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "How It Works - Travel Buddy",
  description:
    "Learn how Travel Buddy connects travelers worldwide and helps you find your perfect travel companion.",
};

export default function HowItWorks() {
  return (
    <ComingSoon
      title="How It Works"
      description="We're working on a comprehensive guide to show you exactly how Travel Buddy works. This page will include step-by-step instructions, video tutorials, and best practices for finding and connecting with travel buddies."
    />
  );
}
