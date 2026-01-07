import ComingSoon from "@/components/shared/ComingSoon";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Careers - Travel Buddy",
  description:
    "Join the Travel Buddy team and help connect travelers worldwide. Explore career opportunities.",
};

export default function Careers() {
  return (
    <ComingSoon
      title="Careers"
      description="We're building a passionate team to help travelers connect worldwide. Soon you'll find information about open positions, company culture, and how you can join our mission to make travel more social and accessible."
    />
  );
}
