import { View, Text } from "react-native";
import { ServiceSheet } from "../../app/storage/sheetservice";
import { useEffect, useState } from "react";

export const ServiceSheetDetail = ( data: ServiceSheet)=>{
    const [sheet, setsheet] = useState<ServiceSheet>();
    
    useEffect(() => {
        setsheet(data);
    }, [data]);

    return(
        <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>

        </View>
    )
}