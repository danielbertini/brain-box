"use client";
import { Label, Meter } from "react-aria-components";

interface UIMeterProps {
  label: string;
  value: number;
  className?: string;
}

export default function UIMeter({
  label,
  value,
  className,
  ...props
}: UIMeterProps) {
  return (
    <Meter value={value}>
      {({ percentage, valueText }) => (
        <>
          <div className="w-full h-2 rounded-full bg-gray-300 dark:bg-zinc-700 outline outline-1 -outline-offset-1 outline-transparent relative">
            <div
              className={`absolute top-0 left-0 h-full rounded-full bg-secondary-900 dark:bg-secondary-50`}
              style={{ width: percentage + "%" }}
            />
          </div>
          <div className="flex items-center justify-between gap-2 mt-2">
            <Label>{label}</Label>
            <span className={`text-secondary-500`}>{" " + valueText}</span>
          </div>
        </>
      )}
    </Meter>
  );
}
