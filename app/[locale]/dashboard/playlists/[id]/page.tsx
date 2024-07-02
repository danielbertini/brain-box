"use client";

import UiPageTitle from "@/components/page-title";
import { useLocale, useTranslations } from "next-intl";
import { useCallback, useContext, useEffect, useState } from "react";
import { toast } from "sonner";
import {
  DragDropContext,
  Draggable,
  DropResult,
  Droppable,
} from "@hello-pangea/dnd";
import { Apps, iApps, iAppsList } from "./apps";
import { reorder } from "@/lib/utils";
import { Save, Trash } from "lucide-react";
import Image from "next/image";
import { useMediaQuery } from "@/lib/mediaquery";
import { AppContext } from "@/app/providers/app-context";
import { useRouter } from "next/navigation";
import ReactPlayer from "react-player";
import UIPageLoading from "@/ui/pageLoading";
import UIButton from "@/ui/button";
import PlaylistAddAppImage from "./components/add-app-image";
import { nanoid } from "nanoid";
import PlaylistAddAppVideo from "./components/add-app-video";
import UICard from "@/ui/card";
import InputTime from "@/ui/inputTime";
import UIAlertDialog from "@/ui/alertDialog";

export default function Playlist({ params }: any) {
  const locale = useLocale();
  const isMobile = useMediaQuery("(max-width: 640px)");
  const router = useRouter();
  const appDetails = useContext(AppContext);
  const tMessage = useTranslations("Message");
  const tForm = useTranslations("Form");
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(false);
  const [saving, setSaving] = useState(false);
  const [data, setData] = useState<any>([]);
  const [apps, setApps] = useState<iApps[]>(Apps);
  const [playlist, setPlaylist] = useState<iAppsList[]>([]);

  const saveData = useCallback(
    async (id: string, name: string) => {
      setSaving(true);

      const response = await fetch(`/api/playlists/edit`, {
        method: "POST",
        headers: { "Accept-Language": locale },
        body: JSON.stringify({
          id: id,
          name: name,
          workplace_id: appDetails?.workplace_id,
          list: playlist,
        }),
      });

      const data = await response.json();

      if (response.status === 200) {
        setSaving(false);
        router.push(`/dashboard/playlists`);
      } else {
        setSaving(false);
        toast.error(data.message);
      }
    },
    [appDetails?.workplace_id, locale, playlist, router]
  );

  const loadData = useCallback(async () => {
    setLoading(true);

    const response = await fetch(`/api/playlists/get?id=${params.id}`, {
      headers: { "Accept-Language": locale },
    });

    const data = await response.json();

    if (response.status === 200) {
      setLoading(false);
      setData(data.data);
      if (data.data.list) setPlaylist(data.data.list);
    } else {
      toast.error(data.message);
    }
  }, [locale, params.id]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const handleDragStart = () => {
    if (window.navigator.vibrate) window.navigator.vibrate(100);
  };

  const handleDragEnd = (result: DropResult) => {
    if (result.combine) {
      const newPlaylist: iAppsList[] = [...playlist];
      newPlaylist.splice(result.source.index, 1);
      setPlaylist(newPlaylist);
      return;
    }
    if (!result.destination) return;
    if (result.destination.index === result.source.index) return;

    const newPlaylist = reorder(
      playlist,
      result.source.index,
      result.destination.index
    );
    setPlaylist(newPlaylist);
  };

  const renderDeleteButton = (app_id: string) => {
    return (
      <UIAlertDialog
        title={tMessage("Info.AreYouSure")}
        description={tMessage("Info.YouWantToDeleteItem")}
        trigger={
          <UIButton
            sizeType="icon"
            variant="flat"
            isLoading={deleting}
            isDisabled={deleting}>
            <Trash className="h-6 w-6" />
          </UIButton>
        }
        response={(value: boolean) => {
          if (value) {
            setDeleting(true);
            const newPlaylist = playlist.filter((app) => app.id !== app_id);
            setPlaylist(newPlaylist);
            setDeleting(false);
          }
        }}
      />
    );
  };

  const updateAppDuration = (index: number, duration: any) => {
    const newPlaylist = [...playlist];
    newPlaylist[index].duration = duration;
    setPlaylist(newPlaylist);
  };

  const renderContent = () => {
    return (
      <>
        <UiPageTitle title={data?.name} className="mt-8 mb-2" />
        <div className="flex flex-row gap-2 w-full items-center justify-between mb-4">
          <div className="flex items-center justify-between gap-4 flex-1">
            <div className="flex items-center justify-start gap-2">
              <PlaylistAddAppImage
                playlist_id={params.id}
                response={(values) => {
                  var id = nanoid();
                  setPlaylist((prevPlaylist) => [
                    ...prevPlaylist,
                    {
                      id: id,
                      type: "image",
                      position: 1,
                      details: {
                        file_id: values.file_id,
                        file_url: values.file_url,
                      },
                      duration: {
                        minutes: values.duration.minutes,
                        seconds: values.duration.seconds,
                      },
                    },
                  ]);
                }}
              />
              <PlaylistAddAppVideo
                playlist_id={params.id}
                response={(values) => {
                  var id = nanoid();
                  setPlaylist((prevPlaylist) => [
                    ...prevPlaylist,
                    {
                      id: id,
                      type: "video",
                      position: 1,
                      details: {
                        url: values.url,
                      },
                      duration: {
                        minutes: values.duration.minutes,
                        seconds: values.duration.seconds,
                      },
                    },
                  ]);
                }}
              />
            </div>
            <UIButton
              color="primary"
              isLoading={saving}
              isDisabled={saving}
              sizeType={isMobile ? "icon" : "default"}
              onPress={() => {
                saveData(params.id, data.name);
              }}>
              {!saving && <Save className="h-6 w-6" />}
              {isMobile ? "" : tForm("Save")}
            </UIButton>
          </div>
        </div>
        <div className="flex flex-col gap-4 mt-2">
          <div className="w-full">
            <DragDropContext
              onDragStart={handleDragStart}
              onDragEnd={handleDragEnd}>
              <Droppable droppableId="droppable">
                {(provided) => (
                  <div
                    className="flex flex-col p-0 m-0"
                    ref={provided.innerRef}
                    {...provided.droppableProps}>
                    {Array.isArray(playlist) &&
                      playlist?.map((app, index) => (
                        <Draggable
                          key={app.id}
                          draggableId={app.id}
                          index={index}>
                          {(provided) => {
                            if (app.type === "image") {
                              return (
                                <UICard
                                  variant="outlined"
                                  className="p-4 flex flex-col sm:flex-row mb-4 items-end justify-between overflow-hidden gap-4"
                                  ref={provided.innerRef}
                                  {...provided.draggableProps}
                                  {...provided.dragHandleProps}>
                                  <div className="relative aspect-video rounded-lg w-full sm:w-60 bg-neutral-200 dark:bg-neutral-900">
                                    <Image
                                      src={app.details.file_url + "/tr:w-320"}
                                      fill
                                      className="rounded-lg"
                                      alt={app.id}
                                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                      priority={true}
                                      style={{
                                        objectFit: "cover",
                                        maxWidth: "100%",
                                      }}
                                    />
                                  </div>
                                  <div className="flex flex-row items-end justify-between sm:justify-end gap-2 w-full">
                                    <div>
                                      <InputTime
                                        duration={{
                                          minutes: app.duration.minutes,
                                          seconds: app.duration.seconds,
                                        }}
                                        result={(value: any) => {
                                          updateAppDuration(index, value);
                                        }}
                                      />
                                    </div>
                                    <div>{renderDeleteButton(app.id)}</div>
                                  </div>
                                </UICard>
                              );
                            }
                            if (app.type === "video") {
                              return (
                                <UICard
                                  variant="outlined"
                                  className="p-4 flex flex-col sm:flex-row mb-4 items-end justify-between overflow-hidden gap-4"
                                  ref={provided.innerRef}
                                  {...provided.draggableProps}
                                  {...provided.dragHandleProps}>
                                  <div className="relative aspect-video rounded-sm w-full sm:w-60 bg-neutral-200 dark:bg-neutral-900">
                                    <ReactPlayer
                                      url={app.details.url}
                                      width="100%"
                                      height="100%"
                                      config={{
                                        youtube: {
                                          playerVars: {
                                            showinfo: 0,
                                            controls: 0,
                                            disablekb: 0,
                                            fs: 0,
                                            iv_load_policy: 3,
                                            modestbranding: 1,
                                            rel: 0,
                                          },
                                        },
                                      }}
                                    />
                                  </div>
                                  <div className="flex flex-row items-end justify-between sm:justify-end gap-2 w-full">
                                    <div>
                                      <InputTime
                                        duration={{
                                          minutes: app.duration.minutes,
                                          seconds: app.duration.seconds,
                                        }}
                                        result={(value: any) => {
                                          updateAppDuration(index, value);
                                        }}
                                      />
                                    </div>
                                    <div>{renderDeleteButton(app.id)}</div>
                                  </div>
                                </UICard>
                              );
                            }
                          }}
                        </Draggable>
                      ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </DragDropContext>
          </div>
        </div>
      </>
    );
  };

  return loading ? <UIPageLoading /> : renderContent();
}
