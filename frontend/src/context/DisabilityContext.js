 // frontend/src/context/DisabilityContext.js
import React, { createContext, useContext, useMemo } from "react";
import { AuthContext } from "./AuthContext";

export const DisabilityContext = createContext({ type: null, isBlind: false, isDeaf: false, isMobility: false });

export const DisabilityProvider = ({ children }) => {
  const { user } = useContext(AuthContext);
  const value = useMemo(() => {
    const type = user?.disability_type || null;
    return {
      type,
      isBlind: type === "blind",
      isDeaf: type === "deaf",
      isMobility: type === "mobility",
    };
  }, [user]);
  return <DisabilityContext.Provider value={value}>{children}</DisabilityContext.Provider>;
};