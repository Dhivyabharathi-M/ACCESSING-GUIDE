// frontend/App.js
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import HomeTabs from "./src/navigation/HomeTabs";
import { AuthProvider } from "./src/context/AuthContext";
import { DisabilityProvider } from "./src/context/DisabilityContext";

export default function App() {
  return (
    <AuthProvider>
      <DisabilityProvider>
        <NavigationContainer>
          <HomeTabs />
        </NavigationContainer>
      </DisabilityProvider>
    </AuthProvider>
  );
}