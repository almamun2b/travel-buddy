import { Card, CardContent } from "@/components/ui/card";
import { MapPin, Star, Target, Users } from "lucide-react";

const stats = [
  {
    label: "Countries Covered",
    value: "85+",
    icon: <MapPin className="h-6 w-6" />,
  },
  {
    label: "Happy Travelers",
    value: "50K+",
    icon: <Users className="h-6 w-6" />,
  },
  {
    label: "Successful Matches",
    value: "120K+",
    icon: <Target className="h-6 w-6" />,
  },
  { label: "Average Rating", value: "4.8", icon: <Star className="h-6 w-6" /> },
];

export default function AboutStatsSection() {
  return (
    <section className="py-16">
      <div className="container px-4 md:px-6">
        <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.label}>
              <Card className="border-0 bg-card shadow-lg transition-all hover:shadow-xl">
                <CardContent className="flex flex-col items-center justify-center p-6 text-center">
                  <div className="mb-4 rounded-full bg-primary/10 p-3">
                    <div className="text-primary">{stat.icon}</div>
                  </div>
                  <div className="text-3xl font-bold text-primary">
                    {stat.value}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {stat.label}
                  </div>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
