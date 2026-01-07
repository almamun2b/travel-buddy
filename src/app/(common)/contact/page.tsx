import ComingSoon from "@/components/shared/ComingSoon";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us - Travel Buddy",
  description:
    "Get in touch with the Travel Buddy team. We're here to help with any questions about your travel companion matching journey.",
};

const ContactPage = () => {
  return (
    <ComingSoon
      title="Contact Us"
      description="We're working on a comprehensive guide to show you exactly how Travel Buddy works. This page will include step-by-step instructions, video tutorials, and best practices for finding and connecting with travel buddies."
    />
  );
};

export default ContactPage;
