 // frontend/src/components/AccessibleBadge.js
import React from "react";
import { View, Text } from "react-native";

export default function AccessibleBadge({ wheelchair, ramps, toilet }) {
  return (
    <View style={{ flexDirection: "row", gap: 8 }}>
      {wheelchair ? <Text>♿</Text> : null}
      {ramps ? <Text>🛗</Text> : null}
      {toilet ? <Text>🚻</Text> : null}
    </View>
  );
}