/**
 * proxy.ts — Protects /admin/* routes by verifying the JWT cookie
 * Unauthenticated users are redirected to /admin/login
 * (Next.js 16+ uses "proxy" instead of "middleware")
 */
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";

const SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET ?? "my-super-secret-portfolio-key-2024"
);

const COOKIE_NAME = "portfolio_auth_token";

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Allow the login page through without auth check
  if (pathname === "/admin/login") {
    return NextResponse.next();
  }

  // Protect all other /admin routes
  if (pathname.startsWith("/admin")) {
    const token = request.cookies.get(COOKIE_NAME)?.value;

    if (!token) {
      return NextResponse.redirect(new URL("/admin/login", request.url));
    }

    try {
      await jwtVerify(token, SECRET);
      return NextResponse.next();
    } catch {
      // Token is invalid or expired — redirect to login
      const response = NextResponse.redirect(new URL("/admin/login", request.url));
      response.cookies.delete(COOKIE_NAME);
      return response;
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
