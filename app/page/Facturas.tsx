import { View, Text, TouchableOpacity, Button} from "react-native";
import { FacturasLayout, FacturasParamList } from "../_layout";
import { StackNavigationProp } from "@react-navigation/stack";
import { useNavigation } from "@react-navigation/native";
import { styles } from "../../assets/styles/styles";

type HomeScreenNavigationProp = StackNavigationProp<FacturasParamList, "homeFactura">;

export const FacturasPage = () =>{
  const navigation = useNavigation<HomeScreenNavigationProp>();
    return(
        <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
           <Button title="Crear Factura"  onPress={()=> navigation.navigate('CrearFActura')}/>
        </View>
    )
}