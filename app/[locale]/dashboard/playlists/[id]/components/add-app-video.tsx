/* eslint-disable jsx-a11y/alt-text */

"use client";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { VideoIcon } from "lucide-react";
import UIDialog from "@/ui/dialog";
import UIButton from "@/ui/button";
import { useMediaQuery } from "@/lib/mediaquery";
import { Dialog } from "react-aria-components";
import UICard from "@/ui/card";
import UITextField from "@/ui/textField";

interface Props {
  playlist_id: string;
  response: (value: {
    url: string;
    duration: { minutes: string; seconds: string };
  }) => void;
}

const PlaylistAddAppVideo: React.FC<Props> = ({ playlist_id, response }) => {
  const tApps = useTranslations("Apps.Video");
  const tForm = useTranslations("Form");
  const tMessage = useTranslations("Message");
  const isMobile = useMediaQuery("(max-width: 640px)");

  const [saving, setSaving] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const formSchema = z.object({
    url: z.string().min(4, tMessage("Error.MinSize", { min: 10 })),
    time: z.string(),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      url: "",
      time: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    if (saving) return;
    setSaving(true);
    response({
      url: values.url,
      duration: {
        minutes: "00",
        seconds: "30",
      },
    });
    form.reset();
    setSaving(false);
    setIsOpen(false);
    return;
  };

  return (
    <UIDialog
      isOpen={isOpen}
      trigger={
        <UIButton
          color="primary"
          variant="flat"
          sizeType={isMobile ? "icon" : "default"}
          onPress={() => setIsOpen(true)}>
          <VideoIcon className="h-6 w-6" />
          {!isMobile && tApps("Name")}
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
                    {tForm("Add") + " " + tApps("Name")}
                  </p>
                </div>
              </div>
              <div className="my-6">
                <UITextField
                  register={form.register("url")}
                  type="text"
                  label={tForm("URL")}
                  errorMessage={form.formState.errors.url?.message}
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
                  {tForm("Add")}
                </UIButton>
              </div>
            </UICard>
          </form>
        )}
      </Dialog>
    </UIDialog>
  );
};

export default PlaylistAddAppVideo;
