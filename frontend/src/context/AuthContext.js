 // frontend/src/context/AuthContext.js
import React, { createContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { api } from "../config/api";

export const AuthContext = createContext({
  token: null,
  user: null,
  login: async () => {},
  signup: async () => {},
  logout: async () => {},
  refreshMe: async () => {},
});

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    (async () => {
      const t = await AsyncStorage.getItem("token");
      const u = await AsyncStorage.getItem("user");
      if (t) setToken(t);
      if (u) setUser(JSON.parse(u));
      if (t) api.defaults.headers.common.Authorization = `Bearer ${t}`;
    })();
  }, []);

  const login = async (email, password) => {
    const { data } = await api.post("/auth/login", { email, password });
    setToken(data.token);
    setUser(data.user);
    api.defaults.headers.common.Authorization = `Bearer ${data.token}`;
    await AsyncStorage.setItem("token", data.token);
    await AsyncStorage.setItem("user", JSON.stringify(data.user));
  };

  const signup = async (email, password, disability_type) => {
    const { data } = await api.post("/auth/signup", { email, password, disability_type });
    setToken(data.token);
    setUser(data.user);
    api.defaults.headers.common.Authorization = `Bearer ${data.token}`;
    await AsyncStorage.setItem("token", data.token);
    await AsyncStorage.setItem("user", JSON.stringify(data.user));
  };

  const logout = async () => {
    setToken(null);
    setUser(null);
    delete api.defaults.headers.common.Authorization;
    await AsyncStorage.removeItem("token");
    await AsyncStorage.removeItem("user");
  };

  const refreshMe = async () => {
    if (!token) return;
    const { data } = await api.get("/auth/me");
    setUser(data);
    await AsyncStorage.setItem("user", JSON.stringify(data));
  };

  return (
    <AuthContext.Provider value={{ token, user, login, signup, logout, refreshMe }}>
      {children}
    </AuthContext.Provider>
  );
};