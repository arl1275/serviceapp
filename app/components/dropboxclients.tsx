import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { styles } from "../../assets/styles/styles";
import { getHeadSheets, HeadSheet } from "../../app/storage/headservice";

interface Props {
    isactive: boolean;
    selectedvalue: (value: string) => void;
  }
  
  export const DropboxClients: React.FC<Props> = ({ isactive, selectedvalue }) => {
    const [selectedValue, setSelectedValue] = useState<string>("");
    const [clients, setClients] = useState<HeadSheet[]>([]);
  
    useEffect(() => {
      const fetchClients = async () => {
        try {
          const data = await getHeadSheets(); // Supongo que `getHeadSheets` devuelve `Promise<HeadSheet[]>`
          setClients(data);
          if (data.length > 0) {
            setSelectedValue(data[0].title); // Establece el valor inicial como el primer cliente
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
            <Picker.Item label={client.title} value={client.title} key={client.id} />
          ))}
        </Picker>
      </View>
    );
  };