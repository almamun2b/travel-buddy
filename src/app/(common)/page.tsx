import LandingPageContent from "@/components/modules/home/LandingPageContent";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Travel Buddy - Connect with Travelers Worldwide",
  description:
    "Discover amazing travel experiences and connect with fellow adventurers around the world. Find travel companions and create unforgettable memories together.",
};

export default async function Home() {
  return (
    <div className="pt-20">
      <LandingPageContent />
      {/* <WhyChooseUsSection />
      <TravelCategoriesSection />
      <CTASection /> */}
    </div>
  );
}
