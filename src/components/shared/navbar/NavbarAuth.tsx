"use client";

import { LayoutDashboard, LogOut, User, UserCircle } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { logoutUser } from "@/services/auth/logout";
import { UserProfile } from "@/types/user";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function NavbarAuth({ user }: { user: UserProfile | null }) {
  return (
    <div className="flex items-center justify-end">
      {user?.email ? <ProfileDropdown userInfo={user} /> : <LoginButton />}
    </div>
  );
}

function ProfileDropdown({ userInfo }: { userInfo: UserProfile }) {
  const router = useRouter();
  const handleLogout = async () => {
    const res = await logoutUser();
    if (res.success) {
      toast.success(res.message);
      router.push("/");
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" className="relative h-9 w-9">
          <UserCircle className="h-8 w-8" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">
              {userInfo?.fullName || "User"}
            </p>
            <p className="text-xs leading-none text-muted-foreground">
              {userInfo?.email}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link href="/dashboard" className="flex items-center cursor-pointer">
            <LayoutDashboard className="mr-2 h-4 w-4" />
            <span>Dashboard</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href="/profile" className="flex items-center cursor-pointer">
            <User className="mr-2 h-4 w-4" />
            <span>Profile</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleLogout} className="cursor-pointer">
          <LogOut className="mr-2 h-4 w-4" />
          <span>Log out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

function LoginButton() {
  return (
    <Button asChild size="sm" className="rounded-full px-5">
      <Link href="/login">Login</Link>
    </Button>
  );
}
