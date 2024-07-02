"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { useTheme } from "next-themes";

interface LogoProps {
  className?: string;
  size?: "xs" | "sm" | "md" | "lg";
}

const sizeDimensions = {
  xs: { className: "w-[30px] h-[36px]" },
  sm: { className: "w-[60px] h-[71px]" },
  md: { className: "w-[90px] h-[107px]" },
  lg: { className: "w-[120px] h-[143px]" },
};

const Logo: React.FC<LogoProps> = ({ className, size = "lg" }) => {
  const { resolvedTheme } = useTheme();
  const dimensions = sizeDimensions[size];
  const color = resolvedTheme === "dark" ? "#F9FAFB" : "#1A202C";

  return (
    <div
      className={cn(
        `flex items-center justify-center relative`,
        dimensions.className,
        className
      )}>
      <svg
        width="120"
        height="143"
        viewBox="0 0 120 143"
        fill="none"
        xmlns="http://www.w3.org/2000/svg">
        <path
          d="M64.326 84.898C66.9485 83.899 69.1534 82.0382 70.579 79.6209L75.3019 71.6124C81.7017 60.7607 98.3325 65.2994 98.3325 77.8977V97.0302C98.3325 103.864 92.793 109.403 85.9596 109.403H67.235C53.4966 109.403 49.9919 90.3586 62.8303 85.4678L64.326 84.898Z"
          fill={color}
        />
        <path
          d="M42.2568 68.6973C42.0791 71.4979 42.8587 74.2758 44.4677 76.575L49.7984 84.1925C57.0217 94.5144 45.9982 107.768 34.5329 102.547L17.1212 94.6169C10.9024 91.7847 8.15695 84.4474 10.9892 78.2285L18.7499 61.188C24.444 48.6852 43.2283 53.3891 42.3582 67.0999L42.2568 68.6973Z"
          fill={color}
        />
        <path
          d="M65.5885 60.5929C63.41 58.8239 60.6949 57.8479 57.8887 57.8252L48.5916 57.75C35.9937 57.6482 31.5895 40.9812 42.4927 34.6694L59.0508 25.0839C64.9647 21.6604 72.5343 23.6792 75.9578 29.5931L85.3389 45.7981C92.2219 57.6879 77.4958 70.2625 66.831 61.6019L65.5885 60.5929Z"
          fill={color}
        />
      </svg>
    </div>
  );
};

export default Logo;
