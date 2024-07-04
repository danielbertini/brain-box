"use client";
import { cn } from "@/lib/utils";
import { forwardRef } from "react";

interface UICardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "outlined" | "flat";
  children: React.ReactNode;
  className?: string;
  shadow?: "sm" | "md" | "lg" | "xl" | "2xl" | "3xl" | "none";
}

const UICard = forwardRef<HTMLDivElement, UICardProps>(
  (
    {
      variant = "default",
      children,
      shadow = "none",
      className,
      ...props
    }: UICardProps,
    ref
  ) => {
    return (
      <div
        ref={ref}
        {...props}
        className={cn(
          `
        border
        p-2
        rounded-xl
        border-secondary-500/20
        bg-secondary-50/80
        dark:bg-secondary-800/80
        backdrop-blur-2xl
        `,
          variant === "outlined" &&
            "bg-secondary-100/80 dark:bg-secondary-950/80",
          variant === "flat" && "bg-secondary-500/10 border-secondary-500/0",
          shadow && `shadow-${shadow}`,
          className
        )}>
        {children}
      </div>
    );
  }
);

UICard.displayName = "UICard";

export default UICard;
