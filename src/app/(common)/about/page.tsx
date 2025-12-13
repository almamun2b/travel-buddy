import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  ArrowRight,
  Globe,
  Heart,
  MapPin,
  Shield,
  Sparkles,
  Star,
  Target,
  Users,
} from "lucide-react";
import Link from "next/link";

const teamMembers = [
  {
    name: "Alex Chen",
    role: "Founder & CEO",
    bio: "Former travel blogger with 10+ years of exploring 50+ countries",
    avatar: "/avatars/alex.jpg",
    initials: "AC",
    expertise: ["Asia", "Adventure Travel"],
  },
  {
    name: "Maria Rodriguez",
    role: "Head of Community",
    bio: "Expert in building travel communities and sustainable tourism",
    avatar: "/avatars/maria.jpg",
    initials: "MR",
    expertise: ["Community", "Eco-Tourism"],
  },
  {
    name: "David Kim",
    role: "Lead Developer",
    bio: "Tech enthusiast who believes in connecting people through code",
    avatar: "/avatars/david.jpg",
    initials: "DK",
    expertise: ["Technology", "UX Design"],
  },
  {
    name: "Sarah Johnson",
    role: "Travel Expert",
    bio: "Certified travel planner with focus on unique cultural experiences",
    avatar: "/avatars/sarah.jpg",
    initials: "SJ",
    expertise: ["Cultural", "Luxury Travel"],
  },
];

const values = [
  {
    icon: <Heart className="h-8 w-8" />,
    title: "Authentic Connections",
    description:
      "We believe the best travel experiences come from genuine human connections, not just tourist spots.",
  },
  {
    icon: <Shield className="h-8 w-8" />,
    title: "Safety First",
    description:
      "Verified profiles, secure payments, and 24/7 support to ensure your peace of mind.",
  },
  {
    icon: <Globe className="h-8 w-8" />,
    title: "Sustainable Travel",
    description:
      "Promoting responsible tourism that benefits local communities and preserves nature.",
  },
  {
    icon: <Sparkles className="h-8 w-8" />,
    title: "Unique Experiences",
    description:
      "Curated adventures that go beyond the typical tourist itinerary.",
  },
];

const stats = [
  { label: "Countries Covered", value: "85+", icon: <MapPin /> },
  { label: "Happy Travelers", value: "50K+", icon: <Users /> },
  { label: "Successful Matches", value: "120K+", icon: <Target /> },
  { label: "Average Rating", value: "4.8", icon: <Star /> },
];

