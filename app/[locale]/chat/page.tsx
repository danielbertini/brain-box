"use client";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import UIButton from "@/ui/button";
import {
  ChevronLeft,
  Copy,
  Edit,
  Ellipsis,
  SendHorizontal,
  Share,
} from "lucide-react";
import UITextField from "@/ui/textField";
import UICard from "@/ui/card";
import { useEffect, useRef, useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { cn } from "@/lib/utils";
import Logo from "@/components/logo";
import Image from "next/image";

type Props = {
  params: { locale: string };
};

export default function ChatPage({ params: { locale } }: Props) {
  const router = useRouter();
  const tApp = useTranslations("App");
  const tChat = useTranslations("Chat");
  const tForm = useTranslations("Form");
  const tMessage = useTranslations("Form");
  const ref = useRef<HTMLDivElement | null>(null);

  const [aiQuery, setAiQuery] = useState("");
  const [aiLoading, setAiLoading] = useState(false);
  const [aiMessages] = useState<any[]>([]);

  const formSchema = z.object({
    query: z
      .string()
      .min(4, tMessage("Error.MinSize", { min: 3 }))
      .max(125, tMessage("Error.MaxSize", { max: 125 })),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      query: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setAiLoading(true);

    aiMessages?.push({
      role: "user",
      content: values.query,
    });

    const response = await fetch("/api/chat/prompt", {
      method: "POST",
      headers: { "Accept-Language": locale },
      body: JSON.stringify({
        prompt: values.query,
      }),
    });

    const responseData = await response.json();

    if (response.status !== 200) {
    } else {
      aiMessages?.push({
        role: "assistant",
        content: responseData.text,
      });
      form.reset();
    }
    setAiLoading(false);
  };

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

  const renderChat = () => {
    return (
      <>
        {aiMessages
          .slice()
          .reverse()
          .map((message, index) => {
            return (
              <UICard
                key={index}
                variant={message.role === "user" ? "flat" : "outlined"}
                className={cn(
                  `p-4 text-balance w-full text-secondary-900 dark:text-secondary-50`
                )}>
                <div className="flex flex-row items-center justify-between mb-4">
                  {message.role === "user" ? (
                    <>
                      <div className="relative w-12 h-12 rounded-xl overflow-hidden shadow-lg">
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
                      <div className="flex items-center justify-center">
                        <UIButton variant="link" sizeType="icon">
                          <Edit />
                        </UIButton>
                      </div>
                    </>
                  ) : (
                    <>
                      <Logo className="w-12 h-12 rounded-xl overflow-hidden shadow-lg" />
                      <div className="flex items-center justify-center">
                        <UIButton variant="link" sizeType="icon">
                          <Copy />
                        </UIButton>
                        <UIButton variant="link" sizeType="icon">
                          <Share />
                        </UIButton>
                      </div>
                    </>
                  )}
                </div>
                {message.content}
              </UICard>
            );
          })}
      </>
    );
  };

  useEffect(() => {
    ref?.current?.scrollTo(0, ref?.current?.scrollHeight);
  }, [aiLoading]);

  return (
    <div className="flex flex-col items-center justify-between h-full gap-4 w-full">
      <div className="flex-none flex items-center justify-between gap-2  w-full">
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
      <div
        ref={ref as React.RefObject<HTMLDivElement>}
        className={cn(
          `flex-1 flex items-center justify-start  w-full overflow-y-auto rounded-xl`,
          aiMessages.length === 0 ? "flex-col" : "flex-col-reverse gap-4"
        )}>
        {aiMessages.length === 0 ? renderInstructions() : renderChat()}
      </div>
      <div className="flex-none flex items-center justify-between  w-full">
        <form
          noValidate
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex item-center justify-between w-full">
          <UITextField
            register={form.register("query")}
            placeHolder={tForm("SendAMessage")}
            className="rounded-r-none border-r-0"></UITextField>
          <UIButton
            type="submit"
            sizeType="icon"
            isDisabled={aiLoading}
            isLoading={aiLoading}
            className="rounded-l-none">
            <SendHorizontal />
          </UIButton>
        </form>
      </div>
    </div>
  );
}
