"use client";

import { Loader2 } from "lucide-react";

interface PageLoadingProps {}

const PageLoading: React.FC<PageLoadingProps> = ({}) => {
  return (
    <div className="w-full flex flex-row items-center justify-center">
      <div
        className="
          fixed
          bottom-24
          flex
          flex-row
          items-center
          justify-center
          w-12
          h-12
          shadow-lg
        bg-neutral-50/80
        dark:bg-neutral-900/80
          backdrop-blur-lg
          rounded-full
          z-50
      ">
        <Loader2 className="animate-spin w-8 h-8" />
      </div>
    </div>
  );
};

export default PageLoading;
