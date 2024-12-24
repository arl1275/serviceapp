import { useEffect, useState } from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import { Company, FacturaNumber } from "../../app/storage/company";
import { styles } from "../../assets/styles/styles";
import { Ionicons } from "@expo/vector-icons/build/Icons";
import { StackNavigationProp } from "@react-navigation/stack/lib/typescript/commonjs/src";
import { CompaniesParamList } from "../../app/_layout";
import { useNavigation } from "expo-router";

type HomeScreenNavigationProp = StackNavigationProp<CompaniesParamList, "homeCompany">;

interface CompanyProps {
  data: Company;
}

export const CompanyHeadCard = ({ data }: CompanyProps) => {
  const [companyValue, setCompanyValue] = useState<Company | null>(null);
  const navigation = useNavigation<HomeScreenNavigationProp>();

  const FormatCorrelative = (value: FacturaNumber): string => {
    // Filtra las claves para excluir "id" y concatena los valores restantes
    const formattedValue = Object.keys(value)
      .filter((key) => key !== "id") // Excluye la clave "id"
      .map((key) => value[key as keyof FacturaNumber])
      .join(" - ");
    return formattedValue;
  };

  useEffect(() => {
    setCompanyValue(data);
  }, [data]);

  if (!companyValue) {
    return null; // Retorna null si no hay datos
  }

  return (
    <View style={[styles.headsheet, { marginBottom: 0 }]}>
      {/* Imagen de la compañía */}
      <View style={{ alignItems: "center", marginBottom: 10 }}>
        {companyValue.imagen ? (
          <Image
            source={{ uri: `file://${companyValue.imagen}` }}
            style={styles.image_List}
          />
        ) : (
          <Text style={styles.noImageText}>No hay imagen disponible</Text>
        )}
      </View>

      {/* Información de la compañía */}
      <Text style={styles.companyName}>{companyValue.nombre}</Text>

      <View style={[styles.rowContainer, { elevation: 0 }]}>
        <View style={{ marginTop: 10 }}>
          <View>
            <View style={styles.row}>
              <Text style={styles.companyText}>RTN:</Text>
              <Text style={styles.companyText}>{companyValue.RTN}</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.companyText}>Contacto:</Text>
              <Text style={styles.companyText}>{companyValue.contacto}</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.companyText}>Correo:</Text>
              <Text style={styles.companyText}>{companyValue.correo}</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.companyText}>Dirección:</Text>
              <Text style={styles.companyText}>{companyValue.direccion}</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.companyText}>CAI:</Text>
              <Text style={styles.companyText}>{companyValue.CAI}</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.companyText}>Correlativo:</Text>
              <Text style={styles.companyText}>{FormatCorrelative(companyValue.correlativo)}</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.companyText}>Rango:</Text>
              <Text style={styles.companyText}>{companyValue.rango}</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.companyText}>Fecha Límite:</Text>
              <Text style={styles.companyText}>{companyValue.fechalimite}</Text>
            </View>
          </View>

        </View>

        <View>
          <Ionicons
            name="pencil"
            size={25}
            color="grey"
            style={{ margin: 15 }}
            onPress={() => navigation.navigate("EditCopany", { _data_: companyValue })}
          />
        </View>

      </View>
    </View>
  );
};