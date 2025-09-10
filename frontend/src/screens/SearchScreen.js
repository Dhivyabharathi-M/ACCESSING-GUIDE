 // frontend/src/screens/SearchScreen.js
import React, { useState } from "react";
import { View, Text, TextInput, Button, FlatList } from "react-native";
import { api } from "../config/api";
import AccessibleBadge from "../components/AccessibleBadge";

export default function SearchScreen() {
  const [query, setQuery] = useState("");
  const [wheelchair, setWheelchair] = useState(true);
  const [ramps, setRamps] = useState(false);
  const [toilet, setToilet] = useState(false);
  const [results, setResults] = useState([]);

  const search = async () => {
    const { data } = await api.get("/places/search", {
      params: {
        query,
        wheelchair_access: wheelchair,
        ramps,
        accessible_toilet: toilet,
      },
    });
    setResults(data);
  };

  return (
    <View style={{ flex: 1, padding: 16, gap: 12 }}>
      <Text style={{ fontSize: 18, fontWeight: "600" }}>Accessible Places</Text>
      <TextInput placeholder="Search: hotels, restaurants..." value={query} onChangeText={setQuery} style={{ borderWidth: 1, padding: 8 }} />
      <View style={{ flexDirection: "row", gap: 8 }}>
        <Button title={`Wheelchair ${wheelchair ? "✓" : ""}`} onPress={() => setWheelchair(!wheelchair)} />
        <Button title={`Ramps ${ramps ? "✓" : ""}`} onPress={() => setRamps(!ramps)} />
        <Button title={`Toilet ${toilet ? "✓" : ""}`} onPress={() => setToilet(!toilet)} />
      </View>
      <Button title="Search" onPress={search} />
      <FlatList
        data={results}
        keyExtractor={(_, i) => String(i)}
        renderItem={({ item }) => (
          <View style={{ paddingVertical: 8, borderBottomWidth: 1, borderColor: "#eee" }}>
            <Text style={{ fontWeight: "600" }}>{item.name}</Text>
            <Text>{item.address}</Text>
            <AccessibleBadge wheelchair={item.wheelchair_access} ramps={item.ramps} toilet={item.accessible_toilet} />
          </View>
        )}
      />
    </View>
  );
}