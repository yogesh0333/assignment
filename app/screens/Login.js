import React, { useState, useContext, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  Alert,
  StyleSheet,
  Platform,
} from "react-native";
import axios from "axios";
import { AppContext } from "../context/AppContext";

const Login = ({ navigation }) => {
  const { setUser } = useContext(AppContext);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const baseURL =
    Platform.OS === "android"
      ? "http://10.0.2.2:3000/users"
      : "http://192.168.1.100:3000/users";

  const handleLogin = () => {
    axios
      .get(baseURL)
      .then((response) => {
        const user = response.data.find(
          (u) => u.username === username && u.password === password
        );
        if (user) {
          setUser(user);
          navigation.navigate("HomeList");
        } else {
          Alert.alert("Error", "Invalid username or password.");
        }
      })
      .catch((error) => {
        console.log("error", error);
        Alert.alert("Error", "Failed to login.");
      });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <TextInput
        style={styles.input}
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <View style={styles.buttonContainer}>
        <Button title="Login" onPress={handleLogin} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 20,
    backgroundColor: "#f5f5f5",
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: "center",
  },
  input: {
    height: 50,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 15,
    paddingHorizontal: 10,
    backgroundColor: "#fff",
  },
  buttonContainer: {
    marginTop: 10,
  },
});

export default Login;
