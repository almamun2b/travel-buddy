import { NextRequest, NextResponse } from "next/server";

const PROTECTED_PATHS = ["/reviews", "/users", "/travel-plans"];

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  const isProtected = PROTECTED_PATHS.some((path) => pathname.startsWith(path));

  if (!isProtected) return NextResponse.next();

  const accessToken = req.cookies.get("accessToken")?.value;

  if (!accessToken) {
    const loginUrl = new URL("/login", req.url);
    loginUrl.searchParams.set("redirect", pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/reviews/:path*", "/users/:path*", "/travel-plans/:path*"],
};
