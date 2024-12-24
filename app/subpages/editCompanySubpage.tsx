import { View, Text, TextInput, Image } from "react-native";
import { RouteProp } from "@react-navigation/core/lib/typescript/commonjs/src";
import { CompaniesParamList } from "../../app/_layout";
import { styles } from "../../assets/styles/styles";
import { FacturaNumber } from "../../app/storage/company";
import { useEffect, useState } from "react";

type CompanyDetailProps = {
    route: RouteProp<CompaniesParamList, "EditCopany">;
}

export const EditCompanySubPage = ({ route }: CompanyDetailProps) => {
    const { _data_ } = route.params;
    const [NumeroDeCorrelativo, setNumeroDeCorrelativo] = useState<FacturaNumber>(_data_.correlativo)
    const AddFirstNumber = (val: any) => { setNumeroDeCorrelativo((prevNumber) => ({ ...prevNumber, FirstNumbers: parseInt(val) })) }
    const AddSeconNumber = (val: any) => { setNumeroDeCorrelativo((prevNumber) => ({ ...prevNumber, SeconNumbers: parseInt(val) })) }
    const AddthirdNumbers = (val: any) => { setNumeroDeCorrelativo((prevNumber) => ({ ...prevNumber, thirdNumbers: parseInt(val) })) }
    const AddLastNumbers = (val: any) => { setNumeroDeCorrelativo((prevNumber) => ({ ...prevNumber, LastNumbers: parseInt(val) })) }


    useEffect(() => {
        setNumeroDeCorrelativo(_data_.correlativo);
    }, [route])


    return (
        <View>
            <View style={[styles.rowContainer]}>
                <View style={{ marginTop: 10 }}>
                    <TextInput placeholder={_data_.nombre} style={[styles.textbox]} />
                    <TextInput placeholder={_data_.CAI} style={[styles.textbox]} />
                    <TextInput placeholder={_data_.RTN} style={[styles.textbox]} />
                    <TextInput placeholder={_data_.rango.toString()} style={[styles.textbox]} />
                    <TextInput placeholder={_data_.contacto} style={[styles.textbox]} />
                    <View style={[styles.rowContainer, { elevation: 0 }]}>
                        <TextInput placeholder={NumeroDeCorrelativo.FirstNumbers.toString()} onChangeText={(value: string) => AddFirstNumber(value)} style={[styles.textbox]} />
                        <Text>-</Text>
                        <TextInput placeholder={NumeroDeCorrelativo.SeconNumbers.toString()} onChangeText={(value: string) => AddSeconNumber(value)} style={[styles.textbox]} />
                        <Text>-</Text>
                        <TextInput placeholder={NumeroDeCorrelativo.thirdNumbers.toString()} onChangeText={(value: string) => AddthirdNumbers(value)} style={[styles.textbox]} />
                        <Text>-</Text>
                        <TextInput placeholder={NumeroDeCorrelativo.LastNumbers.toString()} onChangeText={(value: string) => AddLastNumbers(value)} style={[styles.textbox]} />
                    </View>
                    <TextInput placeholder={_data_.correo} style={[styles.textbox]} />
                    <TextInput placeholder={_data_.direccion} style={[styles.textbox]} />
                    <Image
                        source={{ uri: `file://${_data_.imagen}` }} // Asegúrate de que _data_.imagen sea una URL válida
                        style={[styles.image_edit]}
                    />
                    <TextInput />
                </View>
            </View>
        </View>
    )
}