"use client";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import UIButton from "@/ui/button";
import { ChevronLeft, Ellipsis } from "lucide-react";

export default function ChatPage() {
  const router = useRouter();
  const tChat = useTranslations("Chat");

  return (
    <div className="p-8 flex flex-col items-center justify-between h-full gap-4">
      <div className="flex-none flex items-center justify-between w-full">
        <div className="flex gap-2">
          <UIButton
            variant="flat"
            sizeType="icon"
            onPress={() => {
              router.push("/on-boarding");
            }}>
            <ChevronLeft />
          </UIButton>
        </div>
        <div>
          <h1 className="text-xl font-semibold text-secondary-900 dark:text-secondary-50">
            {tChat("Title")}
          </h1>
        </div>
        <div className="flex gap-2">
          <UIButton
            variant="link"
            sizeType="icon"
            onPress={() => {
              router.push("/dashboard/workplaces");
            }}>
            <Ellipsis />
          </UIButton>
        </div>
      </div>
      <div className="flex-1 flex items-center justify-between bg-secondary-500 w-full">
        teste
      </div>
      <div className="flex-none flex items-center justify-between bg-secondary-500 h-12 w-full">
        teste
      </div>
    </div>
  );
}
