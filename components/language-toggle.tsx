"use client";
import { useTheme } from "next-themes";
import { useTranslations } from "next-intl";
import { useTransition } from "react";
import { usePathname, useRouter } from "@/navigation";
import UIMenu from "@/ui/menu";
import UIMenuItem from "@/ui/menuItem";
import { Globe } from "lucide-react";
import UIButton from "@/ui/button";

export function UiLanguageToggle() {
  const { setTheme } = useTheme();
  const tLanguage = useTranslations("Language");
  const pathname = usePathname();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const handleClick = (lang: string) => {
    startTransition(() => {
      router.replace(pathname, { locale: lang });
      router.push(pathname, { locale: lang });
      router.refresh();
    });
  };

  return (
    <UIMenu
      trigger={
        <UIButton variant="flat" sizeType="icon">
          <Globe />
        </UIButton>
      }>
      <UIMenuItem onAction={() => handleClick("en")}>
        {tLanguage("English")}
      </UIMenuItem>
      <UIMenuItem onAction={() => handleClick("pt")}>
        {tLanguage("Portuguese")}
      </UIMenuItem>
    </UIMenu>
  );
}
