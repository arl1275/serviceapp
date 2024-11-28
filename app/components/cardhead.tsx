import { useEffect, useState } from "react";
import { View, Text } from "react-native";
import { styles } from "../../assets/styles/styles";

interface HeadsheetCardProps {
  head: string;
  des: string;
  correo : string;
  contacto : string;
  address : string;
  rtn : string;
}

export const Headsheetcard = ({ head, des, correo, contacto, address, rtn }: HeadsheetCardProps) => {
  const [title, settitle] = useState("");
  const [description, setDescription] = useState("");
  const [_correo, setCorre] = useState("");
  const [_contacto, setContacto ] = useState("");
  const [_address, setAddress] = useState("");
  const [_rtn, setRtn] = useState("");

  useEffect(() => {
    settitle(head);
    setDescription(des);
    setCorre(correo);
    setContacto(contacto);
    setAddress(address);
    setRtn(rtn)
  }, [head, des, correo, contacto, address, rtn]); // Agregar dependencias para evitar renderizados innecesarios

  return (
    <View style={[styles.headsheet, { marginBottom : 0 }]}>
      <View>
        <Text style={[styles.bigtitle, {marginBottom : 10}]}>{title || "TITULO"}</Text>
        <Text style={[styles.title, {color : 'grey'}]}>{_correo || "Correo"}</Text>
        <Text style={[styles.title, {color : 'grey'}]}>{_contacto || "Contacto"}</Text>
        <Text style={[styles.title, {color : 'grey'}]}>{_address || "Direccion"}</Text>
        <Text style={[styles.title, {color : 'grey'}]}>{description || "Descripcion"}</Text>
      </View>
    </View>
  );
};
