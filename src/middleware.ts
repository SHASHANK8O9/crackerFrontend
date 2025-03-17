import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { verifyToken } from "./lib/jwt";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Define protected and public routes
  const protectedRoutes = ["/admin"];
  // const protectedApiRoutes = ["/"];
  const publicApiRoutes = [
    "/api/auth/login",
    "/api/auth/signup",
    "/api/auth/forgot-password",
  ];
  // Skip middleware for public API routes
  if (publicApiRoutes.some((route) => pathname.startsWith(route))) {
    return NextResponse.next();
  }

  const isProtectedRoute = protectedRoutes.some((route) =>
    pathname.startsWith(route)
  );
  // const isProtectedApiRoute = protectedApiRoutes.some((route) =>
  //   pathname.startsWith(route)
  // );

  // Get the JWT from cookies
  const token = request.cookies.get("token")?.value;
  // ✅ If user is authenticated and tries to access "/login", redirect them to "/admin"
  if (pathname === "/login" && token) {
    return NextResponse.redirect(new URL("/admin", request.url));
  }
  // Verify the token if it's a protected route
  if (isProtectedRoute
    // ||
    //  isProtectedApiRoute
  ) {
    if (!token) {
      // Redirect to login for admin routes, return JSON for API routes
      return isProtectedRoute
        ? NextResponse.redirect(new URL("/login", request.url))
        : NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    try {
      const user = await verifyToken(token);
      console.log(user, "token");

      if (!user || user.role !== "admin") {
        return isProtectedRoute
          ? NextResponse.redirect(new URL("/login", request.url))
          : NextResponse.json({ message: "Forbidden" }, { status: 403 });
      }
    } catch (error) {
      console.error("Token verification error:", error);
      return isProtectedRoute
        ? NextResponse.redirect(new URL("/login", request.url))
        : NextResponse.json({ message: "Invalid token" }, { status: 401 });
    }
  }

  return NextResponse.next();
}

// Apply middleware to all routes except for static files and public assets
export const config = {
  matcher:
    "/((?!_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)",
};
