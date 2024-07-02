"use client";

import { useLocale, useTranslations } from "next-intl";
import { useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { PlusIcon } from "lucide-react";
import { useMediaQuery } from "@/lib/mediaquery";
import UIButton from "@/ui/button";
import UITextField from "@/ui/textField";
import { Dialog } from "react-aria-components";
import UICard from "@/ui/card";
import UIDialog from "@/ui/dialog";

interface Props {
  mutate: () => void;
}

const WorkplacesAddDialog: React.FC<Props> = ({ mutate }) => {
  const locale = useLocale();
  const tPageDashboard = useTranslations("Page.Dashboard");
  const tForm = useTranslations("Form");
  const tMessage = useTranslations("Message");
  const isMobile = useMediaQuery("(max-width: 640px)");
  const [isOpen, setIsOpen] = useState(false);
  const [saving, setSaving] = useState(false);

  const formSchema = z.object({
    name: z
      .string()
      .min(4, tMessage("Error.MinSize", { min: 4 }))
      .max(32, tMessage("Error.MaxSize", { max: 32 })),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    if (saving) return;

    setSaving(true);

    const response = await fetch("/api/workplaces/add", {
      method: "POST",
      headers: { "Accept-Language": locale },
      body: JSON.stringify({
        name: values.name,
      }),
    });

    const data = await response.json();

    if (response.status === 200) {
      mutate();
      form.reset();
      setSaving(false);
      setIsOpen(false);
    } else {
      toast.error(data.message);
      setSaving(false);
    }
  };

  return (
    <>
      <UIDialog
        isOpen={isOpen}
        trigger={
          <UIButton
            color="primary"
            sizeType={isMobile ? "icon" : "default"}
            onPress={() => setIsOpen(true)}>
            <PlusIcon className="h-6 w-6" />
            {!isMobile && tForm("Create")}
          </UIButton>
        }>
        <Dialog
          role="dialog"
          className="outline-none ring-none border-none relative">
          {({ close }) => (
            <form noValidate onSubmit={form.handleSubmit(onSubmit)}>
              <UICard className="p-6">
                <div className="flex flex-col gap-4 items-center justify-center">
                  <div className="flex items-center justify-between w-full">
                    <p className="text-lg font-bold text-neutral-900 dark:text-neutral-100">
                      {tForm("Create") + " " + tPageDashboard("Menu.Workplace")}
                    </p>
                  </div>
                </div>
                <div className="my-6">
                  <UITextField
                    register={form.register("name")}
                    type="text"
                    label={tForm("Name")}
                    errorMessage={form.formState.errors.name?.message}
                  />
                </div>
                <div className="flex gap-2 items-center justify-end mt-6">
                  <UIButton
                    variant="link"
                    onPress={() => {
                      setIsOpen(false);
                    }}>
                    {tForm("Cancel")}
                  </UIButton>
                  <UIButton
                    type="submit"
                    color="primary"
                    isDisabled={saving}
                    isLoading={saving}>
                    {tForm("Create")}
                  </UIButton>
                </div>
              </UICard>
            </form>
          )}
        </Dialog>
      </UIDialog>
    </>
  );
};

export default WorkplacesAddDialog;
