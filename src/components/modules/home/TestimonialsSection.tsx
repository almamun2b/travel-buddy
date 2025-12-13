import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Plane, Star } from "lucide-react";

const TestimonialsSection = () => {
  const testimonials = [
    {
      name: "Alexandra Kim",
      location: "Seattle, WA",
      avatar: "AK",
      rating: 5,
      text: "I found the perfect travel buddy for my trip to Iceland! We both loved photography and hiking. It turned what would have been a solo trip into an unforgettable adventure.",
      trip: "Iceland Adventure",
    },
    {
      name: "David Martinez",
      location: "Miami, FL",
      avatar: "DM",
      rating: 5,
      text: "As someone who travels for work, I always felt lonely eating alone. This platform helped me find local professionals to grab dinner with. Game changer!",
      trip: "Business Travel",
    },
    {
      name: "Priya Patel",
      location: "Mumbai, India",
      avatar: "PP",
      rating: 5,
      text: "Met two amazing people through this app for my Europe trip. We're still best friends and planning our next adventure together. Highly recommend!",
      trip: "Europe Backpacking",
    },
  ];

  return (
    <section className="py-20 px-4 bg-background">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <Badge className="mb-4">Success Stories</Badge>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Traveler Testimonials
          </h2>
          <p className="text-xl text-muted-foreground">
            Real stories from travelers who found their perfect companions
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="hover:shadow-xl transition-shadow">
              <CardHeader>
                <div className="flex items-start gap-4">
                  <Avatar className="w-12 h-12">
                    <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-500 dark:from-blue-600 dark:to-purple-600 text-white">
                      {testimonial.avatar}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <CardTitle className="text-lg">
                      {testimonial.name}
                    </CardTitle>
                    <CardDescription className="text-sm">
                      {testimonial.location}
                    </CardDescription>
                    <div className="flex gap-1 mt-2">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star
                          key={i}
                          className="w-4 h-4 fill-yellow-400 text-yellow-400 dark:fill-yellow-500 dark:text-yellow-500"
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">{testimonial.text}</p>
                <Badge variant="secondary" className="text-xs">
                  <Plane className="w-3 h-3 mr-1" />
                  {testimonial.trip}
                </Badge>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
