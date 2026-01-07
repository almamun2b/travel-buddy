import ComingSoon from "@/components/shared/ComingSoon";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service - Travel Buddy",
  description: "Travel Buddy terms of service and user agreement.",
};

export default function Terms() {
  return (
    <ComingSoon
      title="Terms of Service"
      description="Our terms of service are being finalized. Soon you'll find the complete user agreement, service terms, and usage policies for the Travel Buddy platform."
    />
  );
}
