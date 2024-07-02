"use client";
import { useLocale } from "next-intl";

import { useState, useEffect, useCallback, useContext } from "react";
import { toast } from "sonner";
import createSupabaseClient from "@/lib/supabase-client";
import { AppDispatchContext } from "@/app/providers/app-context";
import UIComboBox from "@/ui/comboBox";
import UIListBoxItem from "@/ui/listboxItem";

interface UiComboboxWorkplacesProps {}

const UiComboboxWorkplaces: React.FC<UiComboboxWorkplacesProps> = ({}) => {
  const locale = useLocale();
  const setAppDetails = useContext(AppDispatchContext);

  const [value, setValue] = useState("");
  const [loading, setLoading] = useState(true);
  const [workplaces, setWorkplaces] = useState<any>([]);

  const getWorkplaces = useCallback(async () => {
    setLoading(true);
    setValue("");
    setWorkplaces([]);
    const response = await fetch("/api/workplaces/list?page=0&limit=30", {
      method: "GET",
      headers: { "Accept-Language": locale },
    });

    const data = await response.json();

    if (response.status === 200) {
      data?.forEach((item: any) => {
        setWorkplaces((prev: any) => [
          ...prev,
          { value: item?.id, label: item?.name, main: item?.main },
        ]);
        if (item?.main) setValue(item?.id);
      });
    } else {
      toast.error(data.message);
    }
    setLoading(false);
  }, [locale]);

  const workplacesObserver = useCallback(async () => {
    const supabase = await createSupabaseClient();
    const { data: dataSession, error: errorSession } =
      await supabase.auth.getUser();

    const channels = supabase
      .channel("custom-filter-channel")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "workplaces",
          filter: `user_id=eq.${dataSession?.user?.id}`,
        },
        (payload) => {
          getWorkplaces();
        }
      )
      .subscribe();
  }, [getWorkplaces]);

  useEffect(() => {
    getWorkplaces();
  }, [getWorkplaces]);

  useEffect(() => {
    workplacesObserver();
  }, [workplacesObserver]);

  useEffect(() => {
    if (value && setAppDetails) {
      setAppDetails((prev: any) => {
        return { ...prev, workplace_id: value };
      });
    }
  }, [setAppDetails, value]);

  return (
    <>
      <UIComboBox
        aria-label="Workplaces"
        isLoading={loading}
        selectedKey={
          value
            ? value
            : (workplaces?.find((item: any) => item?.main === true)
                ?.value as string)
        }
        onSelectionChange={(value) => {
          setValue(value as string);
        }}>
        {workplaces?.map((item: any) => {
          return (
            <UIListBoxItem
              key={item?.value}
              id={item?.value}
              value={item?.value}
              textValue={item?.label}>
              {item?.label}
            </UIListBoxItem>
          );
        })}
      </UIComboBox>
    </>
  );
};

export default UiComboboxWorkplaces;
