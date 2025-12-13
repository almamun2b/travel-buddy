import LandingPageContent from "@/components/modules/home/LandingPageContent";
import { me } from "@/services/auth/me";

export default async function Home() {
  const userInfo = await me();
  return (
    <div className="pt-20">
      <LandingPageContent />
      {/* <WhyChooseUsSection />
      <TravelCategoriesSection />
      <CTASection /> */}
    </div>
  );
}
