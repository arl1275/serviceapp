import { View, Text, TouchableOpacity, Button} from "react-native";
import { FacturasParamList } from "../_layout";
import { StackNavigationProp } from "@react-navigation/stack";
import { useNavigation } from "@react-navigation/native";
import { styles } from "../../assets/styles/styles";
import { CoutingDatail, getCouting } from "../../app/storage/couting";
import React, { useState, useEffect, useCallback} from "react";

type HomeScreenNavigationProp = StackNavigationProp<FacturasParamList, "homeFactura">;

export const FacturasPage = () =>{
  const navigation = useNavigation<HomeScreenNavigationProp>();
  const [ data, setData] = useState<CoutingDatail[]>([]);

  const _onUpdate_ = useCallback(()=>{

  }, [])
  
    return(
        <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
          
          <View>
            <Button title="Crear Factura"  onPress={()=> navigation.navigate('CrearFActura')}/>
          </View>
          
        </View>
    )
}