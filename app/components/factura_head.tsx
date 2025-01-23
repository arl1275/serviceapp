import { useState, useEffect } from "react";
import { Text, View, TextInput, Button } from "react-native";
import { userBillName } from "../../app/storage/headCouting";
import { Company, filterCompanyByName } from "../../app/storage/company";
import { styles } from "../../assets/styles/styles";
import { DropboxCompany } from "../../app/components/dropboxCompany";
import { DropboxClients } from "./dropboxclients";
import { HeadSheet, filterHeadSheetsByTitle } from "../../app/storage/headservice";

interface props {
    OnSaveFactura : () => void;
    onSaveValue: (NewValue: userBillName) => void;
    onSaveCompany: (NewValue: Company) => void;
}

export const HeadFacturaConfig: React.FC<props> = ({ onSaveCompany, onSaveValue, OnSaveFactura }) => {
    const [IsClientF, setIsClientF] = useState<boolean>(false);
    const [company, setCompany] = useState<string>('')
    const [NameFact, setNameFact] = useState<userBillName>({ name: 'Cliente Final', RTN: '000-00-00-000000' })
    const _onSaveValue_ = () => { onSaveValue(NameFact) };
    const _onActiveClient_ = () => { setIsClientF(!IsClientF) };
    const _omSAveCompany_ = async () => {
        const ValueCompany: Company[] | null = await filterCompanyByName(company);
        if (ValueCompany && ValueCompany.length > 0) { onSaveCompany(ValueCompany[0]) }
    }

    const resultBytitle = async (title: string) => {
        const value: HeadSheet[] = await filterHeadSheetsByTitle(title);
        return value.length > 0 ? value[0].rtn : '000-00-00-000000';
    }

    const UpdateNameCF = async (ClientName: string) => {
        _updateNameFActura_("name", ClientName);
        _updateNameFActura_("RTN", await resultBytitle(ClientName));
    }
    const _updateNameFActura_ = (param: string, value: string) => { setNameFact((prev) => ({ ...prev, [param]: value, })) }

    const onfinish = async () => {
        await _omSAveCompany_();
        _onSaveValue_()
    }

    const FinishDetailHeadFactura = async () =>{
        await onfinish();
        OnSaveFactura()
    }

    useEffect(() => {
        onfinish();
    }, [NameFact]);

    return (
        <View style={[styles.card, { borderWidth: 1, borderColor: 'grey', padding: 5 }]}>
            <View style={[styles.card, { padding: 5 }]} >
                <Text style={styles.title}>Emisor</Text>
                <View onPointerEnter={_onActiveClient_}>
                    <DropboxCompany isactive={IsClientF} selectedvalue={setCompany} />
                </View>
            </View>
            <View style={[styles.card]}>
                <Text style={styles.title}>Cliente</Text>

                <View onPointerEnter={_onActiveClient_} style={[styles.card, { display: 'flex', flexDirection: 'row' }]}>
                    <TextInput placeholder={NameFact.name} onChangeText={(e: string) => _updateNameFActura_("name", e)} style={[styles.textbox_edit]} />
                    <TextInput placeholder={NameFact.RTN} onChangeText={(e: string) => _updateNameFActura_("RTN", e)} style={[styles.textbox_edit]} />
                    <DropboxClients selectedvalue={UpdateNameCF} isactive={IsClientF} />
                </View>
            </View>

            <View style={[{borderRadius : 10}]}>
                <Button title="Guardar" color={'blue'} onPress={FinishDetailHeadFactura}/>
            </View>
        </View>
    )
}
