"use client";

import { useTranslations } from "next-intl";
import { useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import Image from "next/image";
import { useUpload } from "@/app/hooks/useUpload";
import UIDialog from "@/ui/dialog";
import UIButton from "@/ui/button";
import { useMediaQuery } from "@/lib/mediaquery";
import UICard from "@/ui/card";
import { Dialog, FileTrigger } from "react-aria-components";
import { ImageIcon } from "lucide-react";

interface Props {
  playlist_id: string;
  response: (value: {
    file_id: string;
    file_url: string;
    duration: { minutes: string; seconds: string };
  }) => void;
}

const PlaylistAddAppImage: React.FC<Props> = ({ playlist_id, response }) => {
  const tApps = useTranslations("Apps.Image");
  const tForm = useTranslations("Form");
  const tMessage = useTranslations("Message");
  const isMobile = useMediaQuery("(max-width: 640px)");

  const [saving, setSaving] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [file, setFile] = useState<string[]>([]);

  const formSchema = z.object({
    file: z.string(),
    time: z.string(),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      file: "",
      time: "",
    },
  });

  const { upload, uploadPreview, uploadStatus, uploadFile } = useUpload();

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    if (saving) return;

    setSaving(true);

    if (uploadPreview === null || uploadPreview === "") {
      toast.error(tMessage("Error.NoFileSelected"));
      setSaving(false);
      return;
    }

    const uploadResponse: any = await upload(
      `nivens/playlist/${playlist_id}/`,
      ""
    );

    if (uploadResponse) {
      response({
        file_id: uploadResponse.fileId as string,
        file_url: uploadResponse.url as string,
        duration: {
          minutes: "00",
          seconds: "30",
        },
      });
      form.reset();
      setSaving(false);
      setIsOpen(false);
      setFile([]);
      return;
    } else {
      toast.error(tMessage("Error.UploadFailed"));
      setSaving(false);
      return;
    }
  };

  return (
    <>
      <UIDialog
        isOpen={isOpen}
        trigger={
          <UIButton
            color="primary"
            variant="flat"
            sizeType={isMobile ? "icon" : "default"}
            onPress={() => setIsOpen(true)}>
            <ImageIcon className="h-6 w-6" />
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
                <div className="my-6 bg-secondary-100/40 dark:bg-secondary-950/40 rounded-xl p-4">
                  {uploadPreview && (
                    <div className="flex items-center justify-between mb-4">
                      <div className="text-neutral-900 dark:text-neutral-100 line-clamp-1">
                        <div className="w-full aspect-auto relative flex-none">
                          <Image
                            className="w-full object-cover rounded-md"
                            src={uploadPreview as string}
                            alt={"uploadPreview"}
                            width={300}
                            height={400}
                            priority={true}
                            sizes="100vw"
                          />
                        </div>
                      </div>
                    </div>
                  )}
                  <FileTrigger
                    acceptedFileTypes={["image/*"]}
                    allowsMultiple={false}
                    onSelect={(e: any) => {
                      e && uploadFile(e[0]);
                    }}>
                    <UIButton color="primary" variant="flat" className="w-full">
                      {tForm("File")}
                    </UIButton>
                  </FileTrigger>
                </div>
                <div className="flex gap-2 items-center justify-end mt-6">
                  <UIButton
                    variant="link"
                    onPress={() => {
                      setIsOpen(false);
                      setFile([]);
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
    </>
  );
};

export default PlaylistAddAppImage;
