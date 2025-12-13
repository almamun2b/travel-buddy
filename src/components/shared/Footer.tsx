// components/layout/footer.tsx
import { Separator } from "@/components/ui/separator";
import {
  Facebook,
  Globe,
  Heart,
  Instagram,
  Linkedin,
  Mail,
  Phone,
  Twitter,
} from "lucide-react";
import Link from "next/link";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerSections = [
    {
      title: "Travel Buddy",
      links: [
        { name: "About Us", href: "/about" },
        { name: "How It Works", href: "/how-it-works" },
        { name: "Success Stories", href: "/stories" },
        { name: "Careers", href: "/careers" },
        { name: "Press", href: "/press" },
      ],
    },
    {
      title: "Explore",
      links: [
        { name: "Find Travel Buddies", href: "/explore" },
        { name: "Browse Travel Plans", href: "/travel-plans" },
        { name: "Popular Destinations", href: "/destinations" },
        { name: "Travel Groups", href: "/groups" },
        { name: "Events", href: "/events" },
      ],
    },
    {
      title: "Resources",
      links: [
        { name: "Travel Blog", href: "/blog" },
        { name: "Safety Tips", href: "/safety" },
        { name: "FAQ", href: "/faq" },
        { name: "Support Center", href: "/support" },
        { name: "Community Guidelines", href: "/guidelines" },
      ],
    },
    {
      title: "Legal",
      links: [
        { name: "Privacy Policy", href: "/privacy" },
        { name: "Terms of Service", href: "/terms" },
        { name: "Cookie Policy", href: "/cookies" },
        { name: "Accessibility", href: "/accessibility" },
        { name: "Contact Us", href: "/contact" },
      ],
    },
  ];

  const socialLinks = [
    { icon: <Facebook className="h-5 w-5" />, href: "#", label: "Facebook" },
    { icon: <Twitter className="h-5 w-5" />, href: "#", label: "Twitter" },
    { icon: <Instagram className="h-5 w-5" />, href: "#", label: "Instagram" },
    { icon: <Linkedin className="h-5 w-5" />, href: "#", label: "LinkedIn" },
  ];

  return (
    <footer className="mt-20 border-t bg-background">
      <div className="container mx-auto px-4 py-8 md:px-6">
        {/* Top Section */}
        <div className="mb-8">
          <div className="flex flex-col items-center gap-4 text-center md:flex-row md:justify-between md:text-left">
            <div>
              <Link href="/" className="inline-flex items-center gap-2">
                <div className="rounded-lg bg-primary p-2">
                  <Globe className="h-5 w-5 text-primary-foreground" />
                </div>
                <div>
                  <h2 className="text-xl font-bold">Travel Buddy</h2>
                  <p className="text-sm text-muted-foreground">
                    Connecting travelers worldwide
                  </p>
                </div>
              </Link>
            </div>

            <div className="flex flex-col items-center gap-2 sm:flex-row sm:gap-6">
              <div className="flex items-center gap-2 text-sm">
                <Mail className="h-4 w-4 text-muted-foreground" />
                <span>hello@travelbuddy.com</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Phone className="h-4 w-4 text-muted-foreground" />
                <span>+1 (555) 123-4567</span>
              </div>
            </div>
          </div>
        </div>

        <Separator className="mb-8" />

        {/* 4-Column Links */}
        <div className="mb-8 grid grid-cols-2 gap-8 md:grid-cols-4">
          {footerSections.map((section) => (
            <div key={section.title}>
              <h3 className="mb-4 font-semibold">{section.title}</h3>
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted-foreground hover:text-primary hover:underline"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <Separator className="mb-6" />

        {/* Bottom Section */}
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          <div className="text-center text-sm text-muted-foreground md:text-left">
            <p>
              © {currentYear} Travel Buddy. All rights reserved. Made with{" "}
              <Heart className="inline h-3 w-3 text-red-500" /> for travelers.
            </p>
          </div>

          <div className="flex items-center gap-6">
            <div className="flex gap-4">
              {socialLinks.map((social) => (
                <Link
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="text-muted-foreground hover:text-primary"
                >
                  {social.icon}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
