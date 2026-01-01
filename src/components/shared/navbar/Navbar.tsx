'use client'

import { Button } from "@/components/ui/button";
import { LayoutDashboard } from "lucide-react";
import Link from "next/link";
import { Logo } from "./logo";
import { ModeToggle } from "./mode-toggle";
import { NavMenu } from "./nav-menu";
import { NavigationSheet } from "./navigation-sheet";
import { useEffect, useState } from "react";

interface UserInfo {
  success: boolean;
  data?: {
    email: string;
  };
}

const Navbar = () => {
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const response = await fetch('/api/v1/auth/me', {
          credentials: 'include',
          cache: 'no-store'
        });
        if (response.ok) {
          const data = await response.json();
          setUserInfo(data);
        } else {
          setUserInfo(null);
        }
      } catch (error) {
        console.error("Error fetching user info:", error);
        setUserInfo(null);
      } finally {
        setLoading(false);
      }
    };

    fetchUserInfo();
  }, []);

  if (loading) {
    return (
      <nav className="fixed h-14 w-full bg-background border dark:border-slate-700/70 z-50">
        <div className="container mx-auto flex h-full items-center justify-between px-6">
          <div className="flex items-center gap-4">
            <div className="md:hidden">
              <div className="w-8 h-8 bg-muted rounded animate-pulse" />
            </div>
            <div className="w-24 h-8 bg-muted rounded animate-pulse" />
          </div>
          <div className="hidden md:block">
            <div className="w-64 h-8 bg-muted rounded animate-pulse" />
          </div>
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-muted rounded animate-pulse" />
            <div className="w-20 h-10 bg-muted rounded animate-pulse" />
          </div>
        </div>
      </nav>
    );
  }

  return (
    <nav className="fixed h-14 w-full bg-background border dark:border-slate-700/70 z-50">
      <div className="container mx-auto flex h-full items-center justify-between px-6">
        <div className="flex items-center gap-4">
          <div className="md:hidden">
            <NavigationSheet userInfo={userInfo} />
          </div>
          <Link href="/" className="shrink-0">
            <Logo />
          </Link>
        </div>

        <NavMenu className="hidden md:block" />

        {/* Actions and Mobile Menu */}
        <div className="flex items-center gap-4">
          <ModeToggle />
          {userInfo?.data?.email ? (
            <div className="flex items-center gap-4">
              <Button
                asChild
                className="rounded-full px-4 py-2 text-sm md:text-base  hidden md:flex"
              >
                <Link href="/dashboard" className="w-full text-center">
                  Dashboard
                </Link>
              </Button>
              <Button
                asChild
                className="rounded-full px-2 py-2 text-sm md:text-base md:hidden"
              >
                <Link href="/dashboard">
                  <LayoutDashboard />
                </Link>
              </Button>
            </div>
          ) : (
            <div>
            <Button
              asChild
              className="rounded-full px-4 py-2 text-sm md:text-base"
            >
              <Link href="/login" className="block w-full text-center">
                Login
              </Link>
            </Button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
