// frontend/src/screens/NavigationScreen.js
import React, { useContext, useEffect, useRef, useState } from "react";
import { View, Text, TextInput, Button, Vibration } from "react-native";
import MapView, { Polyline, Marker } from "react-native-maps";
import * as Location from "expo-location";
import * as Speech from "expo-speech";
import { DisabilityContext } from "../context/DisabilityContext";
import { api } from "../config/api";

export default function NavigationScreen() {
  const { isBlind, isDeaf, isMobility } = useContext(DisabilityContext);
  const mapRef = useRef(null);
  const [origin, setOrigin] = useState("");
  const [destination, setDestination] = useState("");
  const [polyline, setPolyline] = useState(null);
  const [region, setRegion] = useState(null);

  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status === "granted") {
        const loc = await Location.getCurrentPositionAsync({});
        setRegion({
          latitude: loc.coords.latitude,
          longitude: loc.coords.longitude,
          latitudeDelta: 0.05,
          longitudeDelta: 0.05,
        });
      }
    })();
  }, []);

  const guide = (message) => {
    if (isBlind) {
      Speech.speak(message, { language: "en" });
    }
    if (isDeaf) {
      Vibration.vibrate(300);
    }
  };

  const getRoute = async () => {
    const wheelchair = isMobility ? "true" : "false";
    const { data } = await api.get("/navigation/route", {
      params: { origin, destination, wheelchair }
    });
    setPolyline(data.polyline);
    guide("Route has been updated.");
  };

  return (
    <View style={{ flex: 1 }}>
      <View style={{ padding: 12, gap: 8 }}>
        <TextInput placeholder="Origin (lat,lng or address)" value={origin} onChangeText={setOrigin} style={{ borderWidth: 1, padding: 8 }} />
        <TextInput placeholder="Destination (lat,lng or address)" value={destination} onChangeText={setDestination} style={{ borderWidth: 1, padding: 8 }} />
        <Button title="Get Route" onPress={getRoute} />
      </View>
      <MapView ref={mapRef} style={{ flex: 1 }} initialRegion={region} region={region}>
        {region ? <Marker coordinate={{ latitude: region.latitude, longitude: region.longitude }} title="You" /> : null}
        {polyline ? <Polyline coordinates={decodePolyline(polyline)} strokeColor="#1976d2" strokeWidth={4} /> : null}
      </MapView>
    </View>
  );
}

// Polyline decoder (Google)
function decodePolyline(encoded) {
  if (!encoded) return [];
  let index = 0, lat = 0, lng = 0, coordinates = [];
  while (index < encoded.length) {
    let b, shift = 0, result = 0;
    do { b = encoded.charCodeAt(index++) - 63; result |= (b & 0x1f) << shift; shift += 5; } while (b >= 0x20);
    const deltaLat = (result & 1) ? ~(result >> 1) : (result >> 1);
    lat += deltaLat;
    shift = 0; result = 0;
    do { b = encoded.charCodeAt(index++) - 63; result |= (b & 0x1f) << shift; shift += 5; } while (b >= 0x20);
    const deltaLng = (result & 1) ? ~(result >> 1) : (result >> 1);
    lng += deltaLng;
    coordinates.push({ latitude: lat / 1e5, longitude: lng / 1e5 });
  }
  return coordinates;
}