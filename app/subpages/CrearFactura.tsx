import { View, Text, Button, TextInput } from "react-native";
import { styles } from "../../assets/styles/styles";
import { RegisterCountingLine } from "../../app/components/registerLINECountingbutton";
import { useEffect, useState } from "react";
import { DropboxClients } from "../../app/components/dropboxclients";
import { HeadCouting, addCoutingLine, getHCouting, userBillName } from "../../app/storage/headCouting";
import { CoutingDatail, addCoutingLineDetail, deleteCouting, updateCoutinh } from "../../app/storage/couting";
import { HeadSheet, filterHeadSheetsByTitle } from "../../app/storage/headservice";
import { Company } from "../../app/storage/company";
import { HeadFacturaConfig } from "../../app/components/factura_head";
import { SavedUSerFactura } from "../../app/components/HeadFactura_SAVED";

export const CrearFacturaSubPage = () => {
    const [HeadCount, setHeadCount] = useState<HeadCouting>();
    const [CoutingDetail, setCoutingDetail] = useState<CoutingDatail[]>([]);
    const [savedHead, setSavedHead] = useState<boolean>(false);
    //-- detail bill head 
    const [DetailUser, setDetailUser] = useState<userBillName>({name : 'N/A', RTN : 'N/A'});
    const [DetailComp, setDetailComp] = useState<Company>()
    const SaveHeadFacturaFinish = () => { setSavedHead(!savedHead) };
    const _onSaveUserBill = (NewValue_: userBillName) => { setDetailUser(NewValue_) };
    const _onSaveCompany = (NewValue: Company) => { setDetailComp(NewValue) };
    const CancelFActura = () =>{setSavedHead(false)};

    const AddCountingLineDet = (value : CoutingDatail) =>{setCoutingDetail((prev)=>[ ...prev, value])};
    const DeleteCoutingLineDet = (id: number) => {
        setCoutingDetail(CoutingDetail.filter((item: CoutingDatail) => item.id !== id));
    };
    


    return (
        <View style={{ flex: 1, alignItems: 'center' }}>
            <Text style={[styles.bigtitle, {margin : 7}]}>{savedHead ? "FACTURA" : "DETALLE FACTURA"}</Text>
            {
                savedHead === false ?
                    <View style={[styles.card, { borderWidth: 1, borderColor: 'grey'}]}>
                        <HeadFacturaConfig onSaveValue={_onSaveUserBill} onSaveCompany={_onSaveCompany} OnSaveFactura={SaveHeadFacturaFinish} />
                    </View>
                    :
                    <View>
                        <SavedUSerFactura _OnCancel_={CancelFActura} empresa={DetailComp} Usuario={DetailUser}/>
                        <RegisterCountingLine 
                            addCoutingLine={AddCountingLineDet} 
                            DeleteCoutingLine={DeleteCoutingLineDet} 
                            editCoutingLine={updateCoutinh} 
                            data={CoutingDetail} 
                            id_head_Couting={0} 
                            id_head_sheet={null} 
                            />
                    </View>
            }

        </View>
    )
}

