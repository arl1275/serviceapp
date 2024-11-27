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
    <View style={{height : '100%'}}>
    <Ionicons name="settings" size={25} color="grey" style={{ margin: 15 }} />

      <View style={{ position: "absolute", bottom: 10, margin : 10 }}>
      <TouchableOpacity
          style={[styles.headsheet, { margin: 0, backgroundColor: "white" }]}
        >
          <Text
            style={[styles.bigtitle, { textAlign: "center", color: "black" }]}
          >
            FACTURACION
          </Text>
        </TouchableOpacity>
      <TouchableOpacity  style={[styles.headsheet, { margin: 0, backgroundColor: "#a3e4d7" }]} >
          <Text  style={[styles.bigtitle, { textAlign: "center", color: "white" }]}>
            REPORTERIA
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate("registros")}
          style={[styles.headsheet, { margin: 0, backgroundColor: "#b3e5fc" }]}
        >
          <Text style={[styles.bigtitle, { textAlign: "center", color: "white" }]} >
            CLIENTES
          </Text>
        </TouchableOpacity>
       
      </View>
     
    </View>
  );
};
