import React, { useState, useEffect, useCallback } from "react";
import { View, Text, TextInput, Button, FlatList, Alert, StyleSheet, TouchableOpacity,} from "react-native";
import { getServicesSheets, filteServiceSheetsByTitle, ServiceSheet} from "../storage/sheetservice"; 
import { ModalCreateRegisterServiceSheet } from "../../app/modals/crearServiceSheet";
import { DetailStackParamList, DetailLayout } from "../../app/_layout";
import { StackNavigationProp } from "@react-navigation/stack";
import { useNavigation } from "@react-navigation/native";

type DetailPropValue = StackNavigationProp<DetailStackParamList, 'homedetail'>;

export const ReporteriaPage = ()=> {
  const [serviceSheets, setServiceSheets] = useState<ServiceSheet[]>();
  const [searchTerm, setSearchTerm] = useState("");
  const [openModal, setOpenModal] = useState(Boolean);
  const navigation = useNavigation<DetailPropValue>();
  const _OpenModal_ = () =>{ setOpenModal(true)}
  const _CloseModal_ = () =>{ setOpenModal(false)}

  useEffect(() => {
    loadServiceSheets();
  }, []);

  const UpdateList = useCallback(async () => {
    try {
      const data = await getServicesSheets();
      setServiceSheets(data);
    } catch (error) {
      console.error("Error al cargar los registros:", error);
    }
  }, []);
  
  const loadServiceSheets = async () => {
    const sheets = await getServicesSheets();
    setServiceSheets(sheets);
  };

  const handleSearch = async (term : string) => {
    setSearchTerm(term);
    if (term.trim() === "") {
      UpdateList();
    } else {
      const filteredData = await filteServiceSheetsByTitle(term);
      setServiceSheets(filteredData);
    }
  };

  useEffect(()=>{
    UpdateList();
  },[UpdateList])

  return (
    <View style={styles.container}>
      <ModalCreateRegisterServiceSheet vis={openModal} closeModal={_CloseModal_} onUpdate={UpdateList}/>
      <TextInput placeholder="BUSCAR"
          placeholderTextColor={'grey'}
          value={searchTerm} 
          onChangeText={handleSearch} 
          style={[styles.input]}/>
      <Button title="CREAR HOJA DE SERVICIO" onPress={_OpenModal_}  color={'green'}/>

      <FlatList
        data={serviceSheets}
        keyExtractor={(item : ServiceSheet) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.sheet} onPress={()=>{navigation.navigate('detailpage', { _data_ : item})}}>
            <Text style={styles.sheetTitle}>{item.title}</Text>
            <Text>{item.fecha}</Text>
            <Text>{item.cliente}</Text>
            <Text>{item.cliente_detalle}</Text>
            <Text>{item.description}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f8f9fa",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    marginBottom: 5,
    borderRadius: 5,
  },
  form: {
    marginBottom: 20,
  },
  sheet: {
    padding: 15,
    backgroundColor: "#fff",
    borderRadius: 0,
    marginBottom: 0,
    borderBottomWidth : 1,
    borderBottomColor : '#f4f6f6',
    elevation: 1,
  },
  sheetTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },
});
