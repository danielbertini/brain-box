"use client";

import {
  createContext,
  useState,
  ReactNode,
  Dispatch,
  SetStateAction,
} from "react";

interface AppDetails {
  workplace_id: string;
}

interface ProviderProps<T> {
  children?: ReactNode;
}

const AppContext = createContext<AppDetails | undefined>(undefined);
const AppDispatchContext = createContext<
  Dispatch<SetStateAction<AppDetails>> | undefined
>(undefined);

function AppProvider({ children }: ProviderProps<ReactNode>) {
  const [appDetails, setAppDetails] = useState<AppDetails>({
    workplace_id: "",
  });

  return (
    <AppContext.Provider value={appDetails}>
      <AppDispatchContext.Provider value={setAppDetails}>
        {children}
      </AppDispatchContext.Provider>
    </AppContext.Provider>
  );
}

export { AppProvider, AppContext, AppDispatchContext };
