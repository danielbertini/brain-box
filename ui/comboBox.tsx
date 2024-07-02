"use client";
import {
  ComboBox,
  ComboBoxProps,
  Input,
  Label,
  ListBox,
  Popover,
} from "react-aria-components";
import { ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import UICard from "./card";
import UIButton from "./button";

interface UIComboBoxProps extends ComboBoxProps<any> {
  label?: string;
  description?: string;
  errorMessage?: string;
  color?: "primary" | "secondary" | "danger" | "warning" | "success";
  size?: "sm" | "md" | "lg";
  isLoading?: boolean;
  register?: any;
  children?: React.ReactNode;
}

export default function UIComboBox({
  label,
  description,
  errorMessage,
  color = "secondary",
  size = "md",
  isLoading,
  register,
  children,
  ...props
}: UIComboBoxProps) {
  return (
    <ComboBox menuTrigger="input" {...props}>
      {label && <Label>Favorite Animal</Label>}
      <div className="flex items-center">
        <Input
          {...register}
          className={cn(
            `
              w-full
              rounded-lg
              rounded-r-none
              transition-all
              duration-150
              border-2
              outline-none
              ring-none
              text-secondary-900
              border-secondary-500/0
              bg-secondary-500/20
              data-[hovered]:border-primary-500
              data-[focused]:border-primary-500
              dark:text-secondary-100
              dark:border-secondary-500/0
              dark:bg-secondary-500/20
              dark:data-[hovered]:border-primary-500
              dark:data-[focused]:border-primary-500
            `,
            errorMessage &&
              "border-rose-500 data-[hovered]:border-rose-500 data-[focused]:border-rose-500 dark:border-rose-500 dark:data-[hovered]:border-rose-500 dark:data-[focused]:border-rose-500",
            size === "sm" && "text-sm px-2 h-10 min-h-10",
            size === "md" && "text-base px-4 h-12 min-h-12",
            size === "lg" && "text-lg px-6 h-14 min-h-14"
          )}
        />
        <UIButton
          variant="flat"
          sizeType="icon"
          className="rounded-l-none"
          isLoading={isLoading}>
          {!isLoading && <ChevronsUpDown />}
        </UIButton>
      </div>
      <Popover
        className={({ isEntering, isExiting }) => `
          min-w-[240px] z-50
          ${isEntering ? "animate-in fade-in ease-in-out duration-200" : ""}
          ${isExiting ? "animate-out fade-out ease-in-out duration-200" : ""}
        `}>
        <UICard shadow="lg">
          <ListBox className="w-full">{children}</ListBox>
        </UICard>
      </Popover>
    </ComboBox>
  );
}
