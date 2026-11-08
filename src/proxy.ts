import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const LOCALES = ["en", "ar"] as const;
const DEFAULT_LOCALE = "en";

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Skip Next.js internals, static assets, and SEO metadata files
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.startsWith("/images") ||
    pathname.startsWith("/icons") ||
    pathname.startsWith("/fonts") ||
    pathname === "/favicon.ico" ||
    pathname === "/icon.png" ||
    pathname === "/robots.txt" ||
    pathname === "/sitemap.xml" ||
    /\.[a-zA-Z0-9]+$/.test(pathname)
  ) {
    return NextResponse.next();
  }

  const hasLocale = LOCALES.some(
    (locale) => pathname === `/${locale}` || pathname.startsWith(`/${locale}/`)
  );

  if (hasLocale) {
    return NextResponse.next();
  }

  // Detect preferred locale from Accept-Language header if user visits root `/`
  const acceptLang = request.headers.get("accept-language") ?? "";
  const prefersArabic = /\bar\b/i.test(acceptLang.split(",")[0] ?? "");
  const chosenLocale = prefersArabic ? "ar" : DEFAULT_LOCALE;

  const targetUrl = request.nextUrl.clone();
  targetUrl.pathname =
    pathname === "/" ? `/${chosenLocale}` : `/${chosenLocale}${pathname}`;

  return NextResponse.redirect(targetUrl);
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|images|icons|fonts|favicon.ico|robots.txt|sitemap.xml).*)"],
};

