import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { MapPin, Star } from "lucide-react";

const TopRatedTravelersSection = () => {
  const travelers = [
    {
      name: "Sarah Chen",
      location: "San Francisco, CA",
      rating: 4.9,
      trips: 24,
      avatar: "SC",
      interests: ["Photography", "Hiking"],
    },
    {
      name: "Marcus Johnson",
      location: "London, UK",
      rating: 4.8,
      trips: 18,
      avatar: "MJ",
      interests: ["Food Tours", "Culture"],
    },
    {
      name: "Emma Rodriguez",
      location: "Barcelona, Spain",
      rating: 5.0,
      trips: 32,
      avatar: "ER",
      interests: ["Adventure", "Beach"],
    },
    {
      name: "Yuki Tanaka",
      location: "Tokyo, Japan",
      rating: 4.9,
      trips: 27,
      avatar: "YT",
      interests: ["Art", "Cafe Hopping"],
    },
  ];

  return (
    <section className="py-20 px-4 bg-neutral-50 dark:bg-neutral-950">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <Badge className="mb-4">Community Stars</Badge>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Top-Rated Travelers
          </h2>
          <p className="text-xl text-muted-foreground">
            Connect with experienced and trusted travel companions
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {travelers.map((traveler, index) => (
            <Card key={index} className="hover:shadow-xl transition-shadow">
              <CardHeader className="text-center">
                <Avatar className="w-24 h-24 mx-auto mb-4 border-4 border-blue-500 dark:border-blue-600">
                  <AvatarFallback className="text-2xl bg-gradient-to-br from-blue-500 to-purple-500 dark:from-blue-600 dark:to-purple-600 text-white">
                    {traveler.avatar}
                  </AvatarFallback>
                </Avatar>
                <CardTitle className="text-xl">{traveler.name}</CardTitle>
                <CardDescription className="flex items-center justify-center gap-1 text-sm">
                  <MapPin className="w-3 h-3" />
                  {traveler.location}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400 dark:fill-yellow-500 dark:text-yellow-500" />
                    <span className="font-semibold">{traveler.rating}</span>
                  </div>
                  <span className="text-sm text-muted-foreground">
                    {traveler.trips} trips
                  </span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {traveler.interests.map((interest, i) => (
                    <Badge key={i} variant="secondary" className="text-xs">
                      {interest}
                    </Badge>
                  ))}
                </div>
                <Button className="w-full" size="sm">
                  View Profile
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TopRatedTravelersSection;
