import { ReactNode, Suspense } from "react";
import { HeaderAuthenticated } from "@/components/header-authenticated";
import UIPageLoading from "@/ui/pageLoading";

type Props = {
  children: ReactNode;
  params: { locale: string };
};

export default async function RootLayout({
  children,
  params: { locale },
}: any) {
  return (
    <>
      <HeaderAuthenticated />
      <div className="h-16 w-full"> </div>
      <div className="w-full px-4">
        <div className="container mx-auto px-0 pb-20">
          <Suspense fallback={<UIPageLoading />}>{children}</Suspense>
        </div>
      </div>
    </>
  );
}
