import { useState } from "react";
import { View, Text, TouchableOpacity, Modal, TextInput } from "react-native";
import { styles } from "../../assets/styles/styles";
import { ServiceSheet, addServiceSheet} from "../../app/storage/sheetservice";
import { DropboxClients } from "../../app/components/dropboxclients";

interface ModalCreateRegisterProps {
  vis: boolean;
  closeModal: () => void;
  onUpdate : () => void;
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
  
export const ModalCreateRegisterServiceSheet = ({ vis, closeModal, onUpdate}: ModalCreateRegisterProps) => {
  const [title, settitle] = useState(String);
  const [description, setDescription] = useState(String);
  const [_cliente, setCliente] = useState("");
  const [_clientedetalle, setClienteDetalle ] = useState("");
  const [_isactive, setIsactive] = useState(Boolean);
 
  const _isActiveDropBox_ = () =>{setIsactive(!_isactive)};
  const _Onclose_ = () => {
    onUpdate();
    closeModal();
  };

  const _CreateRegister_ = async () =>{
    let data : ServiceSheet ={
        id: Date.now(), // ID único generado automáticamente
        title: title,
        fecha: getFormattedDate(), // Fecha generada automáticamente
        cliente : _cliente,
        cliente_detalle : _clientedetalle,
        description : description
    }
    await addServiceSheet(data);
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

          <View style={{ borderWidth : 1, borderColor : '#d6dbdf', borderRadius : 5, width : '100%', padding : 10 }}>
            <TextInput placeholder="Titulo" onChangeText={(e) => settitle(e)} />
          </View>

          <View onPointerEnter={_isActiveDropBox_}
           style={{ borderWidth : 1, borderColor : '#d6dbdf', borderRadius : 5, width : '100%', margin : 5, padding : 10, height : 55}}>
            <DropboxClients selectedvalue={setCliente} isactive={_isactive}/>
          </View>

          <View style={{ borderWidth : 1, borderColor : '#d6dbdf', borderRadius : 5, width : '100%', margin : 5, padding : 10 }}>
            <TextInput placeholder="Cliente Detalle" onChangeText={(e) => setClienteDetalle(e)}/>
          </View>

          <View style={{ borderWidth : 1, borderColor : '#d6dbdf', borderRadius : 5, width : '100%',margin : 5, padding : 10 }}>
            <TextInput placeholder="Descripcion" onChangeText={(e) => setDescription(e)}/>
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
