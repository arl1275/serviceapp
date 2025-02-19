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

export const CrearFacturaSubPage = () => {
    //-- Detail of the head of the bill
    const [HeadCount, setHeadCount] = useState<HeadCouting>();
    const [CoutingDetail, setCoutingDetail] = useState<CoutingDatail[]>([]);
    const [FacturaNumber_, setFactnumber_] = useState<FacturaNumber>();
    const [savedHead, setSavedHead] = useState<boolean>(false);

    //-- detail bill head 
    const [DetailUser, setDetailUser] = useState<userBillName>({ name: 'N/A', RTN: 'N/A' });
    const [DetailComp, setDetailComp] = useState<Company>();
    const SaveHeadFacturaFinish = () => { setSavedHead(!savedHead) };
    const _onSaveUserBill = (NewValue_: userBillName) => { setDetailUser(NewValue_) };
    const _onSaveCompany = (NewValue: Company) => { setDetailComp(NewValue) };
    const _onSaveFacturaNumberFen_ = (value: FacturaNumber) => { setFactnumber_(value) }
    const CancelFActura = () => { setSavedHead(false) };

    const AddCountingLineDet = (value: CoutingDatail) => { setCoutingDetail((prev) => [...prev, value]) };
    const DeleteCoutingLineDet = (id: number) => {
        setCoutingDetail(CoutingDetail.filter((item: CoutingDatail) => item.id !== id));
    };

    const GenerateHeadFacturaObject = () => {
        if (FacturaNumber_ && DetailUser && DetailComp) {
            setHeadCount({
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
            })
        } else {
            alert('Please fill all the fields')
        }
    }

    const GenerateLinesOfFactura = () => {
        CoutingDetail ?
            CoutingDetail.map(async (item: CoutingDatail) => await addCoutingLineDetail(item)) :
            Alert.alert('Sin Lineas', 'Esta Factura no tiene lineas para registrar.')
    }

    const GenerateFactura = async () => {
        if (HeadCount) {
            GenerateHeadFacturaObject();
            await addHeadCouting(HeadCount);
            GenerateLinesOfFactura();
        }
    }


    return (
        <View style={{ flex: 1, alignItems: 'center' }}>
            <Text style={[styles.bigtitle, { margin: 7 }]}>{savedHead ? "FACTURA" : "DETALLE FACTURA"}</Text>
            {
                savedHead === false ?
                    <View style={[styles.card, { borderWidth: 1, borderColor: 'grey', backgroundColor: 'white' }]}>
                        <HeadFacturaConfig onSaveValue={_onSaveUserBill} onSaveCompany={_onSaveCompany} OnSaveFactura={SaveHeadFacturaFinish} />
                    </View>
                    :
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

