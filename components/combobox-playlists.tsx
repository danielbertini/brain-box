"use client";
import { useTranslations } from "next-intl";

import { useState } from "react";
import UIComboBox from "@/ui/comboBox";
import UIListBoxItem from "@/ui/listboxItem";

interface UiComboboxPlaylistsProps {
  playlists: any;
  playlist_id: string;
  selected_id: (id: string) => void;
}

const UiComboboxPlaylists: React.FC<UiComboboxPlaylistsProps> = ({
  playlists,
  playlist_id,
  selected_id,
}) => {
  const tForm = useTranslations("Form");
  const tPageDashboard = useTranslations("Page.Dashboard");
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");

  return (
    <UIComboBox
      aria-label="Workplaces"
      selectedKey={
        value
          ? value
          : (playlists?.find((item: any) => item?.id === playlist_id)
              ?.id as string)
      }
      onSelectionChange={(value) => {
        setValue(value as string);
        selected_id(value as string);
      }}>
      {playlists?.map((item: any) => {
        return (
          <UIListBoxItem
            key={item?.id}
            id={item?.id}
            value={item?.name}
            textValue={item?.name}>
            {item?.name}
          </UIListBoxItem>
        );
      })}
    </UIComboBox>
  );
};

export default UiComboboxPlaylists;
