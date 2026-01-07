import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { getTopTravelers } from "@/services/user/getTopTravelers";
import type { TopTraveler, UserProfileResponse } from "@/types/user";
import { CalendarDays, MapPin, Star, UserCheck } from "lucide-react";
import Link from "next/link";

interface TopRatedTravelersSectionProps {
  user: UserProfileResponse | null;
}

export default async function TopRatedTravelersSection({
  user,
}: TopRatedTravelersSectionProps) {
  let topTravelers: TopTraveler[] = [];
  let error: string | null = null;

  try {
    const result = await getTopTravelers();
    topTravelers = result.data;
  } catch (err) {
    error =
      err instanceof Error ? err.message : "Failed to fetch top travelers";
    console.error("Error fetching top travelers:", err);
  }

  if (error) {
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
          <div className="mt-8 text-center">
            <p className="text-red-500">{error}</p>
          </div>
        </div>
      </section>
    );
  }

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
                    <AvatarImage
                      src={traveler.avatar}
                      alt={traveler.fullName}
                    />
                    <AvatarFallback>
                      {traveler.fullName
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="font-semibold">{traveler.fullName}</h3>
                        <p className="text-sm text-muted-foreground">
                          <MapPin className="mr-1 inline h-3 w-3" />
                          {traveler.location}
                        </p>
                      </div>
                      <Badge variant="secondary" className="gap-1">
                        <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                        {traveler.avgRating}
                      </Badge>
                    </div>

                    <div className="mt-3 flex flex-wrap gap-2">
                      {traveler.travelInterests.map((interest) => (
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
                        {traveler.nextTrip
                          ? `Next trip: ${traveler.nextTrip}`
                          : "No upcoming trip"}
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
                          <Link href={`/travelers/${traveler.id}`}>
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
