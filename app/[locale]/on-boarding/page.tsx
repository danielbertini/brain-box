"use client";
import { UiLanguageToggle } from "@/components/language-toggle";
import { UiThemeToggle } from "@/components/theme-toggle";
import UIButton from "@/ui/button";
import { MoveLeft, MoveRight } from "lucide-react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";

export default function OnBoardingPage() {
  const router = useRouter();
  const tCommon = useTranslations("Common");
  const tOmBoarding = useTranslations("OnBoarding");
  const area2scroll = useRef<HTMLDivElement>(null);
  const [currentItem, setCurrentItem] = useState<Number>(0);

  const slides = [
    {
      title: tOmBoarding("Slide1.Title"),
      description: tOmBoarding("Slide1.Description"),
    },
    {
      title: tOmBoarding("Slide2.Title"),
      description: tOmBoarding("Slide2.Description"),
    },
    {
      title: tOmBoarding("Slide3.Title"),
      description: tOmBoarding("Slide3.Description"),
    },
  ];

  return (
    <>
      <header className="w-full flex items-center justify-between">
        <div className="container mx-auto px-12 py-6 flex items-center justify-end gap-2">
          <UIButton
            variant="flat"
            onPress={() => {
              router.push("/dashboard/workplaces");
            }}>
            {tCommon("Skip")}
          </UIButton>
          <UiThemeToggle />
          <UiLanguageToggle />
        </div>
      </header>
      <div className="px-12">
        <div className="relative flex flex-col items-center w-full">
          <div className="relative sm:w-[362px] w-[100%] h-[400px] rounded-3xl overflow-hidden z-20">
            <Image
              alt="Astronaut"
              src="/images/astronaut.png"
              layout="fill"
              objectFit="cover"
            />
          </div>
          <div className="absolute sm:w-[362px] w-[100%] h-[400px] rounded-3xl overflow-hidden blur-2xl top-4 z-10">
            <Image
              alt="Astronaut"
              src="/images/astronaut.png"
              layout="fill"
              objectFit="cover"
            />
          </div>
          <div className="flex items-center justify-center gap-4 mt-9">
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
                  className="text-center text-balance sm:w-[362px] w-[100%] space-y-2 mt-6 snap-center flex-shrink-0">
                  <h1 className="text-3xl font-bold text-secondary-900 dark:text-secondary-50 leading-10">
                    {item.title}
                  </h1>
                  <p className="text-secondary-500 leading-7">
                    {item.description}
                  </p>
                </div>
              );
            })}
          </div>
          <div className="flex items-center justify-center gap-2 mt-6 rounded-xl shadow-2xl bg-neutral-50 dark:bg-neutral-800">
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
    </>
  );
}
