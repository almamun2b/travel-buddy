import ComingSoon from "@/components/shared/ComingSoon";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy - Travel Buddy",
  description:
    "Travel Buddy privacy policy and how we protect your personal information.",
};

export default function Privacy() {
  return (
    <ComingSoon
      title="Privacy Policy"
      description="Our comprehensive privacy policy is being prepared. Soon you'll find detailed information about how we collect, use, and protect your personal data and travel preferences."
    />
  );
}
