"use client";
import { useLocale, useTranslations } from "next-intl";
import { UiLanguageToggle } from "./language-toggle";
import { UiThemeToggle } from "./theme-toggle";
import { Menu } from "lucide-react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import createSupabaseClient from "@/lib/supabase-client";
import { toast } from "sonner";
import UIButton from "@/ui/button";
import UIDrawer from "@/ui/drawer";
import UIIconButton from "@/ui/iconButton";

export function HeaderUnauthenticated() {
  const route = useRouter();
  const locale = useLocale();

  const tMessage = useTranslations("Message");
  const tPageDashboard = useTranslations("Page.Dashboard");
  const tPageLogIn = useTranslations("Page.LogIn");
  const tPageSignUp = useTranslations("Page.SignUp");
  const tPagePricing = useTranslations("Page.Pricing");
  const [logged, setLogged] = useState(false);
  const [signingOut, setSigningOut] = useState(false);

  const signOut = useCallback(async () => {
    setSigningOut(true);

    const response = await fetch("/api/auth/log-out", {
      method: "POST",
      headers: { "Accept-Language": locale },
    });

    const data = await response.json();

    if (response.status === 200) {
      setLogged(false);
      route.push("/");
    } else {
      toast.error(data.message);
      setSigningOut(false);
    }
  }, [locale, route]);

  const checkSession = useCallback(async () => {
    const supabase = await createSupabaseClient();
    const { data, error } = await supabase.auth.getUser();
    if (!error || data?.user) {
      setLogged(true);
    } else {
      setLogged(false);
    }
  }, []);

  useEffect(() => {
    checkSession();
  }, [checkSession]);

  return (
    <div
      className="
        flex
        items-center
        justify-between
        px-4
        gap-2
        w-full
        fixed
        h-20
        top-0
        left-0
        bg-secondary-100/80
        dark:bg-secondary-950/80
        backdrop-blur-xl
        z-40
      ">
      <div className="container mx-auto px-0 flex justify-between items-center">
        <div className="flex gap-2 items-center justify-start">
          <Link href="/" className="flex gap-2 items-center justify-start">
            <div className="w-[40px] h-[40px] bg-neutral-950 dark:bg-neutral-50 rounded-full"></div>
          </Link>
        </div>
        <div className="flex gap-2">
          <div className="hidden sm:flex gap-2">
            <UIButton variant="link" onPress={() => route.push("/pricing")}>
              {tPagePricing("Title")}
            </UIButton>
            {logged ? (
              <>
                <UIButton
                  variant="solid"
                  color="primary"
                  onPress={() => route.push("/dashboard")}>
                  {tPageDashboard("Title")}
                </UIButton>
              </>
            ) : (
              <>
                <UIButton
                  variant="flat"
                  color="primary"
                  onPress={() => route.push("/log-in")}>
                  {tPageLogIn("Title")}
                </UIButton>
                <UIButton
                  variant="solid"
                  color="primary"
                  onPress={() => route.push("/sign-up")}>
                  {tPageSignUp("Title")}
                </UIButton>
              </>
            )}
            <UiLanguageToggle />
            <UiThemeToggle />
          </div>
          <div className="sm:hidden">
            <UIDrawer
              trigger={
                <UIIconButton variant="flat">
                  <Menu />
                </UIIconButton>
              }
            />
          </div>
        </div>
      </div>
    </div>
  );
}
