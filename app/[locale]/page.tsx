"use client";
import Logo from "@/components/logo";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function IndexPage() {
  const router = useRouter();
  const tApp = useTranslations("App");
  const tCommon = useTranslations("Common");

  useEffect(() => {
    setTimeout(() => {
      router.push("/on-boarding");
    }, 5000);
  }, [router]);

  return (
    <>
      <div className="w-screen h-screen flex items-center justify-center">
        <Logo />
        <div className="flex flex-col items-center absolute bottom-4">
          <span className="text-3xl font-bold text-secondary-900 dark:text-secondary-50">
            {tApp("Name")}
          </span>
          <span className="text-secondary-500">
            {tCommon("Version")} {process.env.NEXT_PUBLIC_APP_VERSION}
          </span>
        </div>
      </div>
    </>
  );
}
