"use client";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import UIButton from "@/ui/button";
import { ChevronLeft, Ellipsis, SendHorizontal } from "lucide-react";
import UITextField from "@/ui/textField";
import UICard from "@/ui/card";

export default function ChatPage() {
  const router = useRouter();
  const tApp = useTranslations("App");
  const tChat = useTranslations("Chat");
  const tForm = useTranslations("Form");

  const renderInstructions = () => {
    return (
      <>
        <span className="text-3xl font-bold text-secondary-500 my-12 w-full text-center">
          {tApp("Name")}
        </span>
        <div className="flex flex-col gap-2 w-full">
          <UICard
            variant="flat"
            className="text-secondary-500 p-4 w-full text-sm text-center text-balance">
            {tChat("Instructions.1")}
          </UICard>
          <UICard
            variant="flat"
            className="text-secondary-500 p-4 w-full text-sm text-center text-balance">
            {tChat("Instructions.2")}
          </UICard>
          <UICard
            variant="flat"
            className="text-secondary-500 p-4 w-full text-sm text-center text-balance">
            {tChat("Instructions.3")}
          </UICard>
          <UICard
            variant="flat"
            className="text-secondary-500 p-4 w-full text-sm text-center text-balance">
            {tChat("Instructions.5")}
          </UICard>
          <UICard
            variant="flat"
            className="text-secondary-500 p-4 w-full text-sm text-center text-balance">
            {tChat("Instructions.5")}
          </UICard>
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
              router.push("/on-boarding");
            }}>
            <ChevronLeft />
          </UIButton>
        </div>
        <div className="w-full flex items-center justify-center">
          <h1 className="text-xl font-semibold text-secondary-900 dark:text-secondary-50">
            {tChat("Title")}
          </h1>
        </div>
        <div className="w-12 min-w-12 h-12 min-h-12">
          <UIButton
            variant="link"
            sizeType="icon"
            onPress={() => {
              router.push("/profile");
            }}>
            <Ellipsis />
          </UIButton>
        </div>
      </div>
      <div className="flex-1 flex flex-col items-center justify-start w-full overflow-y-auto">
        {renderInstructions()}
      </div>
      <div className="flex-none flex items-center justify-between h-12 w-full">
        <UITextField
          placeHolder={tForm("SendAMessage")}
          className="rounded-r-none"></UITextField>
        <UIButton sizeType="icon" className="rounded-l-none">
          <SendHorizontal />
        </UIButton>
      </div>
    </div>
  );
}
