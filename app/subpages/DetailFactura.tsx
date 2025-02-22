//-- navegation
import { FacturasParamList } from "../../app/_layout";
import { StackNavigationProp } from "@react-navigation/stack";
import { useNavigation } from "@react-navigation/native";

//-- others
import { styles } from "../../assets/styles/styles";
import { View, Text } from "react-native";

type HomeScreenNavigationProp = StackNavigationProp<FacturasParamList, "homeFactura">;

export const FacturaDetail = ()=> {

    return(
        <View>

        </View>
    )
}