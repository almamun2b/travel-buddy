import ComingSoon from "@/components/shared/ComingSoon";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Travel Blog - Travel Buddy",
  description:
    "Read travel tips, stories, and guides from the Travel Buddy community and travel experts.",
};

export default function Blog() {
  return (
    <ComingSoon
      title="Travel Blog"
      description="Our travel blog is coming soon with expert tips, destination guides, packing lists, and inspiring stories from experienced travelers around the world."
    />
  );
}
