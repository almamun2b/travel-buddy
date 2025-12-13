import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Heart, MapPin, Users } from "lucide-react";

const HowItWorksSection = () => {
  const steps = [
    {
      icon: Users,
      title: "Sign Up",
      description:
        "Create your profile and tell us about your travel interests and preferences",
    },
    {
      icon: MapPin,
      title: "Create Travel Plan",
      description:
        "Share where you're going, when, and what kind of adventure you're looking for",
    },
    {
      icon: Heart,
      title: "Find Your Buddy",
      description:
        "Match with compatible travelers and plan your journey together",
    },
  ];

  return (
    <section className="py-20 px-4 bg-neutral-50 dark:bg-neutral-950">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <Badge className="mb-4">Simple Process</Badge>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">How It Works</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Start your journey in three simple steps
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <Card
              key={index}
              className="relative border-2 hover:shadow-xl transition-shadow"
            >
              <div className="absolute -top-4 left-8 bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-700 dark:to-purple-700 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold">
                {index + 1}
              </div>
              <CardHeader>
                <div className="w-16 h-16 bg-blue-100 dark:bg-blue-950 rounded-full flex items-center justify-center mb-4">
                  <step.icon className="w-8 h-8 text-blue-600 dark:text-blue-400" />
                </div>
                <CardTitle className="text-2xl">{step.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{step.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
