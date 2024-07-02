"use client";
import useSWRInfinite from "swr/infinite";
import InfiniteScroll from "react-infinite-scroll-component";
import { useTranslations } from "next-intl";
import { useContext, useEffect, useState } from "react";
import UiPageTitle from "@/components/page-title";
import WorkplacesListItem from "./components/list-item";
import { Search, X } from "lucide-react";
import { useMediaQuery } from "@/lib/mediaquery";
import UIButton from "@/ui/button";
import UITextField from "@/ui/textField";
import ScreensAddDialog from "./components/add-dialog";
import { AppContext } from "@/app/providers/app-context";
import UIPageLoading from "@/ui/pageLoading";

type Props = {
  params: { locale: string };
};

export default function ScreensPage({ params: { locale } }: Props) {
  const limit = 30;
  const tForm = useTranslations("Form");
  const tPageDashboard = useTranslations("Page.Dashboard");
  const isMobile = useMediaQuery("(max-width: 640px)");
  const appDetails = useContext(AppContext);

  const [searchQueryChange, setSearchQueryChange] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [list, setList] = useState([]);
  const [playlists, setPlaylists] = useState([]);

  const fetcher = (url: any) =>
    fetch(url, {
      method: "GET",
      headers: { "Accept-Language": locale },
    }).then((res) => res.json());

  const { data, mutate, size, setSize, isValidating, isLoading }: any =
    useSWRInfinite(
      (index) =>
        `/api/screens/list?page=${index}&limit=${limit}&search=${searchQuery}&workplace_id=${appDetails?.workplace_id}`,
      fetcher
    );

  const isReachingEnd = list && list.length - 1 < limit;

  useEffect(() => {
    if (!data) return;
    setList(data[0]["data"]);
    setPlaylists(data[0]["playlists"]);
  }, [data]);

  const renderHeader = () => {
    return (
      <>
        <UiPageTitle
          title={tPageDashboard("Menu.Screens")}
          className="mt-8 mb-2"
        />
        <div className="flex flex-row gap-2 w-full items-center justify-between mb-4">
          <div className="flex items-center justify-start flex-1">
            <div className="w-full sm:w-auto">
              <UITextField
                type="email"
                autoComplete="off"
                className="rounded-r-none"
                placeHolder={`${tForm("Search")}...`}
                value={searchQueryChange}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    setSearchQuery(searchQueryChange);
                    mutate();
                  }
                }}
                onChange={(value) => {
                  setSearchQueryChange(value);
                  if (value.length === 0) setSearchQuery(value);
                }}
              />
            </div>
            {searchQueryChange.length > 0 && (
              <UIButton
                className="rounded-l-none rounded-r-none"
                variant="flat"
                sizeType="icon"
                onPress={() => {
                  setSearchQueryChange("");
                  setSearchQuery("");
                  mutate();
                }}>
                <X className="h-6 w-6" />
              </UIButton>
            )}
            <UIButton
              className="rounded-l-none"
              variant="flat"
              sizeType={isMobile ? "icon" : "default"}
              isDisabled={searchQueryChange.length < 2}
              onPress={() => {
                setSearchQuery(searchQueryChange);
                mutate();
              }}>
              <Search className="h-6 w-6" />
              {!isMobile && tForm("Search")}
            </UIButton>
          </div>
          <div>
            <ScreensAddDialog mutate={mutate} />
          </div>
        </div>
      </>
    );
  };

  const renderList = () => {
    return (
      <InfiniteScroll
        dataLength={data?.length || 0}
        next={() => {
          setSize(size + 1);
        }}
        hasMore={isReachingEnd ? false : true}
        loader={isLoading || isValidating ? <UIPageLoading /> : null}
        scrollableTarget="stage"
        style={{
          overflow: "initial",
        }}>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 my-4">
          {Array.isArray(list) &&
            list?.map((item: any, index: number) => (
              <WorkplacesListItem
                playlists={playlists}
                key={index}
                item={item}
                mutate={mutate}
              />
            ))}
        </div>
      </InfiniteScroll>
    );
  };

  return (
    <>
      {renderHeader()}
      {renderList()}
    </>
  );
}
