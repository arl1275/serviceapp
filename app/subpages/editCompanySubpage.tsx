import { View, Text, TextInput, Image, Button } from "react-native";
import { RouteProp } from "@react-navigation/core/lib/typescript/commonjs/src";
import { CompaniesParamList } from "../../app/_layout";
import { styles } from "../../assets/styles/styles";
import { Company, FacturaNumber, updateCompanies } from "../../app/storage/company";
import { useEffect, useState } from "react";

type CompanyDetailProps = {
    route: RouteProp<CompaniesParamList, "EditCopany">;
}

export const EditCompanySubPage = ({ route }: CompanyDetailProps) => {
    const { _data_ } = route.params;
    const [editedCompany, SetEditedCompany] = useState<Company>(_data_);
    const [NumeroDeCorrelativo, setNumeroDeCorrelativo] = useState<FacturaNumber>(_data_.correlativo)
    const AddFirstNumber = (val: any) => { setNumeroDeCorrelativo((prevNumber) => ({ ...prevNumber, FirstNumbers: parseInt(val) })) }
    const AddSeconNumber = (val: any) => { setNumeroDeCorrelativo((prevNumber) => ({ ...prevNumber, SeconNumbers: parseInt(val) })) }
    const AddthirdNumbers = (val: any) => { setNumeroDeCorrelativo((prevNumber) => ({ ...prevNumber, thirdNumbers: parseInt(val) })) }
    const AddLastNumbers = (val: any) => { setNumeroDeCorrelativo((prevNumber) => ({ ...prevNumber, LastNumbers: parseInt(val) })) }

    const _UpdateCompany_ = async () => {
        const updatedCompany = { ...editedCompany, correlativo: NumeroDeCorrelativo };
        await updateCompanies( updatedCompany.id, updatedCompany);
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


    return (
        <View>
            <View style={[styles.rowContainer]}>
                <View style={{ marginTop: 10 }}>
                    <TextInput placeholder={editedCompany?.nombre} style={[styles.textbox_edit]} onChangeText={(e : string)=>{handleInputChange("nombre", e)}}/>
                    <TextInput placeholder={editedCompany?.CAI} style={[styles.textbox_edit]} onChangeText={(e : string)=>{handleInputChange("CAI", e)}}/>
                    <TextInput placeholder={editedCompany?.RTN} style={[styles.textbox_edit]} onChangeText={(e : string)=>{handleInputChange("RTN", e)}}/>
                    <TextInput placeholder={editedCompany?.rango.toString()} style={[styles.textbox_edit]} onChangeText={(e : string)=>{handleInputChange("rango", e)}}/>
                    <TextInput placeholder={editedCompany?.contacto} style={[styles.textbox_edit]} onChangeText={(e : string)=>{handleInputChange("contacto", e)}}/>
                    <View style={[styles.rowContainer, { elevation: 0 }]}>
                        <TextInput placeholder={NumeroDeCorrelativo.FirstNumbers.toString()} onChangeText={(value: string) => AddFirstNumber(value)} style={[styles.textbox_edit]} />
                        <Text>-</Text>
                        <TextInput placeholder={NumeroDeCorrelativo.SeconNumbers.toString()} onChangeText={(value: string) => AddSeconNumber(value)} style={[styles.textbox_edit]} />
                        <Text>-</Text>
                        <TextInput placeholder={NumeroDeCorrelativo.thirdNumbers.toString()} onChangeText={(value: string) => AddthirdNumbers(value)} style={[styles.textbox_edit]} />
                        <Text>-</Text>
                        <TextInput placeholder={NumeroDeCorrelativo.LastNumbers.toString()} onChangeText={(value: string) => AddLastNumbers(value)} style={[styles.textbox_edit]} />
                    </View>
                    <TextInput placeholder={editedCompany?.correo} style={[styles.textbox_edit]} onChangeText={(e : string)=>{handleInputChange("correo", e)}} />
                    <TextInput placeholder={editedCompany?.direccion} style={[styles.textbox_edit]} onChangeText={(e : string)=>{handleInputChange("direccion", e)}}/>
                    <Image
                        source={{ uri: `file://${editedCompany?.imagen}` }} // Asegúrate de que _data_.imagen sea una URL válida
                        style={[styles.image_edit]}
                    />
                    <TextInput />
                </View>

                <Button title="GUARDAR CAMBIOS" onPress={()=>{_UpdateCompany_()}}/>
            </View>
        </View>
    )
}