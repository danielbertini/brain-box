"use client";
import {
  Dialog,
  DialogTrigger,
  Modal,
  ModalOverlay,
} from "react-aria-components";
import UICard from "./card";
import { LucideLogOut, X } from "lucide-react";
import UIDrawerItem from "./drawerItem";
import { UiLanguageToggle } from "@/components/language-toggle";
import { UiThemeToggle } from "@/components/theme-toggle";
import UIAlertDialog from "./alertDialog";
import UISpinner from "./spinner";
import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";
import { toast } from "sonner";
import createSupabaseClient from "@/lib/supabase-client";
import UIButton from "./button";

interface UIDrawerProps {
  trigger: React.ReactNode;
}

export default function UIDrawer({ trigger }: UIDrawerProps) {
  const router = useRouter();
  const locale = useLocale();
  const tCommon = useTranslations("Common");
  const tMessage = useTranslations("Message");
  const tPageLogIn = useTranslations("Page.LogIn");
  const tPageSignUp = useTranslations("Page.SignUp");
  const tPagePricing = useTranslations("Page.Pricing");
  const tPageFeatures = useTranslations("Page.Features");
  const tPageTermsOfUse = useTranslations("Page.TermsOfUse");
  const tPagePrivacyPolice = useTranslations("Page.PrivacyPolice");

  const [isLogged, setIsLogged] = useState(false);
  const [signingOut, setSigningOut] = useState(false);

  const checkSession = useCallback(async () => {
    const supabase = await createSupabaseClient();
    const { data: dataSession, error: errorSession } =
      await supabase.auth.getUser();

    if (!errorSession || dataSession?.user) {
      setIsLogged(true);
    }
  }, []);

  useEffect(() => {
    checkSession();
  }, [checkSession]);

  const signOut = useCallback(async () => {
    setSigningOut(true);

    const response = await fetch("/api/auth/log-out", {
      method: "POST",
      headers: { "Accept-Language": locale },
    });

    const data = await response.json();

    if (response.status === 200) {
      router.push("/");
    } else {
      toast.error(data.message);
      setSigningOut(false);
    }
  }, [locale, router]);

  return (
    <DialogTrigger>
      {trigger}
      <ModalOverlay
        isDismissable
        className={({ isEntering, isExiting }) => `
          fixed inset-0 z-40 overflow-hidden bg-secondary-100/60 dark:bg-secondary-950/80 flex min-h-full
          ${isEntering ? "animate-in fade-in duration-200 ease-out" : ""}
          ${isExiting ? "animate-out fade-out duration-200 ease-in" : ""}
        `}>
        <Modal
          isDismissable
          className={({ isEntering, isExiting }) => `
            fixed w-80 h-full top-0 right-0 overflow-hidden rounded-xl rounded-r-none shadow-2xl
            ${
              isEntering
                ? "animate-in slide-in-from-right ease-out duration-300"
                : ""
            }
            ${
              isExiting
                ? "animate-out slide-out-to-right ease-out duration-200"
                : ""
            }
          `}>
          <Dialog className="h-full outline-none ring-none border-none">
            {({ close }) => (
              <>
                <UICard
                  className="
                    bg-secondary-100/80
                    dark:bg-secondary-900/80
                    h-full
                    rounded-r-none
                    p-4
                    flex
                    flex-col
                    gap-4
                    ">
                  <div className="flex items-center justify-end">
                    <UIButton variant="flat" onPress={close} sizeType="icon">
                      <X />
                    </UIButton>
                  </div>
                  <div className="flex-1 overflow-x-hidden overflow-y-auto flex flex-col gap-2">
                    {isLogged ? (
                      <></>
                    ) : (
                      <>
                        <UIDrawerItem href="/log-in" onClick={close}>
                          {tPageLogIn("Title")}
                        </UIDrawerItem>
                        <UIDrawerItem href="/sign-up" onClick={close}>
                          {tPageSignUp("Title")}
                        </UIDrawerItem>
                      </>
                    )}
                    <p className="text-neutral-500 font-bold">
                      {tCommon("Product")}
                    </p>
                    <UIDrawerItem href="/dashboard" onClick={close}>
                      {tPagePricing("Title")}
                    </UIDrawerItem>
                    <UIDrawerItem href="/dashboard" onClick={close}>
                      {tPageFeatures("Title")}
                    </UIDrawerItem>
                    <p className="text-neutral-500 font-bold">
                      {tCommon("About")}
                    </p>
                    <UIDrawerItem href="/dashboard" onClick={close}>
                      {tPageTermsOfUse("Title")}
                    </UIDrawerItem>
                    <UIDrawerItem href="/dashboard" onClick={close}>
                      {tPagePrivacyPolice("Title")}
                    </UIDrawerItem>
                  </div>
                  <div className="flex items-center justify-end gap-2">
                    <UiLanguageToggle />
                    <UiThemeToggle />
                    {isLogged && (
                      <UIAlertDialog
                        trigger={
                          <UIButton variant="flat" sizeType="icon">
                            {signingOut ? (
                              <UISpinner color="auto" />
                            ) : (
                              <LucideLogOut />
                            )}
                          </UIButton>
                        }
                        title={tMessage("Info.AreYouSure")}
                        description={tMessage("Info.YouWantToLogOut")}
                        response={(value: boolean) => {
                          if (value) {
                            signOut();
                          }
                        }}
                      />
                    )}
                  </div>
                </UICard>
              </>
            )}
          </Dialog>
        </Modal>
      </ModalOverlay>
    </DialogTrigger>
  );
}