export default function AboutPageContent() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 lg:py-32">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-secondary/5" />
        <div className="container relative z-10 px-4 md:px-6">
          <div className="mx-auto max-w-3xl text-center">
            <Badge variant="outline" className="mb-6">
              <Sparkles className="mr-2 h-3 w-3" />
              Since 2020
            </Badge>
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
              Bringing{" "}
              <span className="bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                Travelers Together
              </span>
            </h1>
            <p className="mt-6 text-xl text-muted-foreground">
              Travel Buddy connects like-minded adventurers worldwide, turning
              solo trips into shared memories and strangers into lifelong
              friends.
            </p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12">
        <div className="container px-4 md:px-6">
          <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
            {stats.map((stat, index) => (
              <div key={stat.label}>
                <Card className="border-0 bg-gradient-to-br from-card to-card/50 shadow-lg">
                  <CardContent className="flex flex-col items-center justify-center p-6 text-center">
                    <div className="mb-4 rounded-full bg-primary/10 p-3">
                      <div className="text-primary">{stat.icon}</div>
                    </div>
                    <div className="text-3xl font-bold">{stat.value}</div>
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

      {/* Story Section */}
      <section className="py-20">
        <div className="container px-4 md:px-6">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
            <div>
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="text-3xl">Our Story</CardTitle>
                  <CardDescription>
                    How it all began and where we&apos;re going
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-muted-foreground">
                    Travel Buddy was born from a simple realization: some of the
                    best travel experiences happen when you share them with
                    others. Our founder, Alex, was solo traveling through Japan
                    when he met two other travelers at a local ramen shop. What
                    started as a shared meal turned into a week-long adventure
                    exploring hidden temples, local festivals, and creating
                    memories that lasted a lifetime.
                  </p>
                  <p className="text-muted-foreground">
                    Back home, Alex wondered how many others were missing out on
                    these magical connections simply because they didn&apos;t
                    know how to find travel companions. That&apos;s when Travel
                    Buddy was conceived — a platform designed to connect
                    like-minded travelers based on shared interests, travel
                    styles, and destinations.
                  </p>
                  <div className="pt-4">
                    <Button asChild>
                      <Link href="/how-it-works">
                        See How It Works
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div>
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="text-3xl">Our Mission</CardTitle>
                  <CardDescription>What drives us every day</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-muted-foreground">
                    We believe travel is better when shared. Our mission is to
                    eliminate the barriers to finding compatible travel
                    companions while ensuring safety, authenticity, and amazing
                    experiences for everyone.
                  </p>
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <div className="rounded-full bg-primary/10 p-2">
                        <Target className="h-4 w-4 text-primary" />
                      </div>
                      <div>
                        <h4 className="font-semibold">
                          Create Meaningful Connections
                        </h4>
                        <p className="text-sm text-muted-foreground">
                          Match travelers based on shared interests and travel
                          styles
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="rounded-full bg-primary/10 p-2">
                        <Shield className="h-4 w-4 text-primary" />
                      </div>
                      <div>
                        <h4 className="font-semibold">Ensure Safety & Trust</h4>
                        <p className="text-sm text-muted-foreground">
                          Robust verification and safety features for peace of
                          mind
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="rounded-full bg-primary/10 p-2">
                        <Globe className="h-4 w-4 text-primary" />
                      </div>
                      <div>
                        <h4 className="font-semibold">
                          Promote Sustainable Tourism
                        </h4>
                        <p className="text-sm text-muted-foreground">
                          Encourage responsible travel that benefits local
                          communities
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20">
        <div className="container px-4 md:px-6">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Our Values
            </h2>
            <p className="mt-4 text-xl text-muted-foreground">
              The principles that guide everything we do
            </p>
          </div>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((value, index) => (
              <div key={value.title}>
                <Card className="h-full border-0 shadow-lg transition-all hover:shadow-xl">
                  <CardContent className="p-6 text-center">
                    <div className="mb-4 inline-flex rounded-full bg-primary/10 p-3">
                      <div className="text-primary">{value.icon}</div>
                    </div>
                    <h3 className="mb-2 text-lg font-semibold">
                      {value.title}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {value.description}
                    </p>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20">
        <div className="container px-4 md:px-6">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Meet Our Team
            </h2>
            <p className="mt-4 text-xl text-muted-foreground">
              Passionate travelers and experts dedicated to your journey
            </p>
          </div>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {teamMembers.map((member, index) => (
              <div key={member.name}>
                <Card className="h-full border-0 shadow-lg transition-all hover:shadow-xl">
                  <CardContent className="p-6 text-center">
                    <Avatar className="mx-auto mb-4 h-24 w-24">
                      <AvatarImage src={member.avatar} alt={member.name} />
                      <AvatarFallback>{member.initials}</AvatarFallback>
                    </Avatar>
                    <h3 className="mb-1 text-lg font-semibold">
                      {member.name}
                    </h3>
                    <p className="mb-3 text-sm text-primary">{member.role}</p>
                    <p className="mb-4 text-sm text-muted-foreground">
                      {member.bio}
                    </p>
                    <div className="flex flex-wrap justify-center gap-2">
                      {member.expertise.map((exp) => (
                        <Badge
                          key={exp}
                          variant="secondary"
                          className="text-xs"
                        >
                          {exp}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container px-4 md:px-6">
          <div className="mx-auto max-w-4xl">
            <Card className="border-0 bg-gradient-to-br from-primary/5 via-card to-primary/5 shadow-2xl">
              <CardContent className="p-8 text-center md:p-12">
                <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                  Ready for Your Next Adventure?
                </h2>
                <p className="mt-4 text-xl text-muted-foreground">
                  Join thousands of travelers creating unforgettable memories
                  together
                </p>
                <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:justify-center">
                  <Button size="lg" asChild className="gap-2">
                    <Link href="/signup">
                      Start Your Journey
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </Button>
                  <Button size="lg" variant="outline" asChild>
                    <Link href="/explore">Browse Travel Plans</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <Separator className="my-8" />

      {/* Footer Note */}
      <div className="container px-4 pb-8 text-center md:px-6">
        <p className="text-sm text-muted-foreground">
          Travel Buddy is more than an app — it&apos;s a community of
          adventurers, explorers, and friends waiting to meet. Start your
          journey today.
        </p>
      </div>
    </div>
  );
}
