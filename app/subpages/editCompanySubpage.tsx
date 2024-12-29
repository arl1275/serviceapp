import { View, Text, TextInput, Image, Button } from "react-native";
import { RouteProp, useNavigation } from "@react-navigation/native";
import { CompaniesParamList } from "../../app/_layout";
import { styles } from "../../assets/styles/styles";
import { Company, FacturaNumber, updateCompanies } from "../../app/storage/company";
import { useEffect, useState } from "react";
import { AddLogoComponent } from "../../app/components/addlogocompany";
import { StackNavigationProp } from "@react-navigation/stack";

type CompanyDetailProps = {
    route: RouteProp<CompaniesParamList, "EditCopany">;
}

type CompaniesStackNavigation = StackNavigationProp<CompaniesParamList, 'homeCompany'>;

export const EditCompanySubPage = ({ route }: CompanyDetailProps) => {
    const navigation = useNavigation<CompaniesStackNavigation>();
    const { _data_ } = route.params;
    const [editedCompany, SetEditedCompany] = useState<Company>(_data_);
    const [NumeroDeCorrelativo, setNumeroDeCorrelativo] = useState<FacturaNumber>(_data_.correlativo)
    const AddFirstNumber = (val: any) => { setNumeroDeCorrelativo((prevNumber) => ({ ...prevNumber, FirstNumbers: parseInt(val) })) }
    const AddSeconNumber = (val: any) => { setNumeroDeCorrelativo((prevNumber) => ({ ...prevNumber, SeconNumbers: parseInt(val) })) }
    const AddthirdNumbers = (val: any) => { setNumeroDeCorrelativo((prevNumber) => ({ ...prevNumber, thirdNumbers: parseInt(val) })) }
    const AddLastNumbers = (val: any) => { setNumeroDeCorrelativo((prevNumber) => ({ ...prevNumber, LastNumbers: parseInt(val) })) }

    const _UpdateCompany_ = async () => {
        const updatedCompany = { ...editedCompany, correlativo: NumeroDeCorrelativo };
        await updateCompanies(updatedCompany.id, updatedCompany);
        navigation.navigate('homeCompany')
    }

    useEffect(() => {
        SetEditedCompany(_data_);
        setNumeroDeCorrelativo(_data_.correlativo);
    }, [route]);

    const handleInputChange = (field: keyof Company, value: string | number) => {
        SetEditedCompany({
            ...editedCompany,
            [field]: value,
        });
    };

    const onChangeLogo = (e: string) => {
        handleInputChange("imagen", e);
    }


    return (
        <View>
            <Text style={[styles.bigtitle, { textAlign: 'center' }]}>EDICION DE EMPRESA</Text>
            <View style={[styles.rowContainer, { alignSelf: 'center' }]}>
                <View style={{ marginTop: 10 }}>
                    <TextInput placeholder={'NOMBRE: ' + editedCompany?.nombre} style={[styles.textbox_edit]} onChangeText={(e: string) => { handleInputChange("nombre", e) }} />
                    <TextInput placeholder={'CAI: ' + editedCompany?.CAI} style={[styles.textbox_edit]} onChangeText={(e: string) => { handleInputChange("CAI", e) }} />
                    <TextInput placeholder={'RTN: ' + editedCompany?.RTN} style={[styles.textbox_edit]} onChangeText={(e: string) => { handleInputChange("RTN", e) }} />
                    <TextInput placeholder={'RANGO: ' + editedCompany?.rango.toString()} style={[styles.textbox_edit]} onChangeText={(e: string) => { handleInputChange("rango", e) }} />
                    <TextInput placeholder={'CONTACTO: ' + editedCompany?.contacto} style={[styles.textbox_edit]} onChangeText={(e: string) => { handleInputChange("contacto", e) }} />
                    <View style={[styles.rowContainer, { elevation: 0 }]}>
                        <TextInput placeholder={NumeroDeCorrelativo.FirstNumbers.toString()} onChangeText={(value: string) => AddFirstNumber(value)} style={[styles.textbox_edit]} />
                        <Text>-</Text>
                        <TextInput placeholder={NumeroDeCorrelativo.SeconNumbers.toString()} onChangeText={(value: string) => AddSeconNumber(value)} style={[styles.textbox_edit]} />
                        <Text>-</Text>
                        <TextInput placeholder={NumeroDeCorrelativo.thirdNumbers.toString()} onChangeText={(value: string) => AddthirdNumbers(value)} style={[styles.textbox_edit]} />
                        <Text>-</Text>
                        <TextInput placeholder={NumeroDeCorrelativo.LastNumbers.toString()} onChangeText={(value: string) => AddLastNumbers(value)} style={[styles.textbox_edit]} />
                    </View>
                    <TextInput placeholder={'CORREO: ' + editedCompany?.correo} style={[styles.textbox_edit]} onChangeText={(e: string) => { handleInputChange("correo", e) }} />
                    <TextInput placeholder={'DIRECCION: ' + editedCompany?.direccion} style={[styles.textbox_edit]} onChangeText={(e: string) => { handleInputChange("direccion", e) }} />
                    <View style={[styles.rowContainer, { alignSelf : 'center' }]}>
                        <Image source={{ uri: `file://${editedCompany?.imagen}` }} style={styles.image}/>
                        <View><AddLogoComponent onLogoSelected={onChangeLogo}/></View>
                    </View>
                    <TextInput />
                </View>
            </View>

            <View style={[{ width: '90%', alignSelf: 'center' }]}>
                <Button title="GUARDAR CAMBIOS" onPress={() => { _UpdateCompany_() }} />
            </View>

        </View>
    )
}