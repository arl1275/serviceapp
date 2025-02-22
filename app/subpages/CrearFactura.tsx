import { View, Text, Alert } from "react-native";
import { styles } from "../../assets/styles/styles";
import { RegisterCountingLine } from "../../app/components/registerLINECountingbutton";
import { useEffect, useState } from "react";
import { HeadCouting, addHeadCouting, getHCouting, userBillName } from "../../app/storage/headCouting";
import { CoutingDatail, addCoutingLineDetail, updateCoutinh } from "../../app/storage/couting";
// import { HeadSheet, filterHeadSheetsByTitle } from "../../app/storage/headservice"; -- this is to link the factura to a servicesheet
import { Company, FacturaNumber } from "../../app/storage/company";
import { HeadFacturaConfig } from "../../app/components/factura_head";
import { SavedUSerFactura } from "../../app/components/HeadFactura_SAVED";
import { getFormattedDate } from "../../app/modals/crear_service_detail";
// navegation
import { RouteProp } from "@react-navigation/native";
import { FacturasParamList } from "../../app/_layout";
import { StackNavigationProp } from "@react-navigation/stack";
import { useNavigation } from "@react-navigation/native";

type HomeScreenNavigationProp = StackNavigationProp<FacturasParamList, "homeFactura">;

export const CrearFacturaSubPage = () => {
    //-- navigation
    const navigation = useNavigation<HomeScreenNavigationProp>();
    //-- Detail of the head of the bill
    const [HeadCount, setHeadCount] = useState<HeadCouting | null>(null);
    const [CoutingDetail, setCoutingDetail] = useState<CoutingDatail[]>([]);
    const [FacturaNumber_, setFactnumber_] = useState<FacturaNumber | null>(null);
    const [savedHead, setSavedHead] = useState<boolean>(false);

    //-- Detail bill head 
    const [DetailUser, setDetailUser] = useState<userBillName>({ name: 'N/A', RTN: 'N/A' });
    const [DetailComp, setDetailComp] = useState<Company | null>(null);

    const SaveHeadFacturaFinish = () => { setSavedHead(!savedHead) };
    const _onSaveUserBill = (NewValue_: userBillName) => { setDetailUser(NewValue_) };
    const _onSaveCompany = (NewValue: Company) => { setDetailComp(NewValue) };
    const _onSaveFacturaNumberFen_ = (value: FacturaNumber) => { setFactnumber_(value) };
    const CancelFActura = () => { setSavedHead(false) };

    const AddCountingLineDet = (value: CoutingDatail) => { setCoutingDetail(prev => [...prev, value]) };
    const DeleteCoutingLineDet = (id: number) => { setCoutingDetail(prev => prev.filter((item) => item.id !== id)) };

    const GenerateFactura = async () => {
        if (!FacturaNumber_ || !DetailUser || !DetailComp || CoutingDetail.length === 0) {
            Alert.alert("Error", "Faltan datos para generar la factura. Falta Empresa, Cliente");
            return;
        }

        CoutingDetail.map(async (item : CoutingDatail) => await addCoutingLineDetail(item)) 

        const newHeadCouting: HeadCouting = {
            id: Date.now(),
            _NumberOfBill_: FacturaNumber_,
            ClientName: DetailUser,
            _date_: getFormattedDate(),
            isClosed: false,
            isDeleted: false,
            hasPDFgenerated: false,
            isExported: false,
            isLinkedOnSherviceSheet: false,
            LinkedSherviceSheet: 0,
            hasCreditNote: false,
            id_CreditNote: null,
            isCanceled: false,
            id_Company_Related: DetailComp.id
        };

        setHeadCount(newHeadCouting);
        await addHeadCouting(newHeadCouting);
        //await GenerateFactura();
        navigation.navigate('homeFactura')
    };

    return (
        <View style={{ flex: 1, alignItems: 'center' }}>
            <Text style={[styles.bigtitle, { margin: 7 }]}>{savedHead ? "FACTURA" : "DETALLE FACTURA"}</Text>
            {
                !savedHead ?
                    <View style={[styles.card, { borderWidth: 1, borderColor: 'grey', backgroundColor: 'white' }]}>
                        <HeadFacturaConfig onSaveValue={_onSaveUserBill} onSaveCompany={_onSaveCompany} OnSaveFactura={SaveHeadFacturaFinish} />
                    </View>
                    : (
                        <View>
                            <SavedUSerFactura
                                _OnCancel_={CancelFActura}
                                empresa={DetailComp}
                                Usuario={DetailUser}
                                _OnGenerateFactura_={GenerateFactura}
                                _OnSaveFacturaNummber_={_onSaveFacturaNumberFen_}
                            />
                            <RegisterCountingLine
                                addCoutingLine={AddCountingLineDet}
                                DeleteCoutingLine={DeleteCoutingLineDet }
                                //editCoutingLine={ }
                                data={CoutingDetail}
                                id_head_Couting={HeadCount ? HeadCount.id : 0}
                                id_head_sheet={null}
                            />
                        </View>
                    )}
        </View>
    );
};
