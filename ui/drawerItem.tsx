"use client";
import { cn } from "@/lib/utils";
import Link, { LinkProps } from "next/link";

interface UIDrawerItemProps extends LinkProps {
  children: React.ReactNode;
}

export default function UIDrawerItem({
  children,
  ...props
}: UIDrawerItemProps) {
  return (
    <Link
      {...props}
      className={cn(`
        border-none
        ring-none
        outline-none
        rounded-lg
        bg-secondary-500/10
        dark:bg-secondary-500/10
        text-secondary-900
        dark:text-secondary-100
        hover:bg-secondary-500/20
        dark:hover:bg-secondary-500/20
        pressed:bg-secondary-500/20
        dark:pressed:bg-secondary-500/20
        cursor-pointer
        active:scale-95
        duration-150
        px-3 py-2
        flex
        items-center
        justify-start
        gap-2
      `)}>
      {children}
    </Link>
  );
}
