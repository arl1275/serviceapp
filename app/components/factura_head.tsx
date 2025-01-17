import { useState, useEffect } from "react";
import { Text, View, TextInput } from "react-native";
import { userBillName } from "../../app/storage/headCouting";
import { Company } from "../../app/storage/company";
import { styles } from "../../assets/styles/styles";
import { DropboxCompany } from "../../app/components/dropboxCompany";
import { DropboxClients } from "./dropboxclients";
import { HeadSheet, filterHeadSheetsByTitle } from "../../app/storage/headservice";

interface props {
    onSaveValue: (NewValue : userBillName) => void;
    onSaveCompany: (NewValue : Company) => void;
}

export const HeadFacturaConfig: React.FC<props> = ({onSaveCompany, onSaveValue}) => {
    const [IsClientF, setIsClientF] = useState<boolean>(false);
    const [company, setCompany] = useState<string>('')
    const [NameFact, setNameFact] = useState<userBillName>({ name: 'Cliente Final', RTN: '000-00-00-000000' })
    const _onSaveValue_ = () => { onSaveValue(NameFact) };

    const resultBytitle = async (title: string) => {
        const value: HeadSheet[] = await filterHeadSheetsByTitle(title);
        return value.length > 0 ? value[0].rtn : '000-00-00-000000';
    }

    const UpdateNameCF = async (ClientName: string) => {
        _updateNameFActura_("name", ClientName);
        _updateNameFActura_("RTN", await resultBytitle(ClientName));
    }
    const _updateNameFActura_ = (param: string, value: string) => { setNameFact((prev) => ({ ...prev, [param]: value, })) }

    useEffect(() => {
        _onSaveValue_()
    }, [NameFact]);

    return (
        <View>
            <View>
                <Text style={styles.title}>Emisor</Text>
                <View>
                    <DropboxCompany isactive={IsClientF} selectedvalue={setCompany}/>
                </View>
            </View>
            <View>
                <Text style={styles.title}>Cliente</Text>
                <View>
                    <TextInput placeholder={NameFact.name} onChangeText={(e: string) => _updateNameFActura_("name", e)} />
                    <TextInput placeholder={NameFact.RTN} onChangeText={(e: string) => _updateNameFActura_("RTN", e)} />
                    <DropboxClients selectedvalue={UpdateNameCF} isactive={IsClientF} />
                </View>
            </View>
        </View>
    )
}
