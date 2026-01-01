"use client";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Menu, LayoutDashboard } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { Logo } from "./logo";
import { NavMenu } from "./nav-menu";

interface NavigationSheetProps {
  userInfo?: {
    success: boolean;
    data?: {
      email: string;
    };
  } | null;
}

export const NavigationSheet = ({ userInfo }: NavigationSheetProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const isLoggedIn = userInfo?.data?.email;
  
  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon" className="rounded-sm">
          <Menu />
        </Button>
      </SheetTrigger>
      <SheetTitle className="sr-only">Menu</SheetTitle>
      <SheetDescription className="sr-only">
        This is the content of the sheet.
      </SheetDescription>
      <SheetContent
        side="left"
        className="flex flex-col justify-start p-4 pt-2"
      >
        <Logo />
        <NavMenu
          orientation="vertical"
          className="flex flex-col justify-start items-start mt-6"
          onClickMenu={() => setIsOpen(false)}
        />
        
        {/* Mobile Auth Buttons */}
        <div className="flex flex-col gap-2 mt-auto pt-6 border-t">
          {isLoggedIn ? (
            <Button
              asChild
              className="w-full"
              onClick={() => setIsOpen(false)}
            >
              <Link href="/dashboard">
                <LayoutDashboard className="mr-2 h-4 w-4" />
                Dashboard
              </Link>
            </Button>
          ) : (
            <Button
              asChild
              className="w-full"
              onClick={() => setIsOpen(false)}
            >
              <Link href="/login">Login</Link>
            </Button>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
};
