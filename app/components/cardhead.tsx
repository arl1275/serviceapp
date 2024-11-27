import { useEffect, useState } from "react";
import { View, Text } from "react-native";
import { styles } from "../../assets/styles/styles";

interface HeadsheetCardProps {
  head: string;
  des: string;
}

export const Headsheetcard = ({ head, des }: HeadsheetCardProps) => {
  const [title, settitle] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    settitle(head);
    setDescription(des);
  }, [head, des]); // Agregar dependencias para evitar renderizados innecesarios

  return (
    <View style={[styles.headsheet, { marginBottom : 0 }]}>
      <View>
        <Text style={[styles.bigtitle, {marginBottom : 10}]}>{title || "TITULO"}</Text>
        <Text style={[styles.title, {color : 'grey'}]}>{description || "Descripcion"}</Text>
      </View>
    </View>
  );
};
