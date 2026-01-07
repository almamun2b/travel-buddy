"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Calendar,
  Globe,
  Heart,
  MapPin,
  Search,
  Shield,
  TrendingUp,
  Users,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function HeroSection() {
  const router = useRouter();
  const [searchDestination, setSearchDestination] = useState("");
  const [searchDate, setSearchDate] = useState("");
  const [searchType, setSearchType] = useState("");

  const handleSearch = () => {
    const params = new URLSearchParams();
    if (searchDestination) params.set("destination", searchDestination);
    if (searchDate) params.set("startDate", searchDate);
    if (searchType) params.set("travelType", searchType);

    router.push(`/travel-plan?${params.toString()}`);
  };

  return (
    <section className="relative overflow-hidden py-16 lg:py-28">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-secondary/10" />
      <div className="container relative z-10 px-4 md:px-6">
        <div className="mx-auto max-w-4xl text-center">
          <Badge variant="outline" className="mb-6">
            <TrendingUp className="mr-2 h-3 w-3" />
            Join 50,000+ Travelers
          </Badge>
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
            Travel <span className="text-primary">Together</span>, Create{" "}
            <span className="text-primary">Forever</span>
          </h1>
          <p className="mt-6 text-xl text-muted-foreground md:text-2xl">
            Find perfect travel companions for your next adventure. Share
            experiences, split costs, and make lifelong friends.
          </p>

          {/* Search Bar */}
          <div className="mt-10">
            <Card className="mx-auto max-w-4xl border-0 bg-card/50 shadow-lg backdrop-blur-sm">
              <CardContent className="p-6">
                <div className="grid gap-4 md:grid-cols-4">
                  <div className="space-y-2">
                    <Label
                      htmlFor="destination"
                      className="flex items-center gap-2"
                    >
                      <MapPin className="h-4 w-4" />
                      Destination
                    </Label>
                    <Input
                      id="destination"
                      placeholder="Where do you want to go?"
                      value={searchDestination}
                      onChange={(e) => setSearchDestination(e.target.value)}
                      className="bg-background"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="date" className="flex items-center gap-2">
                      <Calendar className="h-4 w-4" />
                      Travel Date
                    </Label>
                    <Input
                      id="date"
                      type="date"
                      value={searchDate}
                      onChange={(e) => setSearchDate(e.target.value)}
                      className="bg-background"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="type" className="flex items-center gap-2">
                      <Users className="h-4 w-4" />
                      Travel Type
                    </Label>
                    <Select value={searchType} onValueChange={setSearchType}>
                      <SelectTrigger className="bg-background">
                        <SelectValue placeholder="Any type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="SOLO">Solo</SelectItem>
                        <SelectItem value="FAMILY">Family</SelectItem>
                        <SelectItem value="COUPLE">Couple</SelectItem>
                        <SelectItem value="GROUP">Group</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex items-end">
                    <Button
                      onClick={handleSearch}
                      className="w-full gap-2"
                      size="lg"
                    >
                      <Search className="h-4 w-4" />
                      Find Buddies
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="mt-12 flex flex-wrap justify-center gap-6">
            <div className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-green-500" />
              <span className="text-sm">Verified Profiles</span>
            </div>
            <div className="flex items-center gap-2">
              <Globe className="h-5 w-5 text-blue-500" />
              <span className="text-sm">85+ Countries</span>
            </div>
            <div className="flex items-center gap-2">
              <Heart className="h-5 w-5 text-red-500" />
              <span className="text-sm">120K+ Successful Matches</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
