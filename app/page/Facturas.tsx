import { View, Text, TouchableOpacity, Button, FlatList, Alert } from "react-native";
import { FacturasParamList } from "../_layout";
import { StackNavigationProp } from "@react-navigation/stack";
import { useNavigation } from "@react-navigation/native";
import { styles } from "../../assets/styles/styles";
import { HeadCouting, getHCouting } from "../../app/storage/headCouting";
import React, { useState, useEffect, useCallback } from "react";
import { getFormattedDate } from "../../app/modals/crear_service_detail";

type HomeScreenNavigationProp = StackNavigationProp<
  FacturasParamList,
  "homeFactura"
>;

export const FacturasPage = () => {
  const navigation = useNavigation<HomeScreenNavigationProp>();
  const [data, setData] = useState<HeadCouting[]>([]);

  const UpdateList = useCallback(async () => {
    try {
      const _data_ = await getHCouting();
      setData(_data_);
    } catch (error) {
      console.error("Error al cargar los registros:", error);
    }
  }, []);

  const _crearFactura_ = () =>{
    try {
      
    } catch (error) {
      Alert.alert('Error', 'Se genero un error al generar Factura')
    }
  }

  useEffect(()=>{
      UpdateList();
    },[UpdateList])
  

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <View>
        <Button
          title="Crear Factura"
          onPress={() => _crearFactura_()}
        />
      </View>
       <FlatList
              data={data}
              keyExtractor={(item : HeadCouting) => item.id.toString()}
              renderItem={({ item }) => (
                <TouchableOpacity style={styles.sheet} >
                  <Text style={styles.parrafo}>{item._date_}</Text>
                  <Text>{item._NumberOfBill_}</Text>
                </TouchableOpacity>
              )}
            />
    </View>
  );
};