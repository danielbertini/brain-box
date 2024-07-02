import { nanoid } from "nanoid";

export interface iApps {
  id: string;
  name: string;
  type: string;
}

export interface iAppsList {
  id: string;
  type: string;
  position: number;
  details: any;
  duration: {
    minutes: string;
    seconds: string;
  };
}

export const Apps: iApps[] = [
  {
    id: nanoid(),
    name: "Image",
    type: "image",
  },
  {
    id: nanoid(),
    name: "Video",
    type: "video",
  },
];
