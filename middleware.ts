import { NextResponse, type NextRequest } from "next/server";
import createIntlMiddleware from "next-intl/middleware";
import { updateSession } from "./lib/supabase-middleware";
import createSupabaseServerClient from "./lib/supabase-server";

const handleI18nRouting = createIntlMiddleware({
  locales: ["en", "pt"],
  defaultLocale: "en",
});

export async function middleware(request: NextRequest) {
  const response = handleI18nRouting(request);
  await updateSession(request);

  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase.auth.getUser();

  const protectedRoutes = ["dashboard"];
  const authRoutes = ["log-in", "sign-up", "forgot-password", "reset-password"];

  if (protectedRoutes.includes(request.nextUrl.pathname.split("/")[2])) {
    if (error || !data?.user) {
      return NextResponse.redirect(
        new URL(
          `/${request.nextUrl.pathname.split("/")[1]}`,
          request.nextUrl.origin
        )
      );
    }
  }

  if (authRoutes.includes(request.nextUrl.pathname.split("/")[2])) {
    if (data?.user) {
      return NextResponse.redirect(
        new URL(`/dashboard`, request.nextUrl.origin)
      );
    }
  }

  return response;
}

export const config = {
  matcher: ["/", "/(en|pt)/:path*", "/((?!api|_next|_vercel|.*\\..*).*)"],
};
