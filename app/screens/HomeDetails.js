import React, { useState, useEffect } from "react";
import { View, Text, Image, Button, Alert } from "react-native";
import Geolocation from "react-native-geolocation-service";
import axios from "axios";
import * as Location from "expo-location";

const HomeDetails = ({ route }) => {
  const { home } = route.params;
  const [location, setLocation] = useState(null);
  const [isNear, setIsNear] = useState(false);
  const [locationError, setLocationError] = useState(null);

  useEffect(() => {
    const requestLocationPermission = async () => {
      try {
        const { status } = await Location.requestForegroundPermissionsAsync();

        if (status !== "granted") {
          setLocationError("Permission to access location was denied");
          return;
        }

        fetchLocation();
      } catch (error) {
        console.error(error);
        setLocationError("Failed to request location permission.");
      }
    };

    const fetchLocation = async () => {
      try {
        const location = await Location.getCurrentPositionAsync({
          accuracy: Location.Accuracy.High,
        });

        setLocation(location.coords);
        const distance = calculateDistance(
          location.coords.latitude,
          location.coords.longitude,
          home.latitude,
          home.longitude
        );
        setIsNear(distance <= 30);
      } catch (error) {
        console.error(error);
        setLocationError("Failed to get current location.");
      }
    };

    requestLocationPermission();
  }, []);

  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const toRad = (value) => (value * Math.PI) / 180;
    const R = 6371; // km
    const dLat = toRad(lat2 - lat1);
    const dLon = toRad(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(toRad(lat1)) *
        Math.cos(toRad(lat2)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const d = R * c;
    return d * 1000; // meters
  };

  const unlockHome = () => {
    axios
      .post("http://localhost:3000/unlock", { homeId: home.id })
      .then((response) => {
        Alert.alert("Success", response.data.message);
      })
      .catch((error) => {
        Alert.alert("Error", "Failed to unlock home.");
      });
  };

  if (locationError) {
    return <Text>Error: {locationError}</Text>;
  }

  return (
    <View>
      <Image
        source={{ uri: home.image }}
        style={{ height: 200, width: "100%" }}
      />
      <Text>{home.address}</Text>
      <Text>{home.description}</Text>
      {isNear && <Button title="Unlock" onPress={unlockHome} />}
    </View>
  );
};

export default HomeDetails;
