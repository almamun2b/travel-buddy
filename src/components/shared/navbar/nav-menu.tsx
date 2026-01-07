"use client";

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";
import type { NavigationMenuProps } from "@radix-ui/react-navigation-menu";
import Link from "next/link";
import { usePathname } from "next/navigation";

type NavMenuProps = NavigationMenuProps & {
  onClickMenu?: () => void;
};

export const NavMenu = ({ onClickMenu, ...props }: NavMenuProps) => {
  const pathname = usePathname();

  const navMenus = [
    { label: "Home", href: "/" },
    { label: "About", href: "/about" },
    { label: "Matching Plan", href: "/matching-plan" },
    { label: "Pricing", href: "/pricing" },
    { label: "Travel Plans", href: "/travel-plan" },
    { label: "Travelers", href: "/travelers" },
  ];

  const isActiveRoute = (href: string): boolean => {
    if (href === "/") {
      return pathname === "/";
    }
    return pathname.startsWith(href);
  };

  return (
    <NavigationMenu {...props}>
      <NavigationMenuList className="gap-6 space-x-0 gap-y-2 data-[orientation=vertical]:flex-col data-[orientation=vertical]:items-start text-base font-medium">
        {navMenus.map((menu) => {
          const isActive = isActiveRoute(menu.href);
          return (
            <NavigationMenuItem key={menu.label}>
              <NavigationMenuLink
                asChild
                className={cn(
                  "transition-all duration-200 relative",
                  isActive && "text-foreground font-semibold"
                )}
                data-active={isActive}
              >
                <Link href={menu.href} onClick={onClickMenu}>
                  {menu.label}
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
          );
        })}
      </NavigationMenuList>
    </NavigationMenu>
  );
};
