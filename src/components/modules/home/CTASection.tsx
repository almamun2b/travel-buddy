import { Button } from "@/components/ui/button";
import { ArrowRight, Check } from "lucide-react";

const CTASection = () => (
  <section className="py-20 px-4 bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-800 dark:to-purple-800 text-white">
    <div className="max-w-4xl mx-auto text-center space-y-8">
      <h2 className="text-4xl md:text-5xl font-bold">
        Ready to Find Your Travel Buddy?
      </h2>
      <p className="text-xl text-white/90 dark:text-white/80">
        Join thousands of travelers who have found their perfect companions.
        Your next adventure starts here.
      </p>
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Button
          size="lg"
          className="bg-white text-blue-600 hover:bg-neutral-100 dark:bg-neutral-100 dark:text-blue-600 dark:hover:bg-white rounded-full px-8"
        >
          Start Your Journey
          <ArrowRight className="ml-2 w-5 h-5" />
        </Button>
        <Button
          size="lg"
          variant="outline"
          className="border-white text-white hover:bg-white/10 dark:border-white/80 dark:hover:bg-white/20 rounded-full px-8"
        >
          Learn More
        </Button>
      </div>
      <div className="flex flex-wrap justify-center gap-8 pt-8 text-sm">
        <div className="flex items-center gap-2">
          <Check className="w-5 h-5" />
          <span>Free to Join</span>
        </div>
        <div className="flex items-center gap-2">
          <Check className="w-5 h-5" />
          <span>Verified Travelers</span>
        </div>
        <div className="flex items-center gap-2">
          <Check className="w-5 h-5" />
          <span>Secure Platform</span>
        </div>
      </div>
    </div>
  </section>
);

export default CTASection;
