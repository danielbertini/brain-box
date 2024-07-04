"use client";

import Image from "next/image";
import { MoveLeft, MoveRight } from "lucide-react";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import UIButton from "@/ui/button";
import { UiThemeToggle } from "@/components/theme-toggle";
import { UiLanguageToggle } from "@/components/language-toggle";

export default function OnBoardingPage() {
  const router = useRouter();
  const tCommon = useTranslations("Common");
  const tOnBoarding = useTranslations("OnBoarding");
  const area2scroll = useRef<HTMLDivElement>(null);
  const [currentItem, setCurrentItem] = useState<Number>(0);

  const slides = [
    {
      title: tOnBoarding("Slide1.Title"),
      description: tOnBoarding("Slide1.Description"),
    },
    {
      title: tOnBoarding("Slide2.Title"),
      description: tOnBoarding("Slide2.Description"),
    },
    {
      title: tOnBoarding("Slide3.Title"),
      description: tOnBoarding("Slide3.Description"),
    },
  ];

  return (
    <div className="flex flex-col items-center justify-between h-full gap-4">
      <div className="w-full flex items-center justify-between">
        <div className="container mx-auto flex items-center justify-between gap-2">
          <div className="flex gap-2">
            <UiThemeToggle />
            <UiLanguageToggle />
          </div>
          <UIButton
            variant="link"
            onPress={() => {
              router.push("/chat");
            }}>
            {tCommon("Skip")}
          </UIButton>
        </div>
      </div>
      <div className="relative w-full  h-full rounded-3xl overflow-hidden shadow-2xl">
        <Image
          alt="Astronaut"
          src="/images/astronaut.png"
          priority
          fill
          style={{
            objectFit: "cover",
          }}
        />
      </div>
      <div className="relative flex flex-col items-center w-full">
        <div className="flex items-center justify-center gap-4 mt-2">
          {Array.from({ length: slides.length }, (_, index) => {
            return (
              <div
                key={index}
                className={` rounded-full ${
                  currentItem === index
                    ? "bg-neutral-900 dark:bg-neutral-50 w-4 h-4 outline outline-offset-2 outline-1"
                    : "bg-neutral-500 w-3 h-3"
                }`}
              />
            );
          })}
        </div>
        <div
          ref={area2scroll}
          className="flex snap-x snap-mandatory gap-x-6 overflow-x-hidden no-scrollbar sm:w-[362px] w-[100%]">
          {slides.map((item, index) => {
            return (
              <div
                key={index}
                className="text-center text-balance sm:w-[362px] w-[100%] space-y-2 mt-4 snap-center flex-shrink-0">
                <h1 className="text-3xl font-bold text-secondary-900 dark:text-secondary-50">
                  {item.title}
                </h1>
                <p className="text-secondary-500">{item.description}</p>
              </div>
            );
          })}
        </div>
        <div className="flex items-center justify-center gap-2 mt-4 rounded-xl bg-secondary-500/10">
          <UIButton
            variant="link"
            isDisabled={Number(currentItem) === 0}
            onPress={() => {
              area2scroll?.current?.scrollTo({
                left: area2scroll.current.scrollLeft - 362,
                behavior: "smooth",
              });
              setCurrentItem(Number(currentItem) - 1);
            }}>
            <MoveLeft className="w-5" />
          </UIButton>
          <div className="w-[1px] h-4 bg-secondary-900 dark:bg-secondary-50" />
          <UIButton
            variant="link"
            isDisabled={Number(currentItem) === slides.length - 1}
            onPress={() => {
              area2scroll?.current?.scrollTo({
                left: area2scroll.current.scrollLeft + 320,
                behavior: "smooth",
              });
              setCurrentItem(Number(currentItem) + 1);
            }}>
            <MoveRight className="w-5" />
          </UIButton>
        </div>
      </div>
    </div>
  );
}
