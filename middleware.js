
import { getSession } from "next-auth/react";
import { NextResponse } from "next/server";

export async function middleware(req) {
  const session = await getSession({ req });
  const { pathname } = req.nextUrl;

  if (session) {
    if (pathname === "/" || pathname.startsWith("/signin") || pathname.startsWith("/signup")) {
      return NextResponse.redirect(new URL("/dashboard", req.url));
    }
  } else {
    if (pathname.startsWith("/test") || pathname === "/test-start" || pathname === "/test-result") {
      return NextResponse.redirect(new URL("/signin", req.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/test", "/test-start", "/test-result", "/signin", "/signup"],
};

