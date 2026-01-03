import { LayoutDashboard } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { me } from "@/services/auth/me";

export default async function NavbarAuth() {
  const userInfo = await me();

  return (
    <div className="flex items-center justify-end w-28">
      {userInfo?.data?.email ? <DashboardButton /> : <LoginButton />}
    </div>
  );
}

function DashboardButton() {
  return (
    <>
      {/* Desktop */}
      <Button
        asChild
        size="sm"
        className="hidden rounded-full px-5 md:inline-flex"
      >
        <Link href="/dashboard">Dashboard</Link>
      </Button>

      {/* Mobile */}
      <Button asChild size="icon" className="rounded-full md:hidden">
        <Link href="/dashboard">
          <LayoutDashboard className="h-5 w-5" />
        </Link>
      </Button>
    </>
  );
}

function LoginButton() {
  return (
    <Button asChild size="sm" className="rounded-full px-5">
      <Link href="/login">Login</Link>
    </Button>
  );
}
