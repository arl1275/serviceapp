import { View, Text, Button } from "react-native";
import { styles } from "../../assets/styles/styles";
import { useEffect, useState } from "react";
import { DropboxClients } from "../../app/components/dropboxclients";
import { HeadCouting, addCoutingLine, getHCouting } from "../../app/storage/headCouting";
import { CoutingDatail, addCoutingLineDetail } from "../../app/storage/couting";
import { Company } from "../../app/storage/company";

export const CrearFacturaSubPage = () =>{
    const [HeadCount, setHeadCount] = useState<HeadCouting>();
    const [CoutingDetail, setCoutingDetail] = useState<CoutingDatail[]>([]);

    return(
        <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
            <Text style={[styles.bigtitle]}>FACTURACION</Text>
            <View>

            </View>
        </View>
    )
}

const headFacturaConfig = () =>{
    const [IsClientF, setIsClientF] = useState<boolean>(false);
    const [CFName, setCFName] = useState<string>('');

    const chanceState = () =>{setIsClientF(!IsClientF)};
    const UpdateNameCF = (x : string) =>{setCFName(x)}

    return(
        <View>
            <View>
                <Text>Emisor</Text>
                <Button title="ClienteFinal" onPress={chanceState}></Button>
                {
                    IsClientF ? 
                    <View></View> : <DropboxClients selectedvalue={UpdateNameCF} isactive={IsClientF}/>
                }
            </View>
        </View>
    )
}
