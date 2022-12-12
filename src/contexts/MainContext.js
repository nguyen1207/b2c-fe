import { createContext, useContext, useMemo, useState } from "react";

const MainContext = createContext();

export const MainProvider = ({ children }) => {
  const [profile, setProfile] = useState(null);

  const value = useMemo(() => {
    return {
      profile,
      setProfile,
    };
  }, [profile]);

  return <MainContext.Provider value={value}>{children}</MainContext.Provider>;
};

export const useMainContext = () => {
  return useContext(MainContext);
};
