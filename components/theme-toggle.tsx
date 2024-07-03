"use client";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useTranslations } from "next-intl";
import UIMenu from "@/ui/menu";
import UIMenuItem from "@/ui/menuItem";
import UIButton from "@/ui/button";

export function UiThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const tTheme = useTranslations("Theme");

  return (
    <UIMenu
      trigger={
        <UIButton variant="link" sizeType="icon">
          {resolvedTheme === "dark" ? <Sun /> : <Moon />}
        </UIButton>
      }>
      <UIMenuItem onAction={() => setTheme("light")}>
        {tTheme("Light")}
      </UIMenuItem>
      <UIMenuItem onAction={() => setTheme("dark")}>
        {tTheme("Dark")}
      </UIMenuItem>
      <UIMenuItem onAction={() => setTheme("system")}>
        {tTheme("System")}
      </UIMenuItem>
    </UIMenu>
  );
}
