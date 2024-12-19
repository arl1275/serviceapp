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
import {
  impuesto,
  Company,
  addCompanies,
  FacturaNumber,
} from "../../app/storage/company";
import DatePicker from "react-native-date-picker";

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
  const [NumeroDeCorrelativo, setNumeroDeCorrelativo] = useState<FacturaNumber>({ id: Date.now(), FirstNumbers: 0, SeconNumbers: 0, thirdNumbers: 0, LastNumbers: 0 });
  const [newCompany, setNewCompany] = useState<Company>({
    id: Date.now(),
    imagen: "",
    nombre: "",
    RTN: "",
    contacto: "",
    correo: "",
    direccion: "",
    CAI: "",
    correlativo: NumeroDeCorrelativo,
    rango: 0,
    fechalimite: "",
    impuesto: [],
  });

  const [datePickerVisible, setDatePickerVisible] = useState<boolean>(false);
  const [selectedDate, setSelectedDate] = useState(new Date());

  const _openPicke_ = () => {
    setDatePickerVisible(true);
  };
  const _closePicker_ = () => {
    setDatePickerVisible(false);
  };

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

  const AddFirstNumber = (val: any) => { setNumeroDeCorrelativo((prevNumber) => ({ ...prevNumber, FirstNumbers: parseInt(val) })) }
  const AddSeconNumber = (val: any) => { setNumeroDeCorrelativo((prevNumber) => ({ ...prevNumber, SeconNumbers: parseInt(val) })) }
  const AddthirdNumbers = (val: any) => { setNumeroDeCorrelativo((prevNumber) => ({ ...prevNumber, thirdNumbers: parseInt(val) })) }
  const AddLastNumbers = (val: any) => { setNumeroDeCorrelativo((prevNumber) => ({ ...prevNumber, LastNumbers: parseInt(val) })) }

  return (
    <Modal
      visible={vis}
      onRequestClose={closeModal}
      animationType="slide"
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
          <Text
            style={[styles.bigtitle, { textAlign: "center", marginBottom: 10 }]}
          >
            CREAR COMPAÑÍA NUEVA
          </Text>
          {Object.keys(newCompany).map((key) => (
            <View key={key} style={styles.textbox}>
              {key === "fechalimite" ? (
                <TouchableOpacity
                  onPress={() => {
                    _openPicke_();
                  }}
                >
                  <TextInput
                    placeholder="Seleccione la fecha"
                    value={newCompany[key as keyof Company]?.toString() || ""}
                    editable={false}
                  //style={{ borderWidth: 1, borderColor: "#ccc", borderRadius: 5, padding: 10 }}
                  />
                </TouchableOpacity>
              ) :
                key === "correlativo" ? (
                  <View style={[styles.rowContainer, {elevation : 0}]}>
                    <TextInput placeholder="Ingrese FNumero" onChangeText={(value: string) => AddFirstNumber(value)} />
                      <Text>-</Text>
                    <TextInput placeholder="Ingrese SNumero" onChangeText={(value: string) => AddSeconNumber(value)} />
                    <Text>-</Text>
                    <TextInput placeholder="Ingrese TNumero" onChangeText={(value: string) => AddthirdNumbers(value)} />
                    <Text>-</Text>
                    <TextInput placeholder="Ingrese LNumero" onChangeText={(value: string) => AddLastNumbers(value)} />
                  </View>
                ) : (
                  <TextInput
                    placeholder={`Ingrese ${key}`}
                    value={newCompany[key as keyof Company]?.toString() || ""}
                    onChangeText={(text) =>
                      handleInputChange(key as keyof Company, text)
                    }
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
            style={{
              backgroundColor: "#3949ab",
              borderRadius: 5,
              marginTop: 15,
              padding: 10,
            }}
            onPress={_CreateRegister_}
          >
            <Text style={{ color: "white", textAlign: "center" }}>CREAR</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};
