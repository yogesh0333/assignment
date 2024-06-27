import React, { createContext, useState } from "react";

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [homes, setHomes] = useState([]);

  return (
    <AppContext.Provider value={{ user, setUser, homes, setHomes }}>
      {children}
    </AppContext.Provider>
  );
};
