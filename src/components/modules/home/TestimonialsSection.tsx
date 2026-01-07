import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { Star, ThumbsUp } from "lucide-react";

const testimonials = [
  {
    id: 1,
    name: "Maria Rodriguez",
    location: "Madrid, Spain",
    content:
      "Found the perfect travel buddy for my Bali trip! We're still friends and planning our next adventure together.",
    rating: 5,
    avatar: "https://picsum.photos/seed/travel-destination/400/300",
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
    avatar: "https://picsum.photos/seed/travel-destination/400/300",
    date: "2 weeks ago",
  },
];

export default function TestimonialsSection() {
  return (
    <section className="pb-16 mt-24">
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
                    <span className="font-semibold">{testimonial.rating}</span>
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
  );
}
