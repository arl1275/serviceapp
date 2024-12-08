import React, { useState } from "react";
import { View, Text, TouchableOpacity, Modal, TextInput, Alert } from "react-native";
import { styles } from "../../assets/styles/styles";
import { dataServiceSheet, adddataServiceSheet } from "../../app/storage/dataservice";
import { ServiceSheet } from "../../app/storage/sheetservice";
import { CameraComponent } from "../../app/components/takephoto";

interface ModalCreateRegisterProps {
  vis: boolean;
  closeModal: () => void;
  onUpdate : () => void;
  _servicesheet_ :  ServiceSheet
}

function getFormattedDate(): string {
    const now = new Date();
  
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, "0"); // Mes (0-11, sumamos 1)
    const day = String(now.getDate()).padStart(2, "0"); // Día del mes
  
    const hours = String(now.getHours()).padStart(2, "0"); // Horas
    const minutes = String(now.getMinutes()).padStart(2, "0"); // Minutos
    const seconds = String(now.getSeconds()).padStart(2, "0"); // Segundos
  
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  }
  
export const ModalDetailCreateRegisterServiceSheet = ({ vis, closeModal, onUpdate, _servicesheet_}: ModalCreateRegisterProps) => {
  const [title, settitle] = useState(String);
  const [description, setDescription] = useState(String);
  const [_isactive, setIsactive] = useState(Boolean);
  const [ _photo_, setPhoto] = useState(String);
 
  const _isActiveDropBox_ = () =>{setIsactive(!_isactive)};
  const _Onclose_ = () => {
    onUpdate();
    closeModal();
  };

  const _CreateRegister_ = async () =>{
    let data : dataServiceSheet ={
        id: Date.now(), // ID único generado automáticamente
        title: title,
        fecha: getFormattedDate(),
        description : description,
        photo : _photo_,
        id_service_sheet : _servicesheet_.id
    }
    
    if(data.title.length > 1){
      await adddataServiceSheet(data);
    }else{
      Alert.alert('Falta de Datos', 'Favor llenar la informacion para crear un registro.')
    }
    
    _Onclose_();
  }

  return (
    <Modal
      visible={vis}
      onRequestClose={_Onclose_}
      animationType="slide"
      style={{
        backgroundColor: "whtie",
        borderRadius: 5,
        width: "80%",
        height: "40%",
      }}
      transparent={true}
    >
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "rgba(0, 0, 0, 0.5)",
        }}
      >
        <View
          style={{
            backgroundColor: "white",
            borderRadius: 10,
            padding: 10,
            width: "80%",
            alignItems: "center",
          }}
        >
          <View style={{ borderBottomWidth : 1, borderBottomColor : '#ebedef', padding : 10, width : '100%', marginBottom : 10}}>
            <Text style={[styles.bigtitle, {textAlign : 'center'}]}>CREAR REGISTRO NUEVO</Text>
          </View>

          <View style={{ borderWidth : 0,  width : '100%',margin : 5 }}>
            <Text style={[styles.title]}>{getFormattedDate()}</Text>
          </View>

          <View style={{ borderWidth : 1, borderColor : '#d6dbdf', borderRadius : 5, width : '100%',margin : 5 }}>
            <TextInput placeholder="Detalle" onChangeText={(e) => settitle(e)} />
          </View>
          
          <View style={{ borderWidth : 1, borderColor : '#d6dbdf', borderRadius : 5, width : '100%',margin : 5 }}>
            <TextInput placeholder="Descripcion" onChangeText={(e) => setDescription(e)}/>
          </View>

          {/* <TouchableOpacity style={[styles.unstylebutton]}>
            <Ionicons name="camera" size={25} color="grey" style={{ margin: 15 }} />
          </TouchableOpacity> */}
          <View style={{ height : '60%', width : '100%'}}>
          <CameraComponent />
          </View>
         

          <View style={{ margin: 5, marginTop : 10 }}>
            <TouchableOpacity style={{ borderRadius: 5, backgroundColor: "#3949ab",width: " 100%",}}
             onPress={ async ()=> await _CreateRegister_()}>
              <Text style={[styles.title, { color: "white", textAlign : 'center', margin : 10 }]}>CREAR</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};
