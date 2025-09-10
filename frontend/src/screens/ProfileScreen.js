// frontend/src/screens/ProfileScreen.js
import React, { useContext, useEffect } from "react";
import { View, Text, Button } from "react-native";
import { AuthContext } from "../context/AuthContext";

export default function ProfileScreen() {
  const { user, refreshMe, logout } = useContext(AuthContext);

  useEffect(() => { refreshMe(); }, []);

  return (
    <View style={{ flex: 1, padding: 16, gap: 12 }}>
      <Text style={{ fontSize: 18, fontWeight: "600" }}>Profile</Text>
      <Text>Email: {user?.email}</Text>
      <Text>Disability: {user?.disability_type || "-"}</Text>
      <Button title="Logout" onPress={logout} />
    </View>
  );
}