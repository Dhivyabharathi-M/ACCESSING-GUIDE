 // frontend/src/navigation/HomeTabs.js
import React, { useContext } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import LoginScreen from "../screens/LoginScreen";
import ProfileSetupScreen from "../screens/ProfileSetupScreen";
import BookingScreen from "../screens/BookingScreen";
import SearchScreen from "../screens/SearchScreen";
import NavigationScreen from "../screens/NavigationScreen";
import ProfileScreen from "../screens/ProfileScreen";
import { AuthContext } from "../context/AuthContext";

const Tab = createBottomTabNavigator();

export default function HomeTabs() {
  const { token, user } = useContext(AuthContext);

  if (!token) {
    return (
      <Tab.Navigator screenOptions={{ headerShown: false }}>
        <Tab.Screen name="Login" component={LoginScreen} />
      </Tab.Navigator>
    );
  }

  const needsSetup = !user?.disability_type;

  if (needsSetup) {
    return (
      <Tab.Navigator screenOptions={{ headerShown: false }}>
        <Tab.Screen name="ProfileSetup" component={ProfileSetupScreen} options={{ title: "Profile Setup" }} />
      </Tab.Navigator>
    );
  }

  return (
    <Tab.Navigator>
      <Tab.Screen name="Book Van" component={BookingScreen} />
      <Tab.Screen name="Search Places" component={SearchScreen} />
      <Tab.Screen name="Navigate" component={NavigationScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}
