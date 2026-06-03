import { NextResponse } from "next/server";

import { logger } from "@/lib/logger";
import { createClient } from "@/lib/supabase/server";

type CallbackContext = {
  params: Promise<{ locale: string }>;
};

export async function GET(request: Request, { params }: CallbackContext) {
  const { locale } = await params;
  const url = new URL(request.url);
  const code = url.searchParams.get("code");
  const next = url.searchParams.get("next");
  const safeNext = next && next.startsWith("/") && !next.startsWith("//") ? next : "/dashboard";

  if (!code) {
    logger.warn({ url: request.url }, "auth.callback.missing_code");
    return NextResponse.redirect(new URL(`/${locale}/login?error=missing_code`, url.origin));
  }

  const supabase = await createClient();
  const { error } = await supabase.auth.exchangeCodeForSession(code);

  if (error) {
    logger.error({ err: error.message, status: error.status }, "auth.callback.exchange_failed");
    return NextResponse.redirect(new URL(`/${locale}/login?error=verification_failed`, url.origin));
  }

  const redirectPath = safeNext === "/" ? `/${locale}` : `/${locale}${safeNext}`;
  return NextResponse.redirect(new URL(redirectPath, url.origin));
}
