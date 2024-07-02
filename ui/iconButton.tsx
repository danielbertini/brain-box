"use client";

import { cn } from "@/lib/utils";
import { Button, ButtonProps } from "react-aria-components";
import UISpinner from "./spinner";

interface UIIconButtonProps extends ButtonProps {
  variant?: "solid" | "outline" | "flat";
  size?: "sm" | "md" | "lg";
  color?: "primary" | "secondary" | "danger" | "warning" | "success";
  isLoading?: boolean;
  className?: string;
  children?: React.ReactNode;
}

export default function UIIconButton({
  variant = "solid",
  size = "md",
  color = "secondary",
  isLoading = false,
  className,
  children,
  ...props
}: UIIconButtonProps) {
  return (
    <Button
      {...props}
      className={cn(
        `
        inline-flex
        items-center
        justify-center
        rounded-lg
        border-2
        font-bold
        transition-all
        outline-none
        focus-visible:ring-0
        hover:bg-opacity-40
        pressed:bg-opacity-20
        pressed:scale-95
        duration-150
        gap-2
      `,
        color === "primary" &&
          "bg-primary-500 border-primary-500 text-primary-500",
        color === "secondary" &&
          "bg-secondary-500 border-secondary-500 text-secondary-900 dark:text-secondary-100",
        color === "danger" && "bg-rose-500 border-rose-500 text-rose-500",
        color === "warning" &&
          "bg-orange-500 border-orange-500 text-orange-500",
        color === "success" && "bg-green-500 border-green-500 text-green-500",
        variant === "solid" &&
          "bg-opacity-100 border-transparent text-white hover:bg-opacity-80 pressed:bg-opacity-60",
        variant === "outline" && "bg-opacity-0",
        variant === "flat" && "bg-opacity-20 border-transparent ",
        size === "sm" && "text-sm w-10 min-w-10 h-10 min-h-10",
        size === "md" && "text-base w-12 min-w-12 h-12 min-h-12",
        size === "lg" && "text-lg w-14 min-w-14 h-14 min-h-14",
        props.isDisabled && "opacity-60 cursor-not-allowed",
        className
      )}>
      {isLoading ? (
        <UISpinner size={size} color={variant === "solid" ? "auto" : color} />
      ) : (
        children
      )}
    </Button>
  );
}
