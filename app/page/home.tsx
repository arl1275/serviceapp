import React from "react";
import { View, Button, StyleSheet, TouchableOpacity, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../_layout";
import { styles } from "../../assets/styles/styles";
import { Ionicons } from "@expo/vector-icons";

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, "home">;

export const Homepage: React.FC = () => {
  const navigation = useNavigation<HomeScreenNavigationProp>();

  return (
    <View style={{ height: "100%", flex: 1 }}>
      <Ionicons
        name="settings"
        size={25}
        color="grey"
        style={{ margin: 15 }}
        onPress={() => navigation.navigate("compania")}
      />

      <View
        style={{
          position: "absolute",
          flexDirection: "row",
          flexWrap: "wrap",
          justifyContent : 'space-around',
          bottom: 0,
          margin: 10,
          height: "60%",
          width: "100%",
        }}
      >
        <TouchableOpacity
          style={[
            styles.mainsecctionbutton,
            { margin: 0, backgroundColor: "white" },
          ]}
        >
          <Text
            style={[
              styles.bigtitle,
              { textAlign: "center", verticalAlign: "bottom", color: "black" },
            ]}
          >
            FACTURACION
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.mainsecctionbutton,
            { margin: 0, backgroundColor: "#a3e4d7" },
          ]}
          onPress={() => navigation.navigate("reporteria")}
        >
          <Text
            style={[styles.bigtitle, { textAlign: "center", color: "white" }]}
          >
            REPORTERIA
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate("registros")}
          style={[
            styles.mainsecctionbutton,
            { margin: 0, backgroundColor: "#b3e5fc" },
          ]}
        >
          <Text
            style={[styles.bigtitle, { textAlign: "center", color: "white" }]}
          >
            CLIENTES
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
