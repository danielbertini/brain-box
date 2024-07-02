"use client";

import { minToMill } from "@/lib/utils";
import Image from "next/image";
import { useEffect, useState } from "react";
import ReactPlayer from "react-player";

interface Props {
  playlist: any[];
}

const UiPlayer: React.FC<Props> = ({ playlist }) => {
  const [current, setCurrent] = useState<number>(0);

  const renderImage = (item: any, index: number) => {
    return (
      <div className="w-full aspect-auto relative flex-none">
        <Image
          className="w-full object-cover rounded-md"
          src={item.details.file_url + "/tr:w-640"}
          alt={item.details.file_url}
          fill
          priority={true}
          sizes="100vw"
        />
      </div>
    );
  };

  const renderVideo = (item: any, index: number) => {
    return (
      <div className="w-full aspect-auto relative flex-none">
        <ReactPlayer
          className="react-player-background"
          url={item.details.url}
          width="100%"
          height="100%"
          playsinline
          controls={false}
          playing={true}
          loop={true}
          muted={true}
          volume={0}
          config={{
            youtube: {
              playerVars: {
                showinfo: 0,
                controls: 0,
                modestbranding: 0,
                loop: 1,
              },
            },
          }}
        />
      </div>
    );
  };

  useEffect(() => {
    if (playlist.length === 0) return;
    const interval = setInterval(() => {
      setCurrent((current) =>
        current === playlist.length - 1 ? 0 : current + 1
      );
    }, minToMill(playlist[current].duration.minutes, playlist[current].duration.seconds));
    return () => clearInterval(interval);
  }, [current, playlist]);

  return (
    <>
      {playlist.length > 1 && (
        <div className="w-full h-full aspect-image relative flex overflow-hidden">
          {playlist[current].type === "video"
            ? renderVideo(playlist[current], current)
            : renderImage(playlist[current], current)}
        </div>
      )}
    </>
  );
};

export default UiPlayer;
