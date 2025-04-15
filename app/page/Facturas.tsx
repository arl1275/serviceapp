import {
  View,
  Text,
  TouchableOpacity,
  Button,
  FlatList,
  Alert,
  TextInput,
} from "react-native";
import { FacturasParamList } from "../_layout";
import { StackNavigationProp } from "@react-navigation/stack";
import { useNavigation } from "@react-navigation/native";
import { styles } from "../../assets/styles/styles";
import { HeadCouting, getHCouting } from "../../app/storage/headCouting";
import React, { useState, useEffect, useCallback } from "react";
import {
  FacturaNumber,
  filterCompanyByID,
  Company,
} from "../../app/storage/company";

type HomeScreenNavigationProp = StackNavigationProp<
  FacturasParamList,
  "homeFactura"
>;

export const FacturasPage = () => {
  const navigation = useNavigation<HomeScreenNavigationProp>();
  const [data, setData] = useState<HeadCouting[]>([]);
  const [searchText, setSearchText] = useState("");

  const UpdateList = useCallback(async () => {
    try {
      const _data_: HeadCouting[] = await getHCouting();
      setData(_data_.sort((a, b) => b.id - a.id));
    } catch (error) {
      console.error("Error al cargar los registros:", error);
    }
  }, []);

  const _crearFactura_ = () => navigation.navigate("CrearFActura");
  async function getnameCompany(item: number) {
    const name = await filterCompanyByID(item);
    return name[0].nombre;
  }

  const FormattedFacturaNumber = (item: FacturaNumber) => {
    return (
      item?.FirstNumbers.toString() +
      "-" +
      item?.SeconNumbers.toString() +
      "-" +
      item?.thirdNumbers.toString() +
      "-" +
      item?.LastNumbers.toString()
    );
  };

  const filteredData = data.filter((item) =>
    FormattedFacturaNumber(item._NumberOfBill_).includes(searchText)
  );

  useEffect(() => {
    UpdateList();
  }, [UpdateList]);

  return (
    <View style={{ flex: 1, padding: 10 }}>
      <View style={{ marginBottom: 10 }}>
        <Button title="Crear Factura" onPress={_crearFactura_} />
      </View>

      <TextInput
        placeholder="Buscar por número de factura"
        value={searchText}
        onChangeText={setSearchText}
        style={{
          borderWidth: 1,
          borderColor: "#ccc",
          backgroundColor: "white",
          padding: 8,
          marginBottom: 10,
          borderRadius: 5,
        }}
      />

      <FlatList
        data={filteredData}
        keyExtractor={(item: HeadCouting) => item.id.toString()}
        renderItem={({ item }) => <FacturaItem item={item} />}
        ListEmptyComponent={
          <Text style={{ textAlign: "center", marginTop: 20 }}>
            No se encontraron resultados
          </Text>
        }
      />
    </View>
  );
};

const FacturaItem = ({ item }: { item: HeadCouting }) => {
  const navigation = useNavigation<HomeScreenNavigationProp>();
  const [companyName, setCompanyName] = useState("");

  useEffect(() => {
    const fetchName = async () => {
      const result = await filterCompanyByID(item.id_Company_Related);
      setCompanyName(result[0]?.nombre || "Empresa desconocida");
    };
    fetchName();
  }, [item.id_Company_Related]);

  const FormattedFacturaNumber = (factura: FacturaNumber) => {
    return `${factura.FirstNumbers}-${factura.SeconNumbers}-${factura.thirdNumbers}-${factura.LastNumbers}`;
  };

  return (
    <TouchableOpacity
      style={styles.sheet}
      onPress={() =>
        navigation.navigate("DetailFactura", { _valueFactura_: item })
      }
    >
      <Text style={[styles.parrafo, { color: "grey" }]}>{item._date_}</Text>
      <Text style={[styles.bigtitle]}>
        {FormattedFacturaNumber(item._NumberOfBill_)}
      </Text>
      <Text style={styles.parrafo}>{item.ClientName.name}</Text>
      <Text style={styles.parrafo}>{item.ClientName.RTN}</Text>
      <Text style={styles.parrafo}>Emitido por: {companyName}</Text>
    </TouchableOpacity>
  );
};
