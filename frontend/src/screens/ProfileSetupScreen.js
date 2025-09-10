 // frontend/src/screens/ProfileSetupScreen.js
import React, { useContext, useState } from "react";
import { View, Text, TextInput, Button } from "react-native";
import { AuthContext } from "../context/AuthContext";
import { api } from "../config/api";

export default function ProfileSetupScreen() {
  const { refreshMe } = useContext(AuthContext);
  const [disability, setDisability] = useState("blind");

  const save = async () => {
    await api.put("/auth/me", { disability_type: disability });
    await refreshMe();
  };

  return (
    <View style={{ flex: 1, padding: 16, gap: 12 }}>
      <Text style={{ fontSize: 18, fontWeight: "600" }}>Tell us your accessibility needs</Text>
      <Text>Disability Type (blind | deaf | mobility)</Text>
      <TextInput value={disability} onChangeText={setDisability} style={{ borderWidth: 1, padding: 8 }} />
      <Button title="Save" onPress={save} />
    </View>
  );
}