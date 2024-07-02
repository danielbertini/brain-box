import { HeaderUnauthenticated } from "@/components/header-unauthenticated";
import { useTranslations } from "next-intl";
import { unstable_setRequestLocale } from "next-intl/server";

type Props = {
  params: { locale: string };
};

export default function PricingPage({ params: { locale } }: Props) {
  unstable_setRequestLocale(locale);
  const t = useTranslations("Page.Pricing");

  return <HeaderUnauthenticated />;
}
