import { cn } from "@/lib/utils";

interface UISpinnerProps {
  size?: "sm" | "md" | "lg";
  color?: "primary" | "secondary" | "danger" | "warning" | "success" | "auto";
  className?: string;
}

export default function UISpinner({
  size = "md",
  color = "secondary",
  className,
}: UISpinnerProps) {
  return (
    <div
      className={cn(
        color === "auto" && "border-secondary-800 dark:border-secondary-100",
        color === "primary" && "border-secondary-100 dark:border-secondary-100",
        color === "secondary" &&
          "border-secondary-800 dark:border-secondary-100",
        color === "danger" && "border-secondary-100 dark:border-secondary-100",
        color === "warning" && "border-secondary-100 dark:border-secondary-100",
        color === "success" && "border-secondary-100 dark:border-secondary-100",
        size === "sm" && "w-3 h-3 border-2",
        size === "md" && "w-5 h-5 border-2",
        size === "lg" && "w-7 h-7 border-4",
        `
        border-t-transparent
        dark:border-t-transparent
        border-b-transparent
        dark:border-b-transparent
        rounded-full
        animate-spin
        border-solid
        `
      )}></div>
  );
}
