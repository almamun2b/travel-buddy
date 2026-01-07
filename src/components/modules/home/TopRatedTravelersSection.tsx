import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { UserProfileResponse } from "@/types/user";
import { CalendarDays, MapPin, Star, UserCheck } from "lucide-react";
import Link from "next/link";

const topTravelers = [
  {
    id: 1,
    name: "Alex Morgan",
    location: "London, UK",
    rating: 4.9,
    reviews: 24,
    interests: ["Hiking", "Photography"],
    avatar: "https://picsum.photos/seed/travel-destination/400/300",
    upcomingTrip: "Japan, March 2024",
  },
  {
    id: 2,
    name: "Sarah Chen",
    location: "Singapore",
    rating: 4.8,
    reviews: 18,
    interests: ["Food Tours", "Culture"],
    avatar: "https://picsum.photos/seed/travel-destination/400/300",
    upcomingTrip: "Italy, April 2024",
  },
  {
    id: 3,
    name: "David Park",
    location: "Seoul, Korea",
    rating: 5.0,
    reviews: 32,
    interests: ["Hiking", "Photography"],
    avatar: "https://picsum.photos/seed/travel-destination/400/300",
    upcomingTrip: "Japan, March 2024",
  },
];

interface TopRatedTravelersSectionProps {
  user: UserProfileResponse | null;
}

export default function TopRatedTravelersSection({
  user,
}: TopRatedTravelersSectionProps) {
  return (
    <section className="py-32">
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

                    {user?.data && user.data.email && (
                      <div className="mt-4 flex gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          className="flex-1 gap-2"
                          asChild
                        >
                          <Link href={`/travelers`}>
                            <UserCheck className="h-4 w-4" />
                            View Profile
                          </Link>
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
