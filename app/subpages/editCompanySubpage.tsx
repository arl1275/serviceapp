import { View, Text, TextInput } from "react-native";
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
                    <TextInput placeholder={_data_.nombre}/>
                    <TextInput placeholder={_data_.CAI} />
                    <TextInput placeholder={_data_.RTN} />
                    <TextInput placeholder={_data_.rango.toString()} />
                    <TextInput placeholder={_data_.contacto} />
                    <View style={[styles.rowContainer, { elevation: 0 }]}>
                        <TextInput placeholder={NumeroDeCorrelativo.FirstNumbers.toString()} onChangeText={(value: string) => AddFirstNumber(value)} />
                        <Text>-</Text>
                        <TextInput placeholder={NumeroDeCorrelativo.SeconNumbers.toString()} onChangeText={(value: string) => AddSeconNumber(value)} />
                        <Text>-</Text>
                        <TextInput placeholder={NumeroDeCorrelativo.thirdNumbers.toString()} onChangeText={(value: string) => AddthirdNumbers(value)} />
                        <Text>-</Text>
                        <TextInput placeholder={NumeroDeCorrelativo.LastNumbers.toString()} onChangeText={(value: string) => AddLastNumbers(value)} />
                    </View>
                    <TextInput placeholder={_data_.correo}/>
                    <TextInput placeholder={_data_.direccion}/>
                    <TextInput placeholder={_data_.imagen}/>
                    <TextInput />
                </View>
            </View>
        </View>
    )
}