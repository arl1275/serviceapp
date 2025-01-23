import { View, Text, Button, TextInput } from "react-native";
import { styles } from "../../assets/styles/styles";
import { useEffect, useState } from "react";
import { DropboxClients } from "../../app/components/dropboxclients";
import { HeadCouting, addCoutingLine, getHCouting, userBillName } from "../../app/storage/headCouting";
import { CoutingDatail, addCoutingLineDetail } from "../../app/storage/couting";
import { HeadSheet, filterHeadSheetsByTitle } from "../../app/storage/headservice";
import { Company } from "../../app/storage/company";
import { HeadFacturaConfig } from "../../app/components/factura_head";

export const CrearFacturaSubPage = () => {
    const [HeadCount, setHeadCount] = useState<HeadCouting>();
    const [CoutingDetail, setCoutingDetail] = useState<CoutingDatail[]>();
    const [savedHead, setSavedHead] = useState<boolean>(false);
    //-- detail bill head 
    const [DetailUser, setDetailUser] = useState<userBillName>();
    const [DetailComp, setDetailComp] = useState<Company>()
    const SaveHeadFacturaFinish = () => { setSavedHead(!savedHead) };
    const _onSaveUserBill = (NewValue: userBillName) => { setDetailUser(NewValue) };
    const _onSaveCompany = (NewValue: Company) => { setDetailComp(NewValue) }

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text style={[styles.bigtitle]}>FACTURACION</Text>
            {
                savedHead === false ?
                    <View>
                        <HeadFacturaConfig onSaveValue={_onSaveUserBill} onSaveCompany={_onSaveCompany} OnSaveFactura={SaveHeadFacturaFinish} />
                    </View>
                    :
                    <View>
                        <Text style={styles.title}>{DetailUser?.name}</Text>
                        <Text style={styles.title}>{DetailComp?.nombre}</Text>
                    </View>
            }

        </View>
    )
}

