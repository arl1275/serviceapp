import { View, Text, TouchableOpacity, Button, FlatList, Alert } from "react-native";
import { FacturasParamList } from "../_layout";
import { StackNavigationProp } from "@react-navigation/stack";
import { useNavigation } from "@react-navigation/native";
import { styles } from "../../assets/styles/styles";
import { HeadCouting, getHCouting } from "../../app/storage/headCouting";
import React, { useState, useEffect, useCallback } from "react";
//import { getFormattedDate } from "../../app/modals/crear_service_detail";
import { FacturaNumber, filterCompanyByID, Company } from "../../app/storage/company";

type HomeScreenNavigationProp = StackNavigationProp<FacturasParamList, "homeFactura">;

export const FacturasPage = () => {
  const navigation = useNavigation<HomeScreenNavigationProp>();
  const [data, setData] = useState<HeadCouting[]>([]);

  const UpdateList = useCallback(async () => {
    try {
      const _data_ : HeadCouting[] = await getHCouting();
      setData(_data_.sort((a, b) => b.id - a.id));
    } catch (error) {
      console.error("Error al cargar los registros:", error);
    }
  }, []);

  const _crearFactura_ = () => { navigation.navigate("CrearFActura") }
  const _GetCompanyInfo_ = async (item: number) => { 
    const valyes : Company[] = await filterCompanyByID(item);
    return valyes[0]
   }

  useEffect(() => {
    UpdateList();
  }, [UpdateList])

  const FormattedFacturaNumber = (item: FacturaNumber) => {
    return item?.FirstNumbers.toString() + '-'
      + item?.SeconNumbers.toString() + '-'
      + item?.thirdNumbers.toString() + '-'
      + item?.LastNumbers.toString()
  };

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <View>
        <Button title="Crear Factura" onPress={() => _crearFactura_()}/>
      </View>
      <FlatList
        data={data}
        keyExtractor={(item: HeadCouting) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.sheet} onPress={()=> navigation.navigate("DetailFactura", { _valueFactura_: item })}>
            <Text style={styles.parrafo}>{item._date_}</Text>
            <Text style={[styles.bigtitle]}>{FormattedFacturaNumber(item._NumberOfBill_)}</Text>
            <Text style={styles.parrafo}>{item.ClientName.name}</Text>
            <Text style={styles.parrafo}>{item.ClientName.RTN}</Text>
            <Text style={styles.parrafo}>{item.id}</Text>
          </TouchableOpacity>)
        }
      />
    </View>
  );
};
