import Link from "next/link";
import NavbarAuth from "./NavbarAuth";
import { Logo } from "./logo";
import { ModeToggle } from "./mode-toggle";
import { NavMenu } from "./nav-menu";
import { NavigationSheet } from "./navigation-sheet";

const Navbar = () => {
  return (
    <nav className="fixed h-14 w-full bg-background border dark:border-slate-700/70 z-50">
      <div className="container mx-auto flex h-full items-center justify-between px-4 sm:px-6">
        <div className="flex items-center gap-4">
          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <NavigationSheet userInfo={null} />
          </div>

          {/* Logo - Always visible */}
          <Link href="/" className="shrink-0">
            <Logo />
          </Link>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:block">
          <NavMenu />
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2 sm:gap-4">
          <div>
            <ModeToggle />
          </div>
          <div>
            <NavbarAuth />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
