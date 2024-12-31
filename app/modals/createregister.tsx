import { useState } from "react";
import { View, Text, TouchableOpacity, Modal, TextInput } from "react-native";
import { styles } from "../../assets/styles/styles";
import { HeadSheet, addHeadSheet } from "../../app/storage/headservice"; 

interface ModalCreateRegisterProps {
  vis: boolean;
  closeModal: () => void;
}

export const ModalCreateRegister = ({ vis, closeModal}: ModalCreateRegisterProps) => {
  const [title, settitle] = useState(String);
  const [description, setDescription] = useState(String);
  const [_correo, setCorre] = useState("");
  const [_contacto, setContacto ] = useState("");
  const [_address, setAddress] = useState("");
  const [_rtn, setRtn] = useState("");

  const _Onclose_ = () => {
    closeModal();
  };

  const _CreateRegister_ = async () =>{
    let data : HeadSheet ={
        id : Date.now(),
        title : title,
        description : description,
        fecha : new Date().getDate().toString(),
        correo : _correo,
        contacto : _contacto,
        address : _address,
        rtn : _rtn
    }
    await addHeadSheet(data);
    closeModal();
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
            <Text style={[styles.bigtitle, {textAlign : 'center'}]}>CREAR CLIENTE NUEVO</Text>
          </View>

          <View style={{ borderWidth : 1, borderColor : '#d6dbdf', borderRadius : 5, width : '100%',margin : 5 , padding : 10}}>
            <TextInput placeholder="Titulo" onChangeText={(e) => settitle(e)} />
          </View>

          <View style={{ borderWidth : 1, borderColor : '#d6dbdf', borderRadius : 5, width : '100%',margin : 5, padding : 10 }}>
            <TextInput placeholder="Descripcion" onChangeText={(e) => setDescription(e)}/>
          </View>

          <View style={{ borderWidth : 1, borderColor : '#d6dbdf', borderRadius : 5, width : '100%',margin : 5, padding : 10 }}>
            <TextInput placeholder="Correo" onChangeText={(e) => setCorre(e)}/>
          </View>

          <View style={{ borderWidth : 1, borderColor : '#d6dbdf', borderRadius : 5, width : '100%',margin : 5, padding : 10 }}>
            <TextInput placeholder="Contacto" onChangeText={(e) => setContacto(e)}/>
          </View>

          <View style={{ borderWidth : 1, borderColor : '#d6dbdf', borderRadius : 5, width : '100%',margin : 5, padding : 10 }}>
            <TextInput placeholder="Direccion" onChangeText={(e) => setAddress(e)}/>
          </View>

          <View style={{ borderWidth : 1, borderColor : '#d6dbdf', borderRadius : 5, width : '100%',margin : 5, padding : 10 }}>
            <TextInput placeholder="RTN" onChangeText={(e) => setRtn(e)}/>
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
