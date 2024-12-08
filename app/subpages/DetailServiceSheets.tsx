import React, { useEffect, useState, useCallback } from "react";
import { View, Text, TouchableOpacity, FlatList, Alert } from "react-native";
import { ServiceSheet } from "../../app/storage/sheetservice";
import { RouteProp } from "@react-navigation/native";
import { DetailStackParamList } from "../../app/_layout";
import { styles } from "../../assets/styles/styles";
import { ModalDetailCreateRegisterServiceSheet } from "../../app/modals/crear_service_detail";
import { dataServiceSheet, filterServiceSheetsByID } from "../../app/storage/dataservice";

type ServiceSheetDetailProps = {
  route: RouteProp<DetailStackParamList, "detailpage">; 
};

export const ServiceSheetDetail = ({ route }: ServiceSheetDetailProps) => {
    const { _data_ } = route.params;
    const [sheet, setSheet] = useState<ServiceSheet | undefined>(undefined);
    const [modalVisible, setModalVisible] = useState(false);
    const [dataServiceSheetDetail, setdataServiceSheetsDetail] = useState<dataServiceSheet[]>([]);
  
    const _OpenModal_ = () => {sheet === undefined ? Alert.alert("No hay datos disponibles") : setModalVisible(true);};
    const _CloseModal_ = () => {setModalVisible(false);};
  
    const UpdateList = useCallback(async () => {
      try {
        const data = await filterServiceSheetsByID(sheet?.id ?? 0);
        setdataServiceSheetsDetail(data);
      } catch (error) {
        console.error("Error al cargar los registros:", error);
      }
    }, [sheet]);
  
    useEffect(() => {
      setSheet(_data_);
    }, [_data_]);
  
    useEffect(() => {
      if (sheet) {
        UpdateList();
      }
    }, [sheet, UpdateList]);
  
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center", marginLeft : 5, marginRight : 5 }}>
        <ModalDetailCreateRegisterServiceSheet
          closeModal={_CloseModal_}
          _servicesheet_={_data_}
          vis={modalVisible}
          onUpdate={UpdateList}
        />
        <View style={[styles.headsheet,{borderRadius : 3, elevation : 10, marginTop : 5, marginBottom : 5, borderWidth : 1, borderColor : 'black'}]}>
          {sheet && (
            <View style={{ marginBottom: 15 }}>
              <Text style={[styles.bigtitle, {marginBottom : 10}]}>{sheet.cliente}</Text>
              <Text style={styles.title}>{sheet.cliente_detalle}</Text>
              <Text style={styles.parrafo}>{sheet.description}</Text>
              <Text style={styles.parrafo}>{sheet.fecha}</Text>
            </View>
          )}
          <View style={[styles.rowContainer, { elevation: 0, backgroundColor : 'white' }]}>
            <TouchableOpacity style={[styles.greenButton]} onPress={_OpenModal_}>
              <Text style={{ color: "white", fontWeight: "bold", textAlign: "center" }}>CREAR DETALLE</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.pdfButton}>
              <Text style={{ color: "white", textAlign: "center", fontWeight: "bold" }}>PDF</Text>
            </TouchableOpacity>
          </View>
        </View>
  
        <FlatList
          data={dataServiceSheetDetail}
          style={{borderRadius : 7}}
          keyExtractor={(item: dataServiceSheet) => `f${item.id}-${item.id_service_sheet}`}
          renderItem={({ item }) => (
            <View style={[styles.sheet]}>
              <Text style={[styles.parrafo, {fontSize : 12, color : '#a6acaf', marginBottom : 10}]}>{item.fecha}</Text>
              <Text style={[styles.title, {fontWeight : 'bold'}]}>{item.title}</Text>
              <Text>{item.description}</Text>
            </View>
          )}
        />
      </View>
    );
  };
  