import React, { useState, useEffect, useContext } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Platform,
} from "react-native";
import axios from "axios";
import { AppContext } from "../context/AppContext";

const HomeList = ({ navigation }) => {
  const { user } = useContext(AppContext);
  const [homes, setHomes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHomes = async () => {
      try {
        const response = await axios.get(
          Platform.OS === "android"
            ? "http://10.0.2.2:3000/homes"
            : "http://192.168.1.100:3000/homes"
        );
        setHomes(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch homes:", error);
        setLoading(false);
      }
    };

    fetchHomes();
  }, []);

  const navigateToDetails = (home) => {
    navigation.navigate("HomeDetails", { home });
  };

  if (loading) {
    return <Text>Loading...</Text>;
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={homes}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => navigateToDetails(item)}>
            <View style={styles.item}>
              <Text style={styles.title}>{item.address}</Text>
              <Text>{item.description}</Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  item: {
    backgroundColor: "#f9c2ff",
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 18,
  },
});

export default HomeList;
