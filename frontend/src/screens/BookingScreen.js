 // frontend/src/screens/BookingScreen.js
import React, { useState } from "react";
import { View, Text, TextInput, Button, TouchableOpacity } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { api } from "../config/api";

export default function BookingScreen() {
  const [pickup, setPickup] = useState("");
  const [dropoff, setDropoff] = useState("");
  const [date, setDate] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);
  const [returnTrip, setReturnTrip] = useState(false);
  const [entryType, setEntryType] = useState("side");

  const submit = async () => {
    await api.post("/bookings/", {
      pickup,
      dropoff,
      datetime: date.toISOString(),
      return_trip: returnTrip,
      entry_type: entryType,
    });
    alert("Booking created!");
  };

  return (
    <View style={{ flex: 1, padding: 16, gap: 12 }}>
      <Text style={{ fontSize: 18, fontWeight: "600" }}>Book Accessible Van</Text>
      <TextInput placeholder="Pickup" value={pickup} onChangeText={setPickup} style={{ borderWidth: 1, padding: 8 }} />
      <TextInput placeholder="Drop-off" value={dropoff} onChangeText={setDropoff} style={{ borderWidth: 1, padding: 8 }} />
      <TouchableOpacity onPress={() => setShowPicker(true)} style={{ padding: 8, borderWidth: 1 }}>
        <Text>Select Date/Time: {date.toLocaleString()}</Text>
      </TouchableOpacity>
      {showPicker && <DateTimePicker value={date} onChange={(_, d) => { setShowPicker(false); if (d) setDate(d); }} />}
      <View style={{ flexDirection: "row", gap: 16, alignItems: "center" }}>
        <Text>Return Trip</Text>
        <Button title={returnTrip ? "Yes" : "No"} onPress={() => setReturnTrip(!returnTrip)} />
      </View>
      <Text>Vehicle Entry</Text>
      <View style={{ flexDirection: "row", gap: 12 }}>
        <Button title={`Side Entry ${entryType === "side" ? "✓" : ""}`} onPress={() => setEntryType("side")} />
        <Button title={`Rear Entry ${entryType === "rear" ? "✓" : ""}`} onPress={() => setEntryType("rear")} />
      </View>
      <Button title="Submit" onPress={submit} />
    </View>
  );
}