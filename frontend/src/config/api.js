 
// frontend/src/config/api.js
import axios from "axios";
import Constants from "expo-constants";

const API_BASE_URL =
  (Constants?.expoConfig?.extra?.API_BASE_URL) ||
  (Constants?.manifest?.extra?.API_BASE_URL) ||
  "http://localhost:5000";

export const api = axios.create({
  baseURL: `${API_BASE_URL}/api`,
  timeout: 10000,
});