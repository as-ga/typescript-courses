import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const isProfilePage =
    path === "/login" || path === "/signup" || path === "/verifyemail";
  const token = request.cookies.get("token")?.value || "";

  if (isProfilePage && token) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  if (!isProfilePage && !token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }
}

export const config = {
  matcher: [
    "/",
    "/login",
    "/signup",
    "/verifyemail",
    "/profile",
    "/profile/[id]",
  ],
};
