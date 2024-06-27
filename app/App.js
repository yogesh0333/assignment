import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { AppProvider } from "./context/AppContext";
import HomeList from "./screens/HomeList";
import HomeDetails from "./screens/HomeDetails";
import Login from "./screens/Login";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <AppProvider>
      <NavigationContainer independent={true}>
        <Stack.Navigator initialRouteName="Login">
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="HomeList" component={HomeList} />
          <Stack.Screen name="HomeDetails" component={HomeDetails} />
        </Stack.Navigator>
      </NavigationContainer>
    </AppProvider>
  );
}
