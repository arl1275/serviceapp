import { View, Text, Button, TextInput } from "react-native";
import { styles } from "../../assets/styles/styles";
import { useEffect, useState } from "react";
import { DropboxClients } from "../../app/components/dropboxclients";
import { HeadCouting, addCoutingLine, getHCouting, userBillName } from "../../app/storage/headCouting";
import { CoutingDatail, addCoutingLineDetail } from "../../app/storage/couting";
import { HeadSheet, filterHeadSheetsByTitle } from "../../app/storage/headservice";
import { Company } from "../../app/storage/company";
import { DropboxCompany } from "../../app/components/dropboxCompany";

export const CrearFacturaSubPage = () => {
    const [HeadCount, setHeadCount] = useState<HeadCouting>();
    const [CoutingDetail, setCoutingDetail] = useState<CoutingDatail[]>([]);

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text style={[styles.bigtitle]}>FACTURACION</Text>
            <View>

            </View>
        </View>
    )
}

const headFacturaConfig = (onSaveValue: (value: userBillName) => void, onSaveCompany : (value : Company)=> void) => {
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
        _updateNameFActura_("RTN", await resultBytitle(ClientName))
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
