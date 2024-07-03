"use client";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import UIButton from "@/ui/button";
import {
  ChevronLeft,
  ChevronRight,
  Eye,
  Pencil,
  UserRound,
  Wallet,
} from "lucide-react";

export default function PreferencesPage() {
  const router = useRouter();
  const tPreferences = useTranslations("Preferences");

  const renderMenuItem = (
    iconLeft: React.ReactElement,
    iconRight: React.ReactElement,
    text: string,
    description: string
  ) => {
    return (
      <div className="flex flex-row items-center justify-between w-full gap-4 cursor-pointer active:scale-95 duration-150">
        <div className="flex flex-row items-center gap-4">
          {iconLeft && iconLeft}
          <div className="flex flex-col">
            <span className="text-secondary-900 dark:text-secondary-50 text-left text-md font-semibold line-clamp-1">
              {text}
            </span>
            <span className="text-secondary-500 text-left text-sm line-clamp-1">
              {description}
            </span>
          </div>
        </div>
        {iconRight && iconRight}
      </div>
    );
  };

  return (
    <div className="p-8 flex flex-col items-center justify-between h-full gap-4">
      <div className="flex-none flex items-center justify-between w-full gap-2">
        <div className="w-12 min-w-12 h-12 min-h-12">
          <UIButton
            variant="flat"
            sizeType="icon"
            onPress={() => {
              router.push("/profile");
            }}>
            <ChevronLeft />
          </UIButton>
        </div>
        <div className="w-full flex items-center justify-center">
          <h1 className="text-xl font-semibold text-secondary-900 dark:text-secondary-50">
            {tPreferences("Title")}
          </h1>
        </div>
        <div className="w-12 min-w-12 h-12 min-h-12"></div>
      </div>
      <div className="flex-1 flex flex-col items-center justify-start w-full overflow-y-auto">
        <div className="flex-none flex flex-col items-center justify-between h-12 w-full gap-6 mt-8">
          {renderMenuItem(
            <UserRound className="w-8 h-8" />,
            <ChevronRight className="opacity-50" />,
            tPreferences("Menu.AccountInformation.Title"),
            tPreferences("Menu.AccountInformation.Description")
          )}
          {renderMenuItem(
            <Eye className="w-8 h-8" />,
            <ChevronRight className="opacity-50" />,
            tPreferences("Menu.Password.Title"),
            tPreferences("Menu.Password.Description")
          )}
          {renderMenuItem(
            <Wallet className="w-8 h-8" />,
            <ChevronRight className="opacity-50" />,
            tPreferences("Menu.PaymentMethods.Title"),
            tPreferences("Menu.PaymentMethods.Description")
          )}
          {renderMenuItem(
            <Pencil className="w-8 h-8" />,
            <ChevronRight className="opacity-50" />,
            tPreferences("Menu.InviteYourFriends.Title"),
            tPreferences("Menu.InviteYourFriends.Description")
          )}
        </div>
      </div>
    </div>
  );
}
