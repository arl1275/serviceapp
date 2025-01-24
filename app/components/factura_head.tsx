import { useState, useEffect } from "react";
import { Text, View, TextInput, Button } from "react-native";
import { userBillName } from "../../app/storage/headCouting";
import { Company, filterCompanyByName } from "../../app/storage/company";
import { styles } from "../../assets/styles/styles";
import { DropboxCompany } from "../../app/components/dropboxCompany";
import { DropboxClients } from "./dropboxclients";
import { HeadSheet, filterHeadSheetsByTitle } from "../../app/storage/headservice";

interface props {
    OnSaveFactura: () => void;
    onSaveValue: (NewValue: userBillName) => void;
    onSaveCompany: (NewValue: Company) => void;
}

export const HeadFacturaConfig: React.FC<props> = ({ onSaveCompany, onSaveValue, OnSaveFactura }) => {
    const [IsClientF, setIsClientF] = useState<boolean>(false);
    const [company, setCompany] = useState<string>('')
    const [NameFact, setNameFact] = useState<userBillName>({ name: 'Cliente Final', RTN: '000-00-00-000000' });

    const _onActiveClient_ = () => { setIsClientF(!IsClientF) };

    const resultBytitle = async (title: string) => {
        const value: HeadSheet[] = await filterHeadSheetsByTitle(title);
        return value.length > 0 ? value[0].rtn : '000-00-00-000000';
    }
    const _updateNameFActura_ = (param: string, value: string) => { setNameFact((prev) => ({ ...prev, [param]: value, })) }

    const UpdateNameCF = async (ClientName: string) => {
        _updateNameFActura_("name", ClientName.toString());
        _updateNameFActura_("RTN", await resultBytitle(ClientName));
    }

    const FinishDetailHeadFactura = async () => {
        const compania: Company[] = await filterCompanyByName(company);
        const _UserBill_: userBillName = ({ name: NameFact.name, RTN: NameFact.RTN });
        onSaveCompany(compania[0]);
        onSaveValue(_UserBill_);
        OnSaveFactura();
    }

    return (
        <View style={{display : 'flex', flexDirection : 'column'}}>
            <View onPointerEnter={_onActiveClient_} style={{ }}>
                <DropboxCompany isactive={IsClientF} selectedvalue={setCompany} />
            </View>

            <View style={[ { display: 'flex', flexDirection: 'row', margin : 10 }]}>

                <View style={[{ width: '20%' }]}>
                    <Button title={IsClientF === false ? 'CLIENTE FINAL' : 'CLIENTE EMPRESA'} color={IsClientF ? 'blue' : 'green'} onPress={_onActiveClient_} />
                </View>

                {
                    IsClientF === false ?
                        <View onPointerEnter={_onActiveClient_} style={[{ display: 'flex', flexDirection: 'row', width: 'auto' }]}>
                            <TextInput placeholder={NameFact.name} onChangeText={(e: string) => _updateNameFActura_("name", e)} style={[styles.textbox_edit, {width : '40%'}]} />
                            <TextInput placeholder={NameFact.RTN} onChangeText={(e: string) => _updateNameFActura_("RTN", e)} style={[styles.textbox_edit, {width : '40%'}]} />
                        </View>
                        :
                        <DropboxClients selectedvalue={UpdateNameCF} isactive={IsClientF} />
                }
            </View>

            <View style={[{ borderRadius: 10, padding : 0, margin : 0 }]}>
                <Button title="Guardar" color={'blue'} onPress={FinishDetailHeadFactura} />
            </View>
        </View>
    )
}
