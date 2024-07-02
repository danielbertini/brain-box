"use client";

import { twMerge } from "tailwind-merge";

interface Props {
  title: string;
  className?: string;
  classNameText?: string;
}

const UiPageTitle: React.FC<Props> = ({ title, className, classNameText }) => {
  return (
    <>
      <div className="flex flex-row w-full justify-start items-center gap-2 min-w-[100%]">
        <div className={twMerge("flex flex-col", className)}>
          <h1
            className={twMerge(
              "text-2xl font-light text-secondary-800 dark:text-secondary-100 line-clamp-1",
              classNameText
            )}>
            {title}
          </h1>
          <div className="flex flex-row gap-2 items-center justify-start">
            <div className="min-w-[48px] flex-0 h-1 rounded bg-secondary-500/20 my-2 mt-2"></div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UiPageTitle;
