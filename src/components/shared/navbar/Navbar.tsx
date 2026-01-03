import Link from "next/link";
import NavbarAuth from "./NavbarAuth";
import { Logo } from "./logo";
import { ModeToggle } from "./mode-toggle";
import { NavMenu } from "./nav-menu";
import { NavigationSheet } from "./navigation-sheet";

const Navbar = () => {
  return (
    <nav className="fixed h-14 w-full bg-background border dark:border-slate-700/70 z-50">
      <div className="container mx-auto flex h-full items-center justify-between px-6">
        <div className="flex items-center gap-4">
          <div className="md:hidden">
            <NavigationSheet userInfo={null} />
          </div>
          <Link href="/" className="shrink-0">
            <Logo />
          </Link>
        </div>

        {/* Desktop Navigation */}
        <div>
          <NavMenu className="hidden md:block" />
        </div>

        {/* Mobile Navigation */}
        <div className="md:hidden flex items-center gap-3 text-sm font-medium overflow-x-auto">
          <Link
            href="/"
            className="hover:text-foreground/80 transition-colors whitespace-nowrap"
          >
            Home
          </Link>
          <Link
            href="/about"
            className="hover:text-foreground/80 transition-colors whitespace-nowrap"
          >
            About
          </Link>
          <Link
            href="/match-travelers"
            className="hover:text-foreground/80 transition-colors whitespace-nowrap"
          >
            Match
          </Link>
          <Link
            href="/travel-plan"
            className="hover:text-foreground/80 transition-colors whitespace-nowrap"
          >
            Plans
          </Link>
          <Link
            href="/travelers"
            className="hover:text-foreground/80 transition-colors whitespace-nowrap"
          >
            Travelers
          </Link>
        </div>

        {/* Actions and Mobile Menu */}
        <div className="flex items-center gap-4">
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
