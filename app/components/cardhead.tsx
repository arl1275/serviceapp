import { useEffect, useState } from "react";
import { View, Text } from "react-native";
import { styles } from "../../assets/styles/styles";
import { Ionicons } from "@expo/vector-icons/build/Icons";
import { ClientesParamList } from "../../app/_layout";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { HeadSheet } from "../../app/storage/headservice";

interface HeadsheetCardProps {
 data : HeadSheet
}
type HomeScreenNavigationProp = StackNavigationProp<ClientesParamList, "homeClient">;

export const Headsheetcard = ({ data }: HeadsheetCardProps) => {
  const navigation = useNavigation<HomeScreenNavigationProp>();
  const [value, setvalue] = useState<HeadSheet>();

  useEffect(() => {
    setvalue(data);
  }, [data]);

  return (
    <View style={[styles.headsheet, { marginBottom : 0 }]}>
      <View>
        <Text style={[styles.bigtitle, {marginBottom : 10}]}>{value?.title}</Text>
        <Text style={[styles.title, {color : 'grey'}]}>{value?.correo}</Text>
        <Text style={[styles.title, {color : 'grey'}]}>{value?.contacto}</Text>
        <Text style={[styles.title, {color : 'grey'}]}>{value?.address}</Text>
        <Text style={[styles.title, {color : 'grey'}]}>{value?.description}</Text>
      </View>
      <View>
        <Ionicons 
        name="pencil"
        onPress={()=>{navigation.navigate('editClient', {_data_ : data}) }}/>
      </View>
    </View>
  );
};
