"use client";
import { cn } from "@/lib/utils";
import { ListBoxItem, ListBoxItemProps } from "react-aria-components";

interface UIListBoxItemProps extends ListBoxItemProps {
  children: React.ReactNode;
}

export default function UIListBoxItem({
  children,
  ...props
}: UIListBoxItemProps) {
  return (
    <ListBoxItem
      {...props}
      className={cn(`
        border-none
        ring-none
        outline-none
        rounded-lg
        text-secondary-900
        dark:text-secondary-100
        hover:bg-secondary-500/20
        dark:hover:bg-secondary-500/20
        pressed:bg-secondary-500/20
        dark:pressed:bg-secondary-500/20
        cursor-pointer
        pressed:scale-95
        duration-150
        px-3 py-2
      `)}>
      {children}
    </ListBoxItem>
  );
}
