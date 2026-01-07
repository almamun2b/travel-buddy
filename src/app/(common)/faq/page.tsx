import ComingSoon from "@/components/shared/ComingSoon";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "FAQ - Travel Buddy",
  description:
    "Find answers to frequently asked questions about Travel Buddy. Learn how our travel companion matching platform works and get help with common issues.",
};

const FaqPage = () => {
  return (
    <ComingSoon
      title="FAQ"
      description="We're working on a comprehensive guide to show you exactly how Travel Buddy works. This page will include step-by-step instructions, video tutorials, and best practices for finding and connecting with travel buddies."
    />
  );
};

export default FaqPage;
