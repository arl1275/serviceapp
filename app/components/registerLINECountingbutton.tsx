import React, { useState, useEffect } from "react";
import { Button, TextInput, View, FlatList, Text, Alert } from "react-native";
import { CoutingDatail } from "../../app/storage/couting";
import { getFormattedDate } from "../../app/modals/crear_service_detail";
import { styles } from "../../assets/styles/styles";
import { Ionicons } from "@expo/vector-icons";
import { HeadCouting } from "../../app/storage/headCouting";

interface props {
  addCoutingLine: (value: CoutingDatail) => void; // funcion para añadir una linea de la factura
  DeleteCoutingLine: (value: number) => void; // funcion para eliminar una linea de counting detail
  data: CoutingDatail[] | null; // arreglo que guarda la couting detail
  id_head_Couting: HeadCouting | null; // id del encabezado de factura
  id_head_sheet: number | null;
}

const createEmptyCoutingLine = (): CoutingDatail => ({
  id: Date.now(),
  id_service_sheet: null,
  id_Head_Couting: 0,
  detail: "",
  cantidad: 1,
  descuento: 0,
  price: 0.0,
  _date_: getFormattedDate(),
});

export const RegisterCountingLine: React.FC<props> = ({
  addCoutingLine,
  DeleteCoutingLine,
  data,
  id_head_Couting,
  id_head_sheet,
}) => {
  const [idfactura, setIdfactura] = useState<number>(0);
  const [addLine, setAddline] = useState<boolean>(false);
  const [CoutingLine, setCoutingLine] = useState<CoutingDatail>(
    createEmptyCoutingLine()
  );

  useEffect(() => {
    setIdfactura(id_head_Couting ? id_head_Couting.id : 0);
  }, [id_head_Couting]);

  const updateVAlue = (value: string, valor: string | number) => {
    setCoutingLine((prev) => ({
      ...prev,
      [value]:
        typeof valor === "string" && !isNaN(Number(valor))
          ? Number(valor)
          : valor,
    }));
  };

  const SaveLineDetail = () => {
    if (idfactura === 0) {
      Alert.alert("ERROR: id missing", "the id of the factura is missing");
      return;
    }

    const nuevaLinea: CoutingDatail = {
      ...CoutingLine,
      id: Date.now(),
      id_Head_Couting: idfactura,
      _date_: getFormattedDate(),
    };

    addCoutingLine(nuevaLinea);
    setCoutingLine(createEmptyCoutingLine());
    setAddline(!addLine)
  };

  return (
    <View>
      <View style={{ margin: 5 }}>
        <Button title="CREAR LINEA" onPress={() => setAddline(!addLine)} />
      </View>

      {data && data.length > 0 && (
        <View style={[styles.rowContainer,{ alignContent: "space-between", margin: 5 , padding : 10},]}>
          <Text>Detalle</Text>
          <Text>Cantidad</Text>
          <Text>Descuento</Text>
          <Text>Precio</Text>
          <Text>ACCION</Text>
        </View>
      )}
      {addLine && (
        <View
          style={[
            styles.rowContainer,
            { padding: 3, margin: 5, width: "auto" },
          ]}
        >
          <TextInput
            placeholder="DETALLE"
            onChangeText={(e) => updateVAlue("detail", e)}
            style={[styles.textbox_edit, { width: "20%" }]}
          />
          <TextInput
            placeholder="CANTIDAD"
            keyboardType="numeric"
            onChangeText={(e) => updateVAlue("cantidad", Number(e) || 1)}
            style={[styles.textbox_edit, { width: "20%" }]}
          />
          <TextInput
            placeholder="DESCUENTO"
            keyboardType="numeric"
            onChangeText={(e) => updateVAlue("descuento", Number(e) || 0)}
            style={[styles.textbox_edit, { width: "20%" }]}
          />
          <TextInput
            placeholder="PRECIO"
            keyboardType="numeric"
            onChangeText={(e) => updateVAlue("price", Number(e) || 1)}
            style={[styles.textbox_edit, { width: "20%" }]}
          />
          <View style={[{ width: "10%" }]}>
            <Button title="Agregar" onPress={() => SaveLineDetail()} />
          </View>
        </View>
      )}

      <FlatList
        data={data}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View
            style={[
              styles.rowContainer,
              { alignContent: "space-between", margin: 5 },
            ]}
          >
            <Text style={{ width: "15%" }}>{item.detail}</Text>
            <Text style={{ width: "15%" }}>{item.cantidad}</Text>
            <Text style={{ width: "15%" }}>{item.descuento}</Text>
            <Text style={{ width: "15%" }}>{item.price}</Text>
            <Ionicons
              name="trash"
              size={20}
              color="red"
              style={{ margin: 10 }}
              onPress={async () => await DeleteCoutingLine(item.id)}
            />
          </View>
        )}
      />
    </View>
  );
};
