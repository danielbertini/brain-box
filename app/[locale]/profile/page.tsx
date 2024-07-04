"use client";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import UIButton from "@/ui/button";
import {
  ChevronLeft,
  ChevronRight,
  CircleHelp,
  Clock,
  Home,
  LayoutDashboard,
  LockKeyholeOpen,
  LogOut,
  Settings,
  UserRound,
} from "lucide-react";
import Image from "next/image";
import UIMeter from "@/ui/meter";

export default function ProfilePage() {
  const router = useRouter();
  const tCommon = useTranslations("Common");
  const tProfile = useTranslations("Profile");

  const renderMenuItem = (
    url: string,
    iconLeft: React.ReactElement,
    iconRight: React.ReactElement,
    text: string
  ) => {
    return (
      <div
        className="flex flex-row items-center justify-between w-full gap-4 cursor-pointer active:scale-95 duration-150"
        onClick={() => router.push(url)}>
        <div className="flex flex-row items-center gap-4">
          {iconLeft && iconLeft}
          <span className="text-secondary-900 dark:text-secondary-50 text-left text-md font-semibold line-clamp-1">
            {text}
          </span>
        </div>
        {iconRight && iconRight}
      </div>
    );
  };

  const renderProfileInfo = () => {
    return (
      <>
        <div className="mt-4 mb-4">
          <div className="relative">
            <div className="relative w-28 h-28 rounded-full overflow-hidden shadow-2xl">
              <Image
                alt="Astronaut"
                src="/images/astronaut.png"
                priority
                fill
                style={{
                  objectFit: "cover",
                }}
              />
            </div>
            <div className="absolute w-6 h-6 bg-green-500 rounded-full bottom-2 right-2 border-4 border-secondary-50" />
          </div>
        </div>
        <div className="flex flex-col">
          <span className="text-3xl font-bold text-secondary-900 dark:text-secondary-50 w-full text-center">
            Daniel Bertini
          </span>
          <span className="text-secondary-500 text-sm w-full text-center">
            danielbertini@mail.com
          </span>
        </div>
      </>
    );
  };

  return (
    <div className="flex flex-col items-center justify-between h-full gap-4">
      <div className="flex-none flex items-center justify-between w-full gap-2">
        <div className="w-12 min-w-12 h-12 min-h-12">
          <UIButton
            variant="flat"
            sizeType="icon"
            onPress={() => {
              router.push("/chat");
            }}>
            <ChevronLeft />
          </UIButton>
        </div>
        <div className="w-full flex items-center justify-center">
          <h1 className="text-xl font-semibold text-secondary-900 dark:text-secondary-50">
            {tProfile("Title")}
          </h1>
        </div>
        <div className="w-12 min-w-12 h-12 min-h-12"></div>
      </div>
      <div className="flex-1 flex flex-col items-center justify-start w-full overflow-y-auto">
        {renderProfileInfo()}
        <div className="flex-none flex flex-col items-center justify-between h-12 w-full gap-6 mt-8">
          {renderMenuItem(
            "/preferences",
            <Settings className="w-8 h-8" />,
            <ChevronRight className="opacity-50" />,
            tProfile("Menu.Preferences")
          )}
          {renderMenuItem(
            "",
            <LockKeyholeOpen className="w-8 h-8" />,
            <ChevronRight className="opacity-50" />,
            tProfile("Menu.AccountSecurity")
          )}
          <div className="w-full px-12">
            <UIMeter label={tCommon("Excellent")} value={80} />
          </div>
          {renderMenuItem(
            "",
            <CircleHelp className="w-8 h-8" />,
            <ChevronRight className="opacity-50" />,
            tProfile("Menu.CustomerSupport")
          )}
          {renderMenuItem(
            "",
            <LogOut className="w-8 h-8" />,
            <></>,
            tProfile("Menu.Logout")
          )}
        </div>
      </div>
      <div className="flex-none flex items-center justify-between h-12 w-full gap-2">
        <UIButton sizeType="icon" variant="link" onPress={() => {}}>
          <Home className="opacity-50" />
        </UIButton>
        <UIButton sizeType="icon" variant="link" onPress={() => {}}>
          <LayoutDashboard className="opacity-50" />
        </UIButton>
        <UIButton sizeType="icon" variant="link" onPress={() => {}}>
          <Clock className="opacity-50" />
        </UIButton>
        <UIButton
          sizeType="icon"
          variant="link"
          onPress={() => {}}
          className="relative">
          <UserRound />
          <div className="w-2 h-2 bg-secondary-900 dark:bg-secondary-50 rounded-full absolute bottom-[-12px]" />
        </UIButton>
      </div>
    </div>
  );
}
