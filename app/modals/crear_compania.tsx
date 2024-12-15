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
import DatePicker from 'react-native-date-picker';

interface ModalCreateRegisterProps {
  vis: boolean;
  closeModal: () => void;
  onUpdate: () => void;
}

export const ModalcreateCompany = ({
  vis,
  closeModal,
  onUpdate,
}: ModalCreateRegisterProps) => {
  const [newCompany, setNewCompany] = useState<Company>({
    id: Date.now(),
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

  const [datePickerVisible, setDatePickerVisible] = useState<boolean>(false);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());

  const _openPicke_ = ()=>{ setDatePickerVisible(true)}
  const _closePicker_ = ()=>{ setDatePickerVisible(false)}

  const handleInputChange = (field: keyof Company, value: string | number) => {
    setNewCompany({
      ...newCompany,
      [field]: value,
    });
  };

  const handleDateConfirm = (date: Date) => {
    setDatePickerVisible(false);
    setSelectedDate(date);
    handleInputChange("fechalimite", date.toISOString().split("T")[0]);
  };

  const _CreateRegister_ = async () => {
    if (newCompany && newCompany.RTN.length > 1 && newCompany.fechalimite) {
      await addCompanies(newCompany);
      Alert.alert("Éxito", "Registro creado correctamente.");
    } else {
      Alert.alert(
        "Falta de Datos",
        "Favor llenar la información para crear un registro."
      );
    }
    closeModal();
    onUpdate();
  };

  return (
    <Modal
      visible={vis}
      onRequestClose={closeModal}
      animationType="slide"
      transparent={true}
    >
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "rgba(0, 0, 0, 0.5)" }}>
        <View style={{ backgroundColor: "white", borderRadius: 10, padding: 10, width: "80%", alignItems: "center" }}>
          <Text style={[styles.bigtitle, { textAlign: "center", marginBottom: 10 }]}>CREAR COMPAÑÍA NUEVA</Text>
          {Object.keys(newCompany).map((key) => (
            <View key={key} style={styles.textbox}>
              {key === "fechalimite" ? (
                <TouchableOpacity onPress={() =>{_openPicke_()}}>
                  <TextInput
                    placeholder="Seleccione la fecha"
                    value={newCompany[key as keyof Company]?.toString() || ""}
                    editable={false}
                    //style={{ borderWidth: 1, borderColor: "#ccc", borderRadius: 5, padding: 10 }}
                  />
                </TouchableOpacity>
              ) : (
                <TextInput
                  placeholder={`Ingrese ${key}`}
                  value={newCompany[key as keyof Company]?.toString() || ""}
                  onChangeText={(text) => handleInputChange(key as keyof Company, text)}
                  //style={{ borderWidth: 1, borderColor: "#ccc", borderRadius: 5, padding: 10, marginVertical: 5 }}
                />
              )}
            </View>
          ))}
          <DatePicker
            modal
            open={datePickerVisible}
            date={selectedDate}
            mode="date"
            onConfirm={handleDateConfirm}
            onCancel={() => _closePicker_()}
          />
          <TouchableOpacity
            style={{ backgroundColor: "#3949ab", borderRadius: 5, marginTop: 15, padding: 10 }}
            onPress={_CreateRegister_}
          >
            <Text style={{ color: "white", textAlign: "center" }}>CREAR</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};
