"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
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
  ArrowRight,
  Calendar,
  CalendarDays,
  Camera,
  CheckCircle,
  Clock,
  Compass,
  DollarSign,
  Globe,
  Heart,
  MapPin,
  MessageSquare,
  Mountain,
  Plane,
  Search,
  Shield,
  Star,
  ThumbsUp,
  TrendingUp,
  UserCheck,
  Users,
  Utensils,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

// Mock data for destinations with real Unsplash images
const popularDestinations = [
  {
    id: 1,
    name: "Bali, Indonesia",
    travelers: 45,
    image:
      "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=800&q=80",
    country: "Indonesia",
  },
  {
    id: 2,
    name: "Tokyo, Japan",
    travelers: 38,
    image:
      "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&w=800&q=80",
    country: "Japan",
  },
  {
    id: 3,
    name: "Paris, France",
    travelers: 52,
    image:
      "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=800&q=80",
    country: "France",
  },
  {
    id: 4,
    name: "New York, USA",
    travelers: 41,
    image:
      "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?auto=format&fit=crop&w=800&q=80",
    country: "USA",
  },
  {
    id: 5,
    name: "Bangkok, Thailand",
    travelers: 36,
    image:
      "https://images.unsplash.com/photo-1563492065599-3520f775eeed?auto=format&fit=crop&w=800&q=80",
    country: "Thailand",
  },
  {
    id: 6,
    name: "Sydney, Australia",
    travelers: 29,
    image:
      "https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?auto=format&fit=crop&w=800&q=80",
    country: "Australia",
  },
];

// Mock data for top-rated travelers with avatar images
const topTravelers = [
  {
    id: 1,
    name: "Alex Morgan",
    location: "London, UK",
    rating: 4.9,
    reviews: 24,
    interests: ["Hiking", "Photography"],
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80",
    upcomingTrip: "Japan, March 2024",
  },
  {
    id: 2,
    name: "Sarah Chen",
    location: "Singapore",
    rating: 4.8,
    reviews: 18,
    interests: ["Food Tours", "Culture"],
    avatar:
      "https://images.unsplash.com/photo-1494790108755-2616b612b786?auto=format&fit=crop&w=200&q=80",
    upcomingTrip: "Italy, April 2024",
  },
  {
    id: 3,
    name: "David Park",
    location: "Seoul, Korea",
    rating: 5.0,
    reviews: 32,
    interests: ["Adventure", "Nightlife"],
    avatar:
      "https://images.unsplash.com/photo-1507591064344-4c6ce005-128?auto=format&fit=crop&w=200&q=80",
    upcomingTrip: "Thailand, May 2024",
  },
];

// Mock data for testimonials with avatar images
const testimonials = [
  {
    id: 1,
    name: "Maria Rodriguez",
    location: "Madrid, Spain",
    content:
      "Found the perfect travel buddy for my Bali trip! We're still friends and planning our next adventure together.",
    rating: 5,
    avatar:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
    date: "2 weeks ago",
  },
  {
    id: 2,
    name: "James Wilson",
    location: "Toronto, Canada",
    content:
      "As a solo traveler, this platform changed everything. Met amazing people and shared unforgettable experiences.",
    rating: 5,
    avatar:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80",
    date: "1 month ago",
  },
  {
    id: 3,
    name: "Priya Patel",
    location: "Mumbai, India",
    content:
      "The matching algorithm is spot on! Found someone with exactly the same travel style and interests.",
    rating: 4,
    avatar:
      "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=200&q=80",
    date: "3 weeks ago",
  },
];

// How it works steps
const howItWorks = [
  {
    step: 1,
    title: "Create Your Profile",
    description:
      "Share your travel interests, preferences, and upcoming trip plans.",
    icon: <UserCheck className="h-8 w-8" />,
  },
  {
    step: 2,
    title: "Find Travel Buddies",
    description:
      "Browse through verified travelers or use our smart matching system.",
    icon: <Search className="h-8 w-8" />,
  },
  {
    step: 3,
    title: "Connect & Plan",
    description:
      "Chat with potential buddies and plan your adventure together.",
    icon: <MessageSquare className="h-8 w-8" />,
  },
  {
    step: 4,
    title: "Travel & Share",
    description: "Embark on your journey and create unforgettable memories.",
    icon: <Plane className="h-8 w-8" />,
  },
];

