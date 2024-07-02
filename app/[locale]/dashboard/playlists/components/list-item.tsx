"use client";
import { ListChecks, Trash } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { useState } from "react";
import { toast } from "sonner";
import PlaylistsEditDialog from "./edit-dialog";
import { useRouter } from "next/navigation";
import UICard from "@/ui/card";
import UIButton from "@/ui/button";
import UIAlertDialog from "@/ui/alertDialog";
import UiPlayer from "@/components/player";
import { totalPlaylistTime } from "@/lib/utils";

interface Props {
  item: any;
  playlist: any;
  mutate: () => void;
}

const PlaylistsListItem: React.FC<Props> = ({ item, playlist, mutate }) => {
  const locale = useLocale();
  const router = useRouter();
  const tMessage = useTranslations("Message");
  const [deleting, setDeleting] = useState<boolean>(false);

  const onSubmitDelete = async () => {
    setDeleting(true);

    const response = await fetch("/api/playlists/delete", {
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
        description={tMessage("Info.YouWantToDeletePlaylist")}
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
    <>
      <UICard variant="outlined" className="p-4">
        <div className="flex flex-col items-center justify-between gap-4 w-full">
          <div className="w-full line-clamp-1">
            <p className="font-bold text-secondary-800 dark:text-secondary-100 line-clamp-1">
              {item.name}
            </p>
            <p className="text-secondary-500 line-clamp-1 font-mono">
              {totalPlaylistTime(playlist)}
            </p>
          </div>
          <div className="bg-secondary-500/20 rounded-lg w-full aspect-video flex items-center justify-center">
            <UiPlayer playlist={playlist} />
          </div>
          <div className="flex-none flex items-center justify-end gap-2 w-full">
            <UIButton
              sizeType="icon"
              variant="flat"
              onPress={() => {
                router.push(`/dashboard/playlists/${item.id}`);
              }}>
              <ListChecks className="h-6 w-6" />
            </UIButton>
            <PlaylistsEditDialog id={item.id} mutate={mutate} />
            {renderDeleteButton()}
          </div>
        </div>
      </UICard>
    </>
  );
};

export default PlaylistsListItem;
