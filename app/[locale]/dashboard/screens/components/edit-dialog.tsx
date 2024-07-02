"use client";
import { useLocale, useTranslations } from "next-intl";
import { useCallback, useContext, useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { Edit } from "lucide-react";
import UIButton from "@/ui/button";
import UITextField from "@/ui/textField";
import { Dialog } from "react-aria-components";
import UICard from "@/ui/card";
import UIDialog from "@/ui/dialog";
import { AppContext } from "@/app/providers/app-context";

interface Props {
  id: string;
  mutate: () => void;
}

const ScreensEditDialog: React.FC<Props> = ({ id, mutate }) => {
  const locale = useLocale();
  const tPageDashboard = useTranslations("Page.Dashboard");
  const tForm = useTranslations("Form");
  const tMessage = useTranslations("Message");
  const appDetails = useContext(AppContext);

  const [isOpen, setIsOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(false);

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

  const loadData = useCallback(async () => {
    setLoading(true);

    const response = await fetch(`/api/screens/get?id=${id}`, {
      headers: { "Accept-Language": locale },
    });

    const data = await response.json();

    if (response.status === 200) {
      form.setValue("name", data.data.name);
      setLoading(false);
      setIsOpen(true);
    } else {
      toast.error(data.message);
    }
  }, [form, id, locale]);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    if (saving) return;

    setSaving(true);

    const response = await fetch("/api/screens/edit", {
      method: "POST",
      headers: { "Accept-Language": locale },
      body: JSON.stringify({
        id: id,
        name: values.name,
        workplace_id: appDetails?.workplace_id,
      }),
    });

    const data = await response.json();

    if (response.status === 200) {
      mutate();
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
            variant="flat"
            isDisabled={loading}
            isLoading={loading}
            sizeType={"icon"}
            onPress={() => loadData()}>
            <Edit className="h-6 w-6" />
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
                      {tForm("Edit") + " " + tPageDashboard("Menu.Workplace")}
                    </p>
                  </div>
                </div>
                <div className="my-6">
                  <UITextField
                    register={form.register("name")}
                    defaultValue={form.watch("name")}
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
                    {tForm("Edit")}
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

export default ScreensEditDialog;
