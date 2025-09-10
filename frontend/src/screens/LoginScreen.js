// frontend/src/screens/LoginScreen.js
import React, { useContext, useState } from "react";
import { View, Text, TextInput, Button } from "react-native";
import { AuthContext } from "../context/AuthContext";

export default function LoginScreen() {
  const { login, signup } = useContext(AuthContext);
  const [mode, setMode] = useState("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [disability, setDisability] = useState("blind");

  return (
    <View style={{ flex: 1, padding: 16, gap: 12, justifyContent: "center" }}>
      <Text style={{ fontSize: 24, fontWeight: "600" }}>Accessi-Guide</Text>
      <TextInput placeholder="Email" value={email} onChangeText={setEmail} autoCapitalize="none" style={{ borderWidth: 1, padding: 8 }} />
      <TextInput placeholder="Password" value={password} onChangeText={setPassword} secureTextEntry style={{ borderWidth: 1, padding: 8 }} />
      {mode === "signup" ? (
        <>
          <Text>Disability Type (blind | deaf | mobility)</Text>
          <TextInput value={disability} onChangeText={setDisability} style={{ borderWidth: 1, padding: 8 }} />
          <Button title="Sign Up" onPress={() => signup(email, password, disability)} />
          <Button title="Have an account? Login" onPress={() => setMode("login")} />
        </>
      ) : (
        <>
          <Button title="Login" onPress={() => login(email, password)} />
          <Button title="No account? Sign up" onPress={() => setMode("signup")} />
        </>
      )}
    </View>
  );
}
