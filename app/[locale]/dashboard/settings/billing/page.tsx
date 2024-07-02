"use client";

import { useTranslations } from "next-intl";
import { useContext } from "react";
import UiPageTitle from "@/components/page-title";
import { useMediaQuery } from "@/lib/mediaquery";
import { AppContext } from "@/app/providers/app-context";

type Props = {
  params: { locale: string };
};

export default function SettingsBillingPage({ params: { locale } }: Props) {
  const limit = 30;
  const tForm = useTranslations("Form");
  const tPageDashboard = useTranslations("Page.Dashboard");
  const isMobile = useMediaQuery("(max-width: 640px)");
  const appDetails = useContext(AppContext);

  return (
    <>
      <UiPageTitle
        title={`${tPageDashboard("Menu.Settings.Title")} / ${tPageDashboard(
          "Menu.Settings.Billing"
        )}`}
        className="mt-8 mb-2"
      />
      <div className="flex flex-row gap-2 w-full items-center justify-between mb-4">
        <div className="flex items-center justify-start flex-1">
          <div className="w-full sm:w-auto"></div>
        </div>
      </div>
    </>
  );
}
