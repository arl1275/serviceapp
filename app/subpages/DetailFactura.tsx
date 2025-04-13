//-- navegation
import { FacturasParamList } from "../../app/_layout";
import { StackNavigationProp } from "@react-navigation/stack";
import { RouteProp, useNavigation } from "@react-navigation/native";

type FacturaDetailProps = {
  route: RouteProp<FacturasParamList, "DetailFactura">;
};

//-- others
import { styles } from "../../assets/styles/styles";
import { View, Text, Alert, FlatList } from "react-native";
import { useState, useEffect, cloneElement } from "react";
import {
  Company,
  filterCompanyByID,
  FacturaNumber,
} from "../../app/storage/company";
import {
  HeadCouting,
  filterHeadCoutingBytitle,
} from "../../app/storage/headCouting";
import {
  CoutingDatail,
  filterLinesByHeadFactura,
  getCouting,
} from "../../app/storage/couting";
import { getFormattedDate } from "../../app/modals/crear_service_detail";

type HomeScreenNavigationProp = StackNavigationProp<
  FacturasParamList,
  "homeFactura"
>;

export const FacturaDetail = ({ route }: FacturaDetailProps) => {
  const { _valueFactura_ } = route.params;
  const navigation = useNavigation<HomeScreenNavigationProp>();

  const [Empresa, setEmpresa] = useState<Company | null>(null);
  const [HeadFactura, setHeadFactura] = useState<HeadCouting | null>(null);
  const [FacturaDetail, setFacturaDetail] = useState<CoutingDatail[]>([]);

  async function GetCompania() {
    let value = await filterCompanyByID(_valueFactura_.id_Company_Related);
    return value.length > 0 ? value[0] : null;
  }

  async function GetLinesFactura() {
    let value: CoutingDatail[] = await filterLinesByHeadFactura(
      _valueFactura_.id
    );
    return value.length > 0 ? value : [];
  }

  const FullFillFactura = async () => {
    try {
      if (!_valueFactura_) {
        Alert.alert("No se obtuvo encabezado de Factura");
        return;
      }

      setHeadFactura(_valueFactura_);

      const [empresa, factDetail] = await Promise.all([
        GetCompania(),
        GetLinesFactura(),
      ]);

      setEmpresa(empresa);
      setFacturaDetail(factDetail);

      //console.log('data values :', factDetail);
    } catch (error) {
      console.error("Error al cargar factura:", error);
      Alert.alert("Error al cargar la información de la factura");
    }
  };

  useEffect(() => {
    FullFillFactura();
  }, [_valueFactura_.id]);

  const FormattedFacturaNumber = (_value_: FacturaNumber | undefined) => {
    if (!_value_) return "Factura no generada";
    return `${_value_.FirstNumbers}-${_value_.SeconNumbers}-${_value_.thirdNumbers}-${_value_.LastNumbers}`;
  };

  return (
    <View>
      <View style={[{ margin: 10, backgroundColor: "black" }]}>
        <Text
          style={[
            styles.bigtitle,
            { fontWeight: "bold", color: "white", marginLeft: 10 },
          ]}
        >
          {Empresa?.nombre}
        </Text>
        <Text
          style={[
            styles.title,
            { fontWeight: "bold", color: "white", marginLeft: 10 },
          ]}
        >
          Factura: {FormattedFacturaNumber(HeadFactura?._NumberOfBill_)}
        </Text>
      </View>

      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          marginLeft: 10,
          marginTop: 0,
        }}
      >
        <View style={{ flex: 1, paddingRight: 10 }}>
          <Text style={[styles.title, { fontWeight: "bold" }]}>
            Fecha: {getFormattedDate()}
          </Text>
          <Text style={styles.title}>Dirección: {Empresa?.direccion}</Text>
          <Text style={styles.title}>Teléfono: {Empresa?.contacto}</Text>
          <Text style={styles.title}>Fecha Límite: {Empresa?.fechalimite}</Text>
          <Text style={styles.title}>RTN: {Empresa?.RTN}</Text>
        </View>

        <View style={{ flex: 1, paddingLeft: 10 }}>
          <Text style={styles.title}>Correo: {Empresa?.correo}</Text>
          <Text style={styles.title}>CAI: {Empresa?.CAI}</Text>
          <Text style={styles.title}>Contacto: {Empresa?.contacto}</Text>
          <Text style={[styles.title, { fontWeight: "bold", marginTop: 10 }]}>
            Cliente: {HeadFactura?.ClientName.name}
          </Text>
          <Text style={styles.title}>RTN: {HeadFactura?.ClientName.RTN}</Text>
        </View>
      </View>
      <View
        style={{
          borderBottomWidth: 1,
          borderBottomColor: "grey",
          width: "98%",
          alignSelf: "center",
        }}
      />

      <View
        style={[
          styles.rowContainer,
          {
            alignContent: "space-between",
            padding: 10,
            alignItems: "center",
            elevation: 0,
            borderBottomColor: "grey",
            borderBottomWidth: 1,
            alignSelf: "center",
          },
        ]}
      >
        <Text style={{ width: "50%" }}>Detalle</Text>
        <Text style={{ width: "10%" }}>Cantidad</Text>
        <Text style={{ width: "10%" }}>Descuento</Text>
        <Text style={{ width: "10%" }}>Precio</Text>
      </View>

      <FlatList
        data={FacturaDetail ?? []}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View
            style={[
              styles.rowContainer,
              {
                alignContent: "space-between",
                marginTop: 5,
                marginLeft: 10,
                alignItems: "center",
                elevation: 0,
                backgroundColor: "",
                alignSelf: "center",
                borderBottomWidth: 1,
                borderBottomColor: "#d1d1d1",
              },
            ]}
          >
            <Text style={{ width: "50%" }}>{item.detail}</Text>
            <Text style={{ width: "10%" }}>{item.cantidad}</Text>
            <Text style={{ width: "10%" }}>{item.descuento}</Text>
            <Text style={{ width: "10%" }}>{item.price}</Text>
          </View>
        )}
      />

      <View style={{ margin: 10 }}>
        <View style={{ borderWidth: 1, borderColor: "#ccc", borderRadius: 5 }}>
          {/* Encabezados */}
          <View
            style={{
              flexDirection: "row",
              backgroundColor: "#f0f0f0",
              padding: 8,
            }}
          >
            <Text style={{ flex: 1, fontWeight: "bold" }}>Concepto</Text>
            <Text style={{ flex: 1, fontWeight: "bold", textAlign: "right" }}>
              Valor (L)
            </Text>
          </View>

          {/* Valores */}
          <View style={{ flexDirection: "row", padding: 8 }}>
            <Text style={{ flex: 1 }}>Total</Text>
            <Text style={{ flex: 1, textAlign: "right" }}>
              {FacturaDetail.reduce((acc, item) => acc + item.price, 0).toFixed(
                2
              )}
            </Text>
          </View>

          <View style={{ flexDirection: "row", padding: 8 }}>
            <Text style={{ flex: 1 }}>Impuesto (15%)</Text>
            <Text style={{ flex: 1, textAlign: "right" }}>
              {(
                FacturaDetail.reduce((acc, item) => acc + item.price, 0) * 0.15
              ).toFixed(2)}
            </Text>
          </View>

          <View style={{ flexDirection: "row", padding: 8 }}>
            <Text style={{ flex: 1 }}>Sub-Total (85%)</Text>
            <Text style={{ flex: 1, textAlign: "right" }}>
              {(
                FacturaDetail.reduce((acc, item) => acc + item.price, 0) * 0.85
              ).toFixed(2)}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};
