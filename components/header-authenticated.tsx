"use client";
import { useLocale, useTranslations } from "next-intl";
import { UiLanguageToggle } from "./language-toggle";
import { UiThemeToggle } from "./theme-toggle";
import {
  Building2,
  CalendarDays,
  ListVideo,
  LucideLogOut,
  Menu,
  MonitorPlay,
  Settings,
} from "lucide-react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { toast } from "sonner";
import { useCallback, useState } from "react";
import UiComboboxWorkplaces from "./combobox-workplaces";
import UIButton from "@/ui/button";
import UISpinner from "@/ui/spinner";
import UIAlertDialog from "@/ui/alertDialog";
import UIDrawer from "@/ui/drawer";
import { usePathname } from "@/navigation";
import UIMenu from "@/ui/menu";
import UIMenuItem from "@/ui/menuItem";

export function HeaderAuthenticated() {
  const router = useRouter();
  const locale = useLocale();
  const pathname = usePathname();
  const tPageDashboard = useTranslations("Page.Dashboard");
  const tMessage = useTranslations("Message");

  const [signingOut, setSigningOut] = useState(false);

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

  const renderSettingsItems = () => {
    return (
      <>
        <UIMenuItem
          onAction={() => {
            router.push("/dashboard/settings/profile");
          }}>
          {tPageDashboard("Menu.Settings.Profile")}
        </UIMenuItem>
        <UIMenuItem
          onAction={() => {
            router.push("/dashboard/settings/company");
          }}>
          {tPageDashboard("Menu.Settings.Company")}
        </UIMenuItem>
        <UIMenuItem
          onAction={() => {
            router.push("/dashboard/settings/team");
          }}>
          {tPageDashboard("Menu.Settings.Team")}
        </UIMenuItem>
        <UIMenuItem
          onAction={() => {
            router.push("/dashboard/settings/billing");
          }}>
          {tPageDashboard("Menu.Settings.Billing")}
        </UIMenuItem>
      </>
    );
  };

  return (
    <>
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
        <div className="container mx-auto px-0 flex justify-between items-center gap-4">
          <div className="flex gap-2 items-center justify-start">
            <Link
              href="/dashboard"
              className="flex gap-2 items-center justify-start">
              <div className="w-[40px] h-[40px] bg-neutral-950 dark:bg-neutral-50 rounded-full"></div>
            </Link>
          </div>
          <div className="flex gap-2">
            <div className="hidden lg:flex flex-row gap-2 items-center justify-end">
              <UIButton
                variant="link"
                onPress={() => {
                  router.push("/dashboard/workplaces");
                }}>
                <Building2
                  className={
                    pathname.includes("/dashboard/workplaces")
                      ? "text-primary-500"
                      : "text-secondary-800 dark:text-secondary-200"
                  }
                />
                {tPageDashboard("Menu.Workplaces")}
              </UIButton>
              <UIButton
                variant="link"
                onPress={() => {
                  router.push("/dashboard/screens");
                }}>
                <MonitorPlay
                  className={
                    pathname.includes("/dashboard/screens")
                      ? "text-primary-500"
                      : "text-secondary-800 dark:text-secondary-200"
                  }
                />
                {tPageDashboard("Menu.Screens")}
              </UIButton>
              <UIButton
                variant="link"
                onPress={() => {
                  router.push("/dashboard/playlists");
                }}>
                <ListVideo
                  className={
                    pathname.includes("/dashboard/playlists")
                      ? "text-primary-500"
                      : "text-secondary-800 dark:text-secondary-200"
                  }
                />
                {tPageDashboard("Menu.Playlists")}
              </UIButton>
              <UIButton variant="link">
                <CalendarDays
                  className={
                    pathname.includes("/dashboard/schedules")
                      ? "text-primary-500"
                      : "text-secondary-800 dark:text-secondary-200"
                  }
                />
                {tPageDashboard("Menu.Schedules")}
              </UIButton>
            </div>
            <UiComboboxWorkplaces />
            <div className="hidden sm:flex gap-2">
              <div className="hidden lg:block">
                <UIMenu
                  trigger={
                    <UIButton
                      variant="flat"
                      sizeType="icon"
                      className="w-full relative">
                      <Settings
                        className={
                          pathname.includes("/dashboard/settings")
                            ? "text-primary-500"
                            : "text-secondary-900 dark:text-secondary-100"
                        }
                      />
                    </UIButton>
                  }>
                  {renderSettingsItems()}
                </UIMenu>
              </div>
              <UiLanguageToggle />
              <UiThemeToggle />
              <UIAlertDialog
                trigger={
                  <UIButton variant="flat" sizeType="icon">
                    {signingOut ? <UISpinner color="auto" /> : <LucideLogOut />}
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
            </div>
            <div className="sm:hidden">
              <UIDrawer
                trigger={
                  <UIButton variant="flat" sizeType="icon">
                    <Menu />
                  </UIButton>
                }
              />
            </div>
          </div>
        </div>
      </div>
      <div
        className="
          flex
          lg:hidden
          items-center
          justify-between
          sm:justify-center
          px-4
          gap-2
          w-full
          fixed
          h-20
          bottom-0
          left-0
          bg-secondary-50/80
          dark:bg-secondary-900/80
          backdrop-blur-xl
          z-40
        ">
        <div className="container mx-auto px-0 flex justify-between items-center gap-2">
          <UIButton
            className="w-full relative"
            variant="flat"
            onPress={() => {
              router.push("/dashboard/workplaces");
            }}>
            <Building2 />
            {pathname.includes("/dashboard/workplaces") && (
              <div className="w-6 h-1 bg-primary-500 absolute top-[52px] rounded-full animate-in fade-in ease-in-out duration-700"></div>
            )}
          </UIButton>
          <UIButton
            className="w-full relative"
            variant="flat"
            onPress={() => {
              router.push("/dashboard/screens");
            }}>
            <MonitorPlay />
            {pathname.includes("/dashboard/screens") && (
              <div className="w-6 h-1 bg-primary-500 absolute top-[52px] rounded-full animate-in fade-in ease-in-out duration-700"></div>
            )}
          </UIButton>
          <UIButton
            className="w-full relative"
            variant="flat"
            onPress={() => {
              router.push("/dashboard/playlists");
            }}>
            <ListVideo />
            {pathname.includes("/dashboard/playlists") && (
              <div className="w-6 h-1 bg-primary-500 absolute top-[52px] rounded-full animate-in fade-in ease-in-out duration-700"></div>
            )}
          </UIButton>
          <UIButton className="w-full" variant="flat" onPress={() => {}}>
            <CalendarDays />
          </UIButton>
          <UIMenu
            trigger={
              <UIButton variant="flat" className="w-full relative">
                <Settings />
                {pathname.includes("/dashboard/settings") && (
                  <div className="w-6 h-1 bg-primary-500 absolute top-[52px] rounded-full animate-in fade-in ease-in-out duration-700"></div>
                )}
              </UIButton>
            }>
            {renderSettingsItems()}
          </UIMenu>
        </div>
      </div>
    </>
  );
}
