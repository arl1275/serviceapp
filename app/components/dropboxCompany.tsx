import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { styles } from "../../assets/styles/styles";
import { Company, getCompanies } from "../../app/storage/company";

interface Props {
    isactive: boolean;
    selectedvalue: (value: string) => void;
  }
  
  export const DropboxCompany: React.FC<Props> = ({ isactive, selectedvalue }) => {
    const [selectedValue, setSelectedValue] = useState<string>("");
    const [clients, setClients] = useState<Company[]>([]);
  
    useEffect(() => {
      const fetchClients = async () => {
        try {
          const data = await getCompanies(); // Supongo que `getHeadSheets` devuelve `Promise<HeadSheet[]>`
          setClients(data);
          if (data.length > 0) {
            setSelectedValue(data[0].nombre); // Establece el valor inicial como el primer cliente
          }
        } catch (error) {
          console.error("Error al obtener los clientes:", error);
        }
      };
  
      fetchClients();
    }, [isactive]);
  
    useEffect(() => {
      selectedvalue(selectedValue);
    }, [selectedValue, selectedvalue]);
  
    return (
      <View style={styles.DropBoxcontainer}>
        <Picker
          selectedValue={selectedValue}
          onValueChange={(itemValue) => setSelectedValue(itemValue)}
          style={styles.DropBoxpicker}
        >
          {clients.map((client) => (
            <Picker.Item label={client.nombre} value={client.nombre} key={client.id} />
          ))}
        </Picker>
      </View>
    );
  };