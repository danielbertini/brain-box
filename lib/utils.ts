import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function reorder(list: any[], startIndex: number, endIndex: number) {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);
  return result;
}

export function minToMill(minutes: number, seconds: number) {
  return (minutes * 60 + seconds) * 1000;
}

export function totalPlaylistTime(playlist: any[]) {
  let minutes = 0;
  let seconds = 0;
  playlist.forEach((item) => {
    minutes += item.duration.minutes;
    seconds += item.duration.seconds;
  });

  const mil = minToMill(minutes, seconds);
  const date = new Date(mil);
  const totalMinutes = date.getMinutes().toFixed();
  const totalSeconds = date.getSeconds().toFixed();

  const formattedMinutes = totalMinutes.padStart(2, "0");
  const formattedSeconds = totalSeconds.padStart(2, "0");

  return `${formattedMinutes}:${formattedSeconds}`;
}
