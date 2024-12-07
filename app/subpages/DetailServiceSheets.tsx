import { View, Text } from "react-native";
import { ServiceSheet } from "../../app/storage/sheetservice";
import { useEffect, useState } from "react";
import { styles } from "../../assets/styles/styles";

export const ServiceSheetDetail = ( ) =>{
    const [sheet, setsheet] = useState<ServiceSheet>();
    
    // useEffect(() => {
    //     setsheet(data);
    // }, [data]);

    return(
        <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
            <View style={[ styles.card]}>
                <Text style={styles.title}>hola mundo</Text>
                {/*<Text style={styles.parrafo}>{data.cliente_detalle}</Text> */}
            </View>

        </View>
    )
}