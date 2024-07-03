"use client";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import UIButton from "@/ui/button";
import { ChevronLeft } from "lucide-react";
import Image from "next/image";

export default function ProfilePage() {
  const router = useRouter();
  const tProfile = useTranslations("Profile");

  const renderProfileInfo = () => {
    return (
      <>
        <div className="mt-8 mb-4">
          <div className="relative">
            <div className="relative w-28 h-28 rounded-full overflow-hidden shadow-2xl">
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
            <div className="absolute w-6 h-6 bg-green-500 rounded-full bottom-2 right-2 border-4 border-secondary-50" />
          </div>
        </div>
        <div className="flex flex-col">
          <span className="text-3xl font-bold text-secondary-900 dark:text-secondary-50 w-full text-center">
            Daniel Bertini
          </span>
          <span className="text-secondary-500/50 text-sm w-full text-center">
            danielbertini@mail.com
          </span>
        </div>
      </>
    );
  };

  return (
    <div className="p-8 flex flex-col items-center justify-between h-full gap-4">
      <div className="flex-none flex items-center justify-between w-full gap-2">
        <div className="w-12 min-w-12 h-12 min-h-12">
          <UIButton
            variant="flat"
            sizeType="icon"
            onPress={() => {
              router.push("/chat");
            }}>
            <ChevronLeft />
          </UIButton>
        </div>
        <div className="w-full flex items-center justify-center">
          <h1 className="text-xl font-semibold text-secondary-900 dark:text-secondary-50">
            {tProfile("Title")}
          </h1>
        </div>
        <div className="w-12 min-w-12 h-12 min-h-12"></div>
      </div>
      <div className="flex-1 flex flex-col items-center justify-start w-full overflow-y-auto">
        {renderProfileInfo()}
      </div>
      <div className="flex-none flex items-center justify-between h-12 w-full"></div>
    </div>
  );
}
