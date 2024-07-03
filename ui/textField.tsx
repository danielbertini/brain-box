import { cn } from "@/lib/utils";
import {
  Input,
  Label,
  Text,
  TextField,
  TextFieldProps,
} from "react-aria-components";

interface UITextFieldProps extends TextFieldProps {
  label?: string;
  description?: string;
  placeHolder?: string;
  errorMessage?: string;
  className?: string;
  color?: "primary" | "secondary" | "danger" | "warning" | "success";
  size?: "small" | "medium" | "large";
  register?: any;
}

export default function UITextField({
  label,
  description,
  placeHolder,
  errorMessage,
  className,
  color = "secondary",
  size = "medium",
  register,
  ...props
}: UITextFieldProps) {
  return (
    <TextField {...props} className="flex flex-col">
      <Label className="font-bold text-secondary-900 dark:text-secondary-100">
        {label}
      </Label>
      <Input
        {...register}
        placeholder={placeHolder}
        className={cn(
          `
            rounded-xl
            transition-all
            duration-150
            border-2
            outline-none
            ring-none
            text-secondary-900
            border-secondary-500/0
            bg-secondary-500/20
            data-[hovered]:border-secondary-500
            data-[focused]:border-secondary-500
            dark:text-secondary-100
            dark:border-secondary-500/0
            dark:bg-secondary-500/20
            dark:data-[hovered]:border-secondary-500
            dark:data-[focused]:border-secondary-500
        `,
          errorMessage &&
            "border-rose-500 data-[hovered]:border-rose-500 data-[focused]:border-rose-500 dark:border-rose-500 dark:data-[hovered]:border-rose-500 dark:data-[focused]:border-rose-500",
          size === "small" && "text-sm w-full h-10 min-h-10 px-2",
          size === "medium" && "text-base w-full h-12 min-h-12 px-4",
          size === "large" && "text-lg w-full h-14 min-h-14 px-6",
          className
        )}
      />
      {description && (
        <Text
          slot="description"
          className="text-sm text-secondary-900 dark:text-secondary-100">
          {description}
        </Text>
      )}
      {errorMessage && <span className="text-rose-500">{errorMessage}</span>}
    </TextField>
  );
}
