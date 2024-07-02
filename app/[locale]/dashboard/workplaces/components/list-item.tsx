"use client";
import { Trash } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { useState } from "react";
import { toast } from "sonner";
import WorkplacesEditDialog from "./edit-dialog";
import UICard from "@/ui/card";
import UIAlertDialog from "@/ui/alertDialog";
import UIButton from "@/ui/button";

interface Props {
  item: any;
  mutate: () => void;
}

const WorkplacesListItem: React.FC<Props> = ({ item, mutate }) => {
  const locale = useLocale();
  const tMessage = useTranslations("Message");

  const [deleting, setDeleting] = useState<boolean>(false);

  const onSubmitDelete = async () => {
    setDeleting(true);

    const response = await fetch("/api/workplaces/delete", {
      method: "DELETE",
      headers: { "Accept-Language": locale },
      body: JSON.stringify({
        id: item.id,
      }),
    });

    const data = await response.json();

    if (response.status === 200) {
      mutate();
      setDeleting(false);
    } else {
      toast.error(data.message);
      setDeleting(false);
    }
  };

  const renderDeleteButton = () => {
    return (
      <UIAlertDialog
        title={tMessage("Info.AreYouSure")}
        description={tMessage("Info.YouWantToDeleteWorkplace")}
        trigger={
          <UIButton
            sizeType="icon"
            variant="flat"
            isLoading={deleting}
            isDisabled={deleting || item.main}>
            <Trash className="h-6 w-6" />
          </UIButton>
        }
        response={(value: boolean) => {
          if (value) {
            onSubmitDelete();
          }
        }}
      />
    );
  };

  return (
    <UICard variant="outlined" className="p-4">
      <div className="flex flex-row items-center justify-between gap-2 w-full">
        <div className="w-full line-clamp-1">
          <p className="font-bold text-secondary-800 dark:text-secondary-100 line-clamp-1">
            {item.name}
          </p>
          <p className="text-secondary-500 line-clamp-1">
            {tMessage("Info.TotalScreens", { count: item.screens[0].count })}
          </p>
        </div>
        <div className="flex-none flex items-center gap-2">
          <WorkplacesEditDialog id={item.id} mutate={mutate} />
          {renderDeleteButton()}
        </div>
      </div>
    </UICard>
  );
};

export default WorkplacesListItem;
