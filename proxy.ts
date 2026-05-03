import { createServerClient } from "@supabase/ssr";
import { type NextRequest,NextResponse } from "next/server";
import createMiddleware from "next-intl/middleware";

import { routing } from "./i18n/routing";

const intlMiddleware = createMiddleware(routing);

const AUTH_PATHS = [
  "/login",
  "/register",
  "/verify-email",
  "/forgot-password",
  "/reset-password",
] as const;

const PROTECTED_PATHS = ["/dashboard"] as const;

const LOCALE_RE = /^\/(tr|en)(?=\/|$)/;

function matchesAny(path: string, list: readonly string[]) {
  return list.some((p) => path === p || path.startsWith(`${p}/`));
}

export default async function proxy(request: NextRequest) {
  let supabaseResponse = NextResponse.next({ request });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value)
          );
          supabaseResponse = NextResponse.next({ request });
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          );
        },
      },
    }
  );

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const pathname = request.nextUrl.pathname;
  const localeMatch = pathname.match(LOCALE_RE);
  const locale = localeMatch?.[1] ?? routing.defaultLocale;
  const stripped = pathname.replace(LOCALE_RE, "") || "/";

  if (user && matchesAny(stripped, AUTH_PATHS)) {
    const redirect = NextResponse.redirect(
      new URL(`/${locale}/dashboard`, request.url)
    );
    supabaseResponse.cookies
      .getAll()
      .forEach((c) => redirect.cookies.set(c.name, c.value, c));
    return redirect;
  }

  if (!user && matchesAny(stripped, PROTECTED_PATHS)) {
    const redirect = NextResponse.redirect(
      new URL(`/${locale}/login`, request.url)
    );
    supabaseResponse.cookies
      .getAll()
      .forEach((c) => redirect.cookies.set(c.name, c.value, c));
    return redirect;
  }

  const intlResponse = intlMiddleware(request);
  supabaseResponse.cookies
    .getAll()
    .forEach((c) => intlResponse.cookies.set(c.name, c.value, c));
  return intlResponse;
}

export const config = {
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
};
