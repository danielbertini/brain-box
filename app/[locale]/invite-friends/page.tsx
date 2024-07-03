"use client";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import UIButton from "@/ui/button";
import { ChevronLeft, Copy, Package, Star } from "lucide-react";
import UITextField from "@/ui/textField";
import { toast } from "sonner";

export default function InviteFriendsPage() {
  const router = useRouter();
  const tInviteFriends = useTranslations("InviteFriends");
  const promoCode = "BrainAiPartnerMR";

  return (
    <div className="p-8 flex flex-col items-center justify-between h-full gap-4">
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
            {tInviteFriends("Title")}
          </h1>
        </div>
        <div className="w-12 min-w-12 h-12 min-h-12"></div>
      </div>
      <div className="flex-1 flex flex-col items-center justify-start w-full overflow-y-auto pt-6">
        <div className="relative flex flex-row items-baseline">
          <Star
            className="relative w-8 h-8 animate-[spin_40s_linear_infinite] top-4"
            strokeWidth={1.6}
          />
          <Star
            className="relative w-20 h-20 animate-[spin_20s_linear_infinite] right-2"
            strokeWidth={1}
          />
          <Star
            className="w-10 h-10 animate-[spin_30s_linear_infinite]"
            strokeWidth={1.4}
          />
        </div>
        <Package className="w-48 h-48 mt-[-10px]" strokeWidth={0.4} />
        <p className="text-center text-secondary-900 dark:text-secondary-50 mt-4 font-bold text-xl">
          {tInviteFriends("Content.Title")}
        </p>
        <p className="text-center text-secondary-500 dark:text-secondary-400 mt-2 text-balance">
          {tInviteFriends("Content.Description")}
        </p>
      </div>
      <div className="flex-none flex items-center justify-start w-full">
        <UITextField
          isDisabled
          placeHolder={promoCode}
          className="rounded-r-none border-r-0"></UITextField>
        <UIButton
          sizeType="icon"
          className="rounded-l-none"
          onPress={() => {
            navigator?.clipboard?.writeText(promoCode);
            toast.success("Copied to clipboard");
          }}>
          <Copy />
        </UIButton>
      </div>
    </div>
  );
}
