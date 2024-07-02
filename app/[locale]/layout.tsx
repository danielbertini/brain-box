import "./globals.css";

import { ThemeProvider } from "@/components/theme-provider";
import {
  getMessages,
  getTranslations,
  unstable_setRequestLocale,
} from "next-intl/server";
import { NextIntlClientProvider } from "next-intl";
import { ReactNode, Suspense } from "react";
import { locales } from "@/i18n-config";
import { Toaster } from "sonner";
import { Viewport } from "next";
import { AppProvider } from "../providers/app-context";
import { Poppins } from "next/font/google";
import UIPageLoading from "@/ui/pageLoading";

const font = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  fallback: ["system-ui"],
  variable: "--font-inter",
  display: "swap",
});

type Props = {
  children: ReactNode;
  params: { locale: string };
};

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params: { locale },
}: Omit<Props, "children">) {
  const t = await getTranslations({ locale, namespace: "App" });

  return {
    title: t("Name"),
    description: t("Description"),
  };
}

export const viewport: Viewport = {
  initialScale: 1,
  width: "device-width",
  maximumScale: 1,
  viewportFit: "cover",
};

export default async function RootLayout({
  children,
  params: { locale },
}: any) {
  unstable_setRequestLocale(locale);
  const messages = await getMessages();

  return (
    <html lang={locale} suppressHydrationWarning>
      <body
        className={`${font.variable} bg-secondary-50 dark:bg-secondary-900 font-sans overflow-x-hidden h-svh`}>
        <NextIntlClientProvider messages={messages}>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange>
            <Suspense fallback={<UIPageLoading />}>
              <AppProvider>{children}</AppProvider>
            </Suspense>
            <Toaster theme="system" />
          </ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
