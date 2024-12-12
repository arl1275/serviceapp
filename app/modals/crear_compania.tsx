import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  TextInput,
  Alert,
} from "react-native";
import { styles } from "../../assets/styles/styles";
import { impuesto, Company, addCompanies } from "../../app/storage/company";

interface ModalCreateRegisterProps {
  vis: boolean;
  closeModal: () => void;
  onUpdate: () => void;
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

export const ModalcreateCompany = ({
  vis,
  closeModal,
  onUpdate,
}: ModalCreateRegisterProps) => {
  const [newCompany, setNewCompany] = useState<Company>({
    id: 1,
    imagen: "",
    nombre: "",
    RTN: "",
    contacto: "",
    correo: "",
    direccion: "",
    CAI: "",
    correlativo: 0,
    rango: 0,
    fechalimite: "",
    impuesto: [],
  });

  const _Onclose_ = () => {
    onUpdate();
    closeModal();
  };

  const _CreateRegister_ = async () => {
    if (newCompany && newCompany.RTN.length > 1) {
      await addCompanies(newCompany);
    } else {
      Alert.alert(
        "Falta de Datos",
        "Favor llenar la informacion para crear un registro."
      );
    }
    _Onclose_();
  };

  const handleInputChange = (field: keyof Company, value: string | number) => {
    setNewCompany({
      ...newCompany,
      [field]: value,
    });
  };

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
          <View
            style={{
              borderBottomWidth: 1,
              borderBottomColor: "#ebedef",
              padding: 10,
              width: "100%",
              marginBottom: 10,
            }}
          >
            <Text style={[styles.bigtitle, { textAlign: "center" }]}>
              CREAR COMPAÑIA NUEVA
            </Text>
          </View>

          <View style={{ borderWidth: 0, width: "100%", margin: 5 }}>
            <Text style={[styles.title]}>{getFormattedDate()}</Text>
          </View>

          {Object.keys(newCompany).map((key) => (
            <View key={key} style={{
                borderWidth: 1,
                borderColor: "#d6dbdf",
                borderRadius: 5,
                width: "100%",
                margin: 5,
              }}>
              <TextInput
                placeholder={`Enter ${key}`}
                value={newCompany[key as keyof Company]?.toString()}
                onChangeText={(text) =>
                  handleInputChange(key as keyof Company, text)
                }
              />
            </View>
          ))}


          <View style={{ margin: 5, marginTop: 10 }}>
            <TouchableOpacity
              style={{
                borderRadius: 5,
                backgroundColor: "#3949ab",
                width: " 100%",
              }}
              onPress={async () => await _CreateRegister_()}
            >
              <Text
                style={[
                  styles.title,
                  { color: "white", textAlign: "center", margin: 10 },
                ]}
              >
                CREAR
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};
