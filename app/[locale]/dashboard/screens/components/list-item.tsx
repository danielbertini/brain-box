"use client";
import { Trash } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { useContext, useState } from "react";
import { toast } from "sonner";
import WorkplacesEditDialog from "./edit-dialog";
import UiComboboxPlaylists from "@/components/combobox-playlists";
import { AppContext } from "@/app/providers/app-context";
import UiPlayer from "@/components/player";
import UICard from "@/ui/card";
import UIAlertDialog from "@/ui/alertDialog";
import UIButton from "@/ui/button";
import UISpinner from "@/ui/spinner";

interface Props {
  playlists: any;
  item: any;
  mutate: () => void;
}

const ScreensListItem: React.FC<Props> = ({ playlists, item, mutate }) => {
  const locale = useLocale();
  const tMessage = useTranslations("Message");
  const [deleting, setDeleting] = useState<boolean>(false);
  const [changingPlaylist, setChangingPlaylist] = useState<boolean>(false);
  const [playlist, setPlaylist] = useState<any>(item?.playlists?.list ?? []);
  const appDetails = useContext(AppContext);

  const onChangePlaylist = async (playlist_id: string) => {
    setChangingPlaylist(true);

    const response = await fetch("/api/screens/edit", {
      method: "POST",
      headers: { "Accept-Language": locale },
      body: JSON.stringify({
        id: item.id,
        name: item.name,
        workplace_id: appDetails?.workplace_id,
        playlist_id: playlist_id,
      }),
    });

    const data = await response.json();

    if (response.status === 200) {
      mutate();
      setPlaylist(data?.data?.playlists?.list ?? []);
      setChangingPlaylist(false);
    } else {
      toast.error(data.message);
      setChangingPlaylist(false);
    }
  };

  const onSubmitDelete = async () => {
    setDeleting(true);

    const response = await fetch("/api/screens/delete", {
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
        description={tMessage("Info.YouWantToDeleteScreen")}
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
              {item.code}
            </p>
          </div>
          <div className="bg-secondary-500/20 rounded-lg w-full aspect-video flex items-center justify-center">
            {changingPlaylist ? (
              <UISpinner size="lg" />
            ) : playlist ? (
              <UiPlayer playlist={playlist} />
            ) : (
              <></>
            )}
          </div>
          <div className="flex flex-row items-center justify-between gap-2 w-full">
            <UiComboboxPlaylists
              playlists={playlists}
              playlist_id={item.playlist_id}
              selected_id={(value: string) => {
                onChangePlaylist(value);
              }}
            />
            <div className="flex-none flex items-center gap-2">
              <WorkplacesEditDialog id={item.id} mutate={mutate} />
              {renderDeleteButton()}
            </div>
          </div>
        </div>
      </UICard>
    </>
  );
};

export default ScreensListItem;
