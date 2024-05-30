import React, { createContext, useEffect, useState } from "react";
import { getSelfData } from "../backendCommunication";

type AppProviderProps = {
  children: React.ReactNode;
};

type AppContextType = {
  token: string | null;
  updateToken: (newToken: string | null) => void;
};

const initialAppContext = {
  token: null,
  updateToken: () => {},
};

export const AppContext = createContext<AppContextType>(initialAppContext);

const AppProvider = ({ children }: AppProviderProps) => {
  const [token, setToken] = useState(localStorage.getItem("token"));

  const updateToken = (newToken: string | null) => {
    newToken
      ? localStorage.setItem("token", newToken)
      : localStorage.removeItem("token");
    newToken ? setToken(newToken) : setToken(null);
  };

  useEffect(() => {
    const checkValidToken = async () => {
      if (token) {
        try {
          await getSelfData(token);
        } catch {
          updateToken(null);
        }
      }
    };
    checkValidToken();
  }, [token]);

  return (
    <AppContext.Provider value={{ token, updateToken }}>
      {children}
    </AppContext.Provider>
  );
};

export default AppProvider;
