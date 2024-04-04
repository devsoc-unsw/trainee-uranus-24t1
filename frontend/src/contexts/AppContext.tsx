import React, { createContext } from "react";

type AppProviderProps = {
  children: React.ReactNode;
};

type AppContextType = {
  // userId: number | OnBeforeUnloadEventHandlerNonNull;
};

const AppContext = createContext<AppContextType>({});

const AppProvider = ({ children }: AppProviderProps) => {
  return <AppContext.Provider value={{}}>{children}</AppContext.Provider>;
};

export default AppProvider;
