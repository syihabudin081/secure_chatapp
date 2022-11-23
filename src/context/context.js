import React, { createContext, useState } from "react";

export const GlobalContext = createContext();

export const GlobalProvider = (props) => {
  const [user, setUser] = useState();
  return (
    <GlobalContext.Provider
      value={{
        user,
        setUser,
      }}
    >
      {props.children}
    </GlobalContext.Provider>
  );
};
