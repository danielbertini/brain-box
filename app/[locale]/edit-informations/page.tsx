"use client";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import UIButton from "@/ui/button";
import { ChevronLeft } from "lucide-react";
import UITextField from "@/ui/textField";

export default function EditInformationsPage() {
  const router = useRouter();
  const tForm = useTranslations("Form");
  const tEditInformations = useTranslations("EditInformations");

  return (
    <div className="flex flex-col items-center justify-between h-full gap-4">
      <div className="flex-none flex items-center justify-between w-full gap-2">
        <div className="w-12 min-w-12 h-12 min-h-12">
          <UIButton
            variant="flat"
            sizeType="icon"
            onPress={() => {
              router.push("/preferences");
            }}>
            <ChevronLeft />
          </UIButton>
        </div>
        <div className="w-full flex items-center justify-center">
          <h1 className="text-xl font-semibold text-secondary-900 dark:text-secondary-50 line-clamp-1">
            {tEditInformations("Title")}
          </h1>
        </div>
        <div className="w-12 min-w-12 h-12 min-h-12"></div>
      </div>
      <div className="flex-1 flex flex-col items-center justify-start w-full overflow-y-auto pt-4 space-y-4">
        <UITextField label={tForm("FullName")}></UITextField>
        <UITextField label={tForm("Email")}></UITextField>
        <UITextField label={tForm("Password")}></UITextField>
      </div>
      <div className="flex-none flex items-center justify-start w-full gap-2">
        <UIButton onPress={() => {}} className="w-full">
          {tForm("SaveChanges")}
        </UIButton>
      </div>
    </div>
  );
}
