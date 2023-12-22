import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const token = await getToken({
    req,
    secret: process.env.SECRET_KEY,
  });
  
  if (!pathname.endsWith("/sign-in") && !token) {
    return NextResponse.redirect(new URL("/auth/sign-in", req.url));
  }

  if (pathname.endsWith("/sign-in") && token) {
    return NextResponse.redirect(new URL("/sales-transaction", req.url));
  }

  return NextResponse.next();
}
 
// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}