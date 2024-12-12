import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { ReporteriaPage } from "./page/reporteria";
import { Homepage } from "./page/home";
import { RegistrosPage } from "./page/registers";
import { ServiceSheetDetail } from "./subpages/DetailServiceSheets";
import { ServiceSheet } from "./storage/sheetservice";
import { CompanyPage } from "./subpages/company";

export type RootStackParamList = {
  home: undefined;
  registros: undefined;
  reporteria: undefined;
  compania: undefined;
  details: { itemId: number };
};

export type DetailStackParamList = {
  homedetail: undefined;
  detailpage: { _data_: ServiceSheet };
  details: { itemId: number };
};

const Stack = createStackNavigator<RootStackParamList>();
const DetaildataStack = createStackNavigator<DetailStackParamList>();

export default function RootLayout() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: "white" },
        headerTintColor: "black",
        headerTitleStyle: { fontWeight: "bold" },
      }}
    >
      <Stack.Screen
        name="home"
        component={Homepage}
        options={{ title: "Inicio", headerShown: false }}
      />
      <Stack.Screen
        name="registros"
        component={RegistrosPage}
        options={{
          title: "CLIENTES",
          headerShown: true,
          headerPressColor: "blue",
          headerStyle: { backgroundColor: "white" },
          headerTintColor: "grey",
          headerTitleStyle: { fontSize: 17 },
        }}
      />
      <Stack.Screen
        name="reporteria"
        component={DetailLayout}
        options={{
          title: "REPORTERIA",
          headerShown: false,
          headerPressColor: "blue",
          headerStyle: { backgroundColor: "white" },
          headerTintColor: "grey",
          headerTitleStyle: { fontSize: 17 },
        }}
      />

      <Stack.Screen
        name="compania"
        component={CompanyPage}
        options={{
          title: "EMPRESA",
          headerShown: true,
          headerPressColor: "blue",
          headerStyle: { backgroundColor: "white" },
          headerTintColor: "grey",
          headerTitleStyle: { fontSize: 17 },
        }}
      />
    </Stack.Navigator>
  );
}

export function DetailLayout() {
  return (
    <DetaildataStack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: "white" },
        headerTintColor: "black",
        headerTitleStyle: { fontWeight: "bold" },
      }}
    >
      <DetaildataStack.Screen
        name="homedetail"
        component={ReporteriaPage}
        options={{
          title: "REPORTERIA",
          headerShown: true,
          headerPressColor: "blue",
          headerStyle: { backgroundColor: "white" },
          headerTintColor: "grey",
          headerTitleStyle: { fontSize: 17 },
        }}
      />
      <DetaildataStack.Screen
        name="detailpage"
        component={ServiceSheetDetail}
        options={{
          title: "DETALLE",
          headerShown: true,
          headerPressColor: "blue",
          headerStyle: { backgroundColor: "white" },
          headerTintColor: "grey",
          headerTitleStyle: { fontSize: 17 },
        }}
      />
    </DetaildataStack.Navigator>
  );
}