// Travel categories
const travelCategories = [
  {
    id: 1,
    name: "Adventure",
    icon: <Mountain className="h-6 w-6" />,
    count: 245,
  },
  {
    id: 2,
    name: "Food & Culture",
    icon: <Utensils className="h-6 w-6" />,
    count: 189,
  },
  {
    id: 3,
    name: "Photography",
    icon: <Camera className="h-6 w-6" />,
    count: 156,
  },
  {
    id: 4,
    name: "Solo Travel",
    icon: <Compass className="h-6 w-6" />,
    count: 312,
  },
  {
    id: 5,
    name: "Budget Travel",
    icon: <DollarSign className="h-6 w-6" />,
    count: 278,
  },
  {
    id: 6,
    name: "Family Trips",
    icon: <Users className="h-6 w-6" />,
    count: 134,
  },
];

export default function LandingPageContent() {
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
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
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

      {/* How It Works Section */}
      <section className="py-16 bg-muted/30">
        <div className="container px-4 md:px-6">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              How Travel Buddy Works
            </h2>
            <p className="mt-4 text-xl text-muted-foreground">
              Find your perfect travel companion in just 4 simple steps
            </p>
          </div>

          <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {howItWorks.map((step) => (
              <div key={step.step} className="relative">
                <Card className="h-full border-0 bg-card shadow-lg transition-all hover:shadow-xl">
                  <CardContent className="p-6 text-center">
                    <div className="mb-4 inline-flex rounded-full bg-primary/10 p-3">
                      <div className="text-primary">{step.icon}</div>
                    </div>
                    <div className="mb-2 inline-flex items-center justify-center rounded-full bg-primary px-3 py-1 text-sm font-semibold text-primary-foreground">
                      Step {step.step}
                    </div>
                    <h3 className="mb-2 text-lg font-semibold">{step.title}</h3>
                    <p className="text-sm text-muted-foreground">
                      {step.description}
                    </p>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Destinations */}
      <section className="py-16">
        <div className="container px-4 md:px-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-3xl font-bold tracking-tight">
                Popular Destinations
              </h2>
              <p className="mt-2 text-muted-foreground">
                Where our community is traveling next
              </p>
            </div>
          </div>

          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {popularDestinations.map((destination) => (
              <Card
                key={destination.id}
                className="group overflow-hidden border-0 shadow-lg transition-all hover:shadow-xl"
              >
                <div className="relative h-64 overflow-hidden">
                  <Image
                    src={destination.image}
                    alt={destination.name}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <div className="mb-2">
                      <Badge className="bg-white/20 backdrop-blur-sm border-0 text-white hover:bg-white/30">
                        {destination.country}
                      </Badge>
                    </div>
                    <h3 className="text-2xl font-bold drop-shadow-lg">
                      {destination.name}
                    </h3>
                  </div>

                  <Badge className="absolute right-4 top-4 bg-white/20 backdrop-blur-sm border-0 text-white hover:bg-white/30">
                    <Users className="mr-1 h-3 w-3" />
                    {destination.travelers} travelers
                  </Badge>
                </div>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <Button
                      variant="ghost"
                      size="sm"
                      asChild
                      className="gap-2 hover:bg-primary/10"
                    >
                      <Link href={`/travel-plan`}>
                        <Search className="h-4 w-4" />
                        Find Buddies
                      </Link>
                    </Button>
                    <Button size="sm" asChild className="gap-2">
                      <Link href={`/travel-plans/my-travel-plan`}>
                        <Calendar className="h-4 w-4" />
                        Create Plan
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Travel Categories */}
      <section className="py-16 bg-muted/30">
        <div className="container px-4 md:px-6">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-bold tracking-tight">
              Browse by Interest
            </h2>
            <p className="mt-4 text-xl text-muted-foreground">
              Connect with travelers who share your passions
            </p>
          </div>

          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {travelCategories.map((category) => (
              <Card
                key={category.id}
                className="group cursor-pointer border-0 bg-card shadow-sm transition-all hover:shadow-lg hover:border-primary/50"
                onClick={() => router.push(`/travel-plan`)}
              >
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="rounded-lg bg-primary/10 p-3">
                        <div className="text-primary">{category.icon}</div>
                      </div>
                      <div>
                        <h3 className="font-semibold">{category.name}</h3>
                        <p className="text-sm text-muted-foreground">
                          {category.count} travelers
                        </p>
                      </div>
                    </div>
                    <ArrowRight className="h-5 w-5 text-muted-foreground transition-transform group-hover:translate-x-1" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Top Rated Travelers */}
      <section className="py-16">
        <div className="container px-4 md:px-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-3xl font-bold tracking-tight">
                Top Rated Travelers
              </h2>
              <p className="mt-2 text-muted-foreground">
                Connect with our most trusted community members
              </p>
            </div>
          </div>

          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {topTravelers.map((traveler) => (
              <Card key={traveler.id} className="border-0 shadow-lg">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <Avatar className="h-16 w-16 border-2 border-primary/20">
                      <AvatarImage src={traveler.avatar} alt={traveler.name} />
                      <AvatarFallback>
                        {traveler.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="font-semibold">{traveler.name}</h3>
                          <p className="text-sm text-muted-foreground">
                            <MapPin className="mr-1 inline h-3 w-3" />
                            {traveler.location}
                          </p>
                        </div>
                        <Badge variant="secondary" className="gap-1">
                          <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                          {traveler.rating}
                        </Badge>
                      </div>

                      <div className="mt-3 flex flex-wrap gap-2">
                        {traveler.interests.map((interest) => (
                          <Badge
                            key={interest}
                            variant="outline"
                            className="text-xs"
                          >
                            {interest}
                          </Badge>
                        ))}
                      </div>

                      <div className="mt-4 text-sm">
                        <p className="text-muted-foreground">
                          <CalendarDays className="mr-1 inline h-3 w-3" />
                          Next trip: {traveler.upcomingTrip}
                        </p>
                      </div>

                      <div className="mt-4  gap-2 hidden">
                        <Button
                          size="sm"
                          variant="outline"
                          className="flex-1 gap-2"
                          asChild
                        >
                          <Link href={`/profile/${traveler.id}`}>
                            <UserCheck className="h-4 w-4" />
                            View Profile
                          </Link>
                        </Button>
                        <Button size="sm" className="flex-1 gap-2" asChild>
                          <Link href={`/messages/${traveler.id}`}>
                            <MessageSquare className="h-4 w-4" />
                            Message
                          </Link>
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-muted/30">
        <div className="container px-4 md:px-6">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-bold tracking-tight">
              Traveler Stories
            </h2>
            <p className="mt-4 text-xl text-muted-foreground">
              Hear from our community about their shared adventures
            </p>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {testimonials.map((testimonial) => (
              <Card key={testimonial.id} className="border-0 shadow-lg">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3">
                    <Avatar>
                      <AvatarImage
                        src={testimonial.avatar}
                        alt={testimonial.name}
                      />
                      <AvatarFallback>
                        {testimonial.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h4 className="font-semibold">{testimonial.name}</h4>
                      <p className="text-sm text-muted-foreground">
                        {testimonial.location}
                      </p>
                    </div>
                    <div className="ml-auto flex items-center gap-1">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="font-semibold">
                        {testimonial.rating}
                      </span>
                    </div>
                  </div>

                  <p className="mt-4 text-muted-foreground">
                    {testimonial.content}
                  </p>

                  <div className="mt-4 flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">
                      {testimonial.date}
                    </span>
                    <ThumbsUp className="h-4 w-4 text-green-500" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16">
        <div className="container px-4 md:px-6">
          <Card className="border-0 bg-gradient-to-r from-primary/10 to-primary/5 shadow-2xl">
            <CardContent className="p-8 text-center md:p-12">
              <div className="mx-auto max-w-3xl">
                <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                  Ready to Find Your Perfect Travel Buddy?
                </h2>
                <p className="mt-4 text-xl text-muted-foreground">
                  Join thousands of travelers creating unforgettable memories
                  together. Share costs, share experiences, make lifelong
                  friends.
                </p>
                <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:justify-center">
                  <Button size="lg" asChild className="gap-2">
                    <Link href="/register">
                      Start Your Journey
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </Button>
                  <Button size="lg" variant="outline" asChild>
                    <Link href="/travel-plan">Browse Travel Plans</Link>
                  </Button>
                </div>
                <div className="mt-8 flex flex-wrap justify-center gap-6 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    No credit card required
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-blue-500" />
                    Set up in 5 minutes
                  </div>
                  <div className="flex items-center gap-2">
                    <Shield className="h-4 w-4 text-purple-500" />
                    100% verified profiles
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Stats Footer */}
      <div className="border-t py-8">
        <div className="container px-4 md:px-6">
          <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
            <div className="text-center">
              <div className="text-3xl font-bold text-primary">50K+</div>
              <div className="text-sm text-muted-foreground">
                Happy Travelers
              </div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary">120K+</div>
              <div className="text-sm text-muted-foreground">
                Successful Matches
              </div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary">85+</div>
              <div className="text-sm text-muted-foreground">
                Countries Covered
              </div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary">4.8</div>
              <div className="text-sm text-muted-foreground">
                Average Rating
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
