import { View, Text, Alert, ActivityIndicator } from "react-native";
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
import { GenerateFacturaNumber } from "../../app/utils/FacturasFuncs";

type HomeScreenNavigationProp = StackNavigationProp<FacturasParamList, "homeFactura">;

export const CrearFacturaSubPage = () => {
    //-- navigation
    const navigation = useNavigation<HomeScreenNavigationProp>();
    //-- Detail of the head of the bill
    const [HeadCount, setHeadCount] = useState<HeadCouting | null>(null);
    const [CoutingDetail, setCoutingDetail] = useState<CoutingDatail[]>([]);
    const [FacturaNumber_, setFactnumber_] = useState<FacturaNumber | null>(null);
    const [savedHead, setSavedHead] = useState<boolean>(false);
    const [loading, setLoading] = useState(false);

    //-- Detail bill head 
    const [DetailUser, setDetailUser] = useState<userBillName>({ name: 'N/A', RTN: 'N/A' });
    const [DetailComp, setDetailComp] = useState<Company | null>(null);

    const SaveHeadFacturaFinish = async () => {
        setLoading(true);
        
        if (!DetailComp) {
            Alert.alert('ERROR', 'No se puede generar la factura sin una empresa.');
            setLoading(false);
            return;
        }
    
        const newFactNumber = await GenerateFacturaNumber(DetailComp.id);
        if (!newFactNumber) {
            Alert.alert('Error', 'Error al generar la factura.');
            setLoading(false);
            return;
        }
    
        setFactnumber_(newFactNumber);
    
        if (!DetailUser || !DetailComp) {
            Alert.alert("Error de generación",
                `Faltan datos para generar la factura.
             Numero de Factura: ${newFactNumber.LastNumbers}
             Usuario: ${DetailUser?.name} - ${DetailUser?.RTN}
             Empresa: ${DetailComp?.nombre} - ${DetailComp?.RTN}`);
            setLoading(false);
            return;
        }
    
        const newHeadCouting: HeadCouting = {
            id: Date.now(),
            _NumberOfBill_: newFactNumber,
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
        setSavedHead(true);
        setLoading(false);
    };
    

    const _onSaveUserBill = (NewValue_: userBillName) => { setDetailUser(NewValue_) };
    const _onSaveCompany = (NewValue: Company) => { setDetailComp(NewValue) };
    const CancelFActura = () => { setSavedHead(false) };

    const AddCountingLineDet = (value: CoutingDatail) => { setCoutingDetail(prev => [...prev, value]) };
    const DeleteCoutingLineDet = (id: number) => { setCoutingDetail(prev => prev.filter((item) => item.id !== id)) };

    const GenerateFactura = async () => {
        if (!FacturaNumber_ || !HeadCount || !DetailUser || !DetailComp || CoutingDetail.length === 0) {
            Alert.alert("Error", "Faltan datos para generar la factura. Falta Empresa, Cliente");
            return;
        }

        await addHeadCouting(HeadCount);
        CoutingDetail.map( async (item)=>{ await addCoutingLineDetail(item)});
        navigation.navigate('homeFactura')
    };

    return (
        <View style={{ flex: 1, alignItems: 'center' }}>
            <Text style={[styles.bigtitle, { margin: 7 }]}>{savedHead ? "FACTURA" : "DETALLE FACTURA"}</Text>
            {
                !savedHead ?(
                    <View style={[styles.card, { borderWidth: 1, borderColor: 'grey', backgroundColor: 'white' }]}>
                        <HeadFacturaConfig
                            onSaveValue={_onSaveUserBill}
                            onSaveCompany={_onSaveCompany}
                            OnSaveFactura={SaveHeadFacturaFinish}
                        />
                        {
                            loading && <ActivityIndicator size="small" color="#0000ff"/>
                        }
                    </View>
                    )
                    : (
                        <View>
                            <SavedUSerFactura
                                _OnCancel_={CancelFActura}
                                empresa={DetailComp}
                                Usuario={DetailUser}
                                _OnGenerateFactura_={GenerateFactura}
                                HEadFact={HeadCount && HeadCount}
                            />
                            <RegisterCountingLine
                                addCoutingLine={AddCountingLineDet}
                                DeleteCoutingLine={DeleteCoutingLineDet}
                                //editCoutingLine={ }
                                data={CoutingDetail}
                                id_head_Couting={HeadCount}
                                id_head_sheet={null}
                            />
                        </View>
                    )}
        </View>
    );
};
