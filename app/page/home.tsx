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
          alignItems : 'center',
          justifyContent : 'space-around',
          bottom: 0,
          width: "100%",
        }}
      >
        <TouchableOpacity
          style={[
            styles.mainsecctionbutton,
            { margin: 0, backgroundColor: "black" },
          ]}
          onPress={()=>{navigation.navigate('facturas')}}
        >
          <Text
            style={[
              styles.bigtitle,
              { textAlign: "center", color: "white" },
            ]}
          >
            FACTURACION
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.mainsecctionbutton,
            { margin: 0, backgroundColor: "black" },
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
            { margin: 0, backgroundColor: "black" },
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
