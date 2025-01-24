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

  const Updating = () =>{selectedvalue(selectedValue);}
  const fetchClients = async () => {
    try {
      const data : Company[] = await getCompanies();
      setClients(data);
      if (data.length > 0) {
        setSelectedValue(data[0].nombre); 
      }
    } catch (error) {
      console.error("Error al obtener los clientes:", error);
    }
  };

  useEffect(() => { fetchClients(); }, [isactive]);

  useEffect(() => { Updating()}, [selectedValue, selectedvalue]);

  return (
    <View style={[styles.DropBoxcontainer, { padding : 20 }]}>
      <Picker
        selectedValue={selectedValue}
        onValueChange={(itemValue) => setSelectedValue(itemValue)}
        style={[styles.DropBoxpicker]}
      >
        {clients.map((client) => (
          <Picker.Item label={client.nombre} value={client.nombre} key={client.id} />
        ))}
      </Picker>
    </View>
  );
};