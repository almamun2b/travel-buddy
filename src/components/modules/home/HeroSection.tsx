/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowRight, MapPin, Search, Sparkles } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

const HeroSection = ({ userInfo }: any) => {
  const [searchQuery, setSearchQuery] = useState("");
  return (
    <section className="relative bg-gradient-to-br from-blue-600 via-purple-600 to-pink-500 dark:from-blue-900 dark:via-purple-900 dark:to-pink-900 text-white py-20 px-4 overflow-hidden">
      <div className="absolute inset-0 bg-black/10 dark:bg-black/30"></div>
      <div className="max-w-6xl mx-auto relative z-10">
        <div className="text-center space-y-6">
          <Badge className="bg-white/20 dark:bg-white/10 text-white border-white/30 dark:border-white/20 px-4 py-1">
            <Sparkles className="w-4 h-4 mr-2 inline" />
            Connect with 50,000+ Travelers Worldwide
          </Badge>
          <h1 className="text-5xl md:text-7xl font-bold leading-tight">
            Find Your Perfect
            <span className="block text-yellow-300 dark:text-yellow-400">
              Travel Buddy
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-white/90 dark:text-white/80 max-w-2xl mx-auto">
            Transform solo journeys into shared adventures. Connect with
            like-minded travelers heading to your dream destinations.
          </p>

          {/* Search Bar */}
          <div className="max-w-3xl mx-auto mt-8 bg-white dark:bg-neutral-900 rounded-full p-2 shadow-2xl">
            <div className="flex flex-col md:flex-row gap-2">
              <div className="flex-1 relative">
                <MapPin className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
                <Input
                  placeholder="Where do you want to go?"
                  className="pl-12 border-0 focus-visible:ring-0 bg-transparent"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Button
                size="lg"
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 dark:from-blue-700 dark:to-purple-700 dark:hover:from-blue-800 dark:hover:to-purple-800 rounded-full px-8"
              >
                <Search className="w-5 h-5 mr-2" />
                Find Buddies
              </Button>
            </div>
          </div>

          <div className="flex flex-wrap justify-center gap-4 mt-8 pb-20">
            {!userInfo?.data?.email && (
              <Button
                asChild
                size="lg"
                className="bg-white text-blue-600 hover:bg-neutral-100 dark:bg-neutral-100 dark:text-blue-600 dark:hover:bg-white rounded-full px-8"
              >
                <Link href="/register">
                  Get Started Free
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
              </Button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
