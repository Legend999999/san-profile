import { NextRequest, NextResponse } from "next/server";

export function proxy(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  const protectedAdmin =
    pathname === "/admin" ||
    pathname.startsWith("/admin/projects") ||
    pathname.startsWith("/admin/settings");

  if (protectedAdmin && !request.cookies.get("sam-admin-access-token")) {
    const login = new URL("/admin/login", request.url);
    login.searchParams.set("next", pathname);
    return NextResponse.redirect(login);
  }

  if (pathname === "/admin/login" && request.cookies.get("sam-admin-access-token")) {
    return NextResponse.redirect(new URL("/admin", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
