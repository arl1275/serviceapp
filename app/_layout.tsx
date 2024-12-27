import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { ReporteriaPage } from "./page/reporteria";
import { Homepage } from "./page/home";
import { RegistrosPage } from "./page/registers";
import { ServiceSheetDetail } from "./subpages/DetailServiceSheets";
import { ServiceSheet } from "./storage/sheetservice";
import { CompanyPage } from "./subpages/company";
import { FacturasPage } from "./page/Facturas";
import { CrearFacturaSubPage } from "./subpages/CrearFactura";
import { EditCompanySubPage } from "./subpages/editCompanySubpage";
import { Company } from "./storage/company";

export type RootStackParamList = {
  home: undefined;
  registros: undefined;
  reporteria: undefined;
  compania: undefined;
  facturas: undefined;
  details: { itemId: number };
};

export type DetailStackParamList = {
  homedetail: undefined;
  detailpage: { _data_: ServiceSheet };
  details: { itemId: number };
};

export type FacturasParamList = {
  homeFactura: undefined;
  CrearFActura: undefined;
  details: { itemId: number };
};

export type CompaniesParamList = {
  homeCompany: undefined;
  EditCopany: {_data_ : Company};
  details: { itemId: number };
};

const Stack = createStackNavigator<RootStackParamList>();
const DetaildataStack = createStackNavigator<DetailStackParamList>();
const FacturasStack = createStackNavigator<FacturasParamList>();
const CompaniesStack = createStackNavigator<CompaniesParamList>();

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
        name="facturas"
        component={FacturasLayout}
        options={{
          title: "Factura",
          headerShown: false,
          headerPressColor: "blue",
          headerStyle: { backgroundColor: "white" },
          headerTintColor: "grey",
          headerTitleStyle: { fontSize: 17 },
        }}
      />

      <Stack.Screen
        name="compania"
        component={CompaniesLayout}
        options={{
          title: "EMPRESA",
          headerShown: false,
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

export function FacturasLayout() {
  return (
    <FacturasStack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: "white" },
        headerTintColor: "black",
        headerTitleStyle: { fontWeight: "bold" },
      }}
    >
      <FacturasStack.Screen
        name="homeFactura"
        component={FacturasPage}
        options={{
          title: "FACTURAS",
          headerShown: true,
          headerPressColor: "blue",
          headerStyle: { backgroundColor: "white" },
          headerTintColor: "grey",
          headerTitleStyle: { fontSize: 17 },
        }}
      />
      <FacturasStack.Screen
        name="CrearFActura"
        component={CrearFacturaSubPage}
        options={{
          title: "CREAR FACTURA",
          headerShown: true,
          headerPressColor: "blue",
          headerStyle: { backgroundColor: "white" },
          headerTintColor: "grey",
          headerTitleStyle: { fontSize: 17 },
        }}
      />
    </FacturasStack.Navigator>
  );
}

export function CompaniesLayout(){
  return (
    <CompaniesStack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: "white" },
        headerTintColor: "black",
        headerTitleStyle: { fontWeight: "bold" },
      }}
    >
      <CompaniesStack.Screen
        name="homeCompany"
        component={CompanyPage}
        options={{
          title: "EMPRESAS",
          headerShown: true,
          headerPressColor: "blue",
          headerStyle: { backgroundColor: "white" },
          headerTintColor: "grey",
          headerTitleStyle: { fontSize: 17 },
        }}
      />
      <CompaniesStack.Screen
        name="EditCopany"
        component={EditCompanySubPage}
        options={{
          title: "EDITAR",
          headerShown: true,
          headerPressColor: "blue",
          headerStyle: { backgroundColor: "white" },
          headerTintColor: "grey",
          headerTitleStyle: { fontSize: 17 },
        }}
      />
    </CompaniesStack.Navigator>
  );
}