import LandingPageContent from "@/components/modules/home/LandingPageContent";
export const dynamic = "force-dynamic";
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
