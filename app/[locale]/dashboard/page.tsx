import { unstable_setRequestLocale } from "next-intl/server";

type Props = {
  params: { locale: string };
};

export default function DashboardPage({ params: { locale } }: Props) {
  unstable_setRequestLocale(locale);
  return <></>;
}
