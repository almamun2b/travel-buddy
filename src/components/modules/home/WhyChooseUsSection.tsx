import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, Globe, Shield, Star, TrendingUp, Users } from "lucide-react";

const WhyChooseUsSection = () => {
  const features = [
    {
      icon: Shield,
      title: "Verified Profiles",
      description: "All users are verified for your safety and peace of mind",
    },
    {
      icon: Users,
      title: "Smart Matching",
      description: "AI-powered algorithm matches you with compatible travelers",
    },
    {
      icon: Globe,
      title: "Global Community",
      description: "Connect with travelers from over 150 countries worldwide",
    },
    {
      icon: Calendar,
      title: "Flexible Planning",
      description: "Plan trips on your schedule with easy-to-use tools",
    },
    {
      icon: Star,
      title: "Trusted Reviews",
      description: "Read honest reviews from fellow travelers",
    },
    {
      icon: TrendingUp,
      title: "Growing Network",
      description: "Join thousands of successful travel connections",
    },
  ];

  return (
    <section className="py-20 px-4 bg-neutral-50 dark:bg-neutral-950">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <Badge className="mb-4">Why Us</Badge>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Why Choose Travel Buddy
          </h2>
          <p className="text-xl text-muted-foreground">
            The trusted platform for meaningful travel connections
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card
              key={index}
              className="border-2 hover:shadow-xl transition-shadow"
            >
              <CardHeader>
                <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-purple-500 dark:from-blue-600 dark:to-purple-600 rounded-full flex items-center justify-center mb-4">
                  <feature.icon className="w-7 h-7 text-white" />
                </div>
                <CardTitle className="text-xl">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUsSection;
