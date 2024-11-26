import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import { View, Text } from "react-native";
import { Homepage } from "./page/home";
import { RegistrosPage } from "./page/registers";

// Define los parámetros de navegación
export type RootStackParamList = {
  home: undefined;
  registros : undefined;
  details: { itemId: number };
};

const Stack = createStackNavigator<RootStackParamList>();

export default function RootLayout() {
  return (
      <Stack.Navigator
        screenOptions={{
          headerStyle: { backgroundColor: "white" },
          headerTintColor: "black",
          headerTitleStyle: { fontWeight: "bold" },
        }}
      >
        <Stack.Screen name="home" component={Homepage} options={{title: "Inicio", headerShown: false}} />
        <Stack.Screen name="registros" component={RegistrosPage} options={{title: "REGISTROS", headerShown: true}} />
      </Stack.Navigator>
  );
}
