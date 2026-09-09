import { NextRequest, NextResponse } from "next/server";
import { getSessionCookie } from "better-auth/cookies";

// Visitor-facing forms: POST is how the public submits them, so it must stay
// open. GET lists the submitted data (names, emails, messages) and must not.
const PUBLIC_FORM_PATHS = ["/api/contact-submissions", "/api/newsletter-subscribers"];

function isPublicApiRequest(pathname: string, method: string): boolean {
  if (pathname.startsWith("/api/auth")) return true;
  const isFormPath = PUBLIC_FORM_PATHS.some((p) => pathname === p || pathname.startsWith(`${p}/`));
  if (isFormPath) return method === "POST";
  // Every other /api route: GET reads mirror what's already public on the
  // site, so only non-GET (create/update/delete/upload) needs a session.
  return method === "GET";
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname.startsWith("/admin/login")) return NextResponse.next();

  const session = getSessionCookie(request);

  if (pathname.startsWith("/api/")) {
    if (isPublicApiRequest(pathname, request.method)) return NextResponse.next();
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    return NextResponse.next();
  }

  if (!session) {
    const loginUrl = new URL("/admin/login", request.url);
    loginUrl.searchParams.set("callbackUrl", pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/admin", "/api/:path*"],
};
