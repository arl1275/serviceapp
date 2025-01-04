import { View, Text, Button } from "react-native";
import { useEffect, useState } from "react";
import { HeadCouting, addCoutingLine, getHCouting } from "../../app/storage/headCouting";
import { CoutingDatail, addCoutingLineDetail } from "../../app/storage/couting";

export const CrearFacturaSubPage = () =>{
    const [HeadCount, setHeadCount] = useState<HeadCouting>();
    const [CoutingDetail, setCoutingDetail] = useState<CoutingDatail[]>([]);

    return(
        <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
            <Text>Configuracion</Text>
        </View>
    )
}