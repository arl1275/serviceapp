import { View, Text, TextInput, FlatList } from "react-native";
import { Headsheetcard } from "../../app/components/cardhead";
import { NavbarRegister } from "../../app/components/navbar.registers";
import { HeadSheet, getHeadSheets, filterHeadSheetsByTitle } from "../../app/storage/headservice";
import { useState, useEffect, useCallback } from "react";
import { styles } from "../../assets/styles/styles";
import React from "react";

export const RegistrosPage = () => {
  const [dataheadsheet, setdataheadsheet] = useState<HeadSheet[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");

  // Carga inicial de los registros
  const UpdateList = useCallback(async () => {
    try {
      const data = await getHeadSheets();
      setdataheadsheet(data);
    } catch (error) {
      console.error("Error al cargar los registros:", error);
    }
  }, []);

  const handleSearch = async (term: string) => {
    setSearchTerm(term);
    if (term.trim() === "") {
      UpdateList();
    } else {
      const filteredData = await filterHeadSheetsByTitle(term);
      setdataheadsheet(filteredData);
    }
  };

  useEffect(() => {
    UpdateList();
  }, [UpdateList]);

  return (
    <View style={{ flex: 1, marginTop: 0, alignItems: "center" }}>
      <View style={{display : 'flex', flexDirection : 'column',justifyContent: "center", alignItems: "center" }}>

        <View style={[ styles.rowContainer]}>
          <TextInput placeholder="BUSCAR"
          placeholderTextColor={'grey'}
          value={searchTerm} 
          onChangeText={handleSearch} 
          style={[styles.textInput]}/>
          <NavbarRegister onUpdate={UpdateList} />
        </View>
        
       

        {dataheadsheet.length > 0 ? (
          <FlatList
            data={dataheadsheet}
            style={{ borderRadius : 5, width : '95%'}}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <View>
                <Headsheetcard head={item.title} des={item.description} contacto={item.contacto} correo={item.correo} address={item.address} rtn={item.rtn}/>  
              </View>
            
            )}
          />
        ) : (
          <Text style={{ fontSize: 20, color: "#000" }}>
            NO HAY REGISTROS
          </Text>
        )}
      </View>
    </View>
  );
};
