"use client";

import UISpinner from "./spinner";

interface UIPageLoadingProps {}

const UIPageLoading: React.FC<UIPageLoadingProps> = ({}) => {
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
          w-14
          h-14
          shadow-xl
        bg-secondary-50/60
        dark:bg-secondary-900/80
          backdrop-blur-xl
          rounded-full
          z-50
      ">
        <UISpinner size="lg" />
      </div>
    </div>
  );
};

export default UIPageLoading;
