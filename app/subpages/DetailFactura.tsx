//-- navegation
import { FacturasParamList } from "../../app/_layout";
import { StackNavigationProp } from "@react-navigation/stack";
import { RouteProp, useNavigation } from "@react-navigation/native";

type FacturaDetailProps = {
    route: RouteProp<FacturasParamList, "DetailFactura">;
}

//-- others
import { styles } from "../../assets/styles/styles";
import { View, Text, Alert, FlatList } from "react-native";
import { useState, useEffect } from "react";
import { Company, filterCompanyByID, FacturaNumber } from "../../app/storage/company";
import { HeadCouting, filterHeadCoutingBytitle } from "../../app/storage/headCouting";
import { CoutingDatail, filterLinesByHeadFactura } from "../../app/storage/couting";
import { getFormattedDate } from "../../app/modals/crear_service_detail";



type HomeScreenNavigationProp = StackNavigationProp<FacturasParamList, "homeFactura">;

export const FacturaDetail = ({ route }: FacturaDetailProps) => {
    const { _valueFactura_ } = route.params;
    const navigation = useNavigation<HomeScreenNavigationProp>();

    const [Empresa, setEmpresa] = useState<Company | null>(null);
    const [HeadFactura, setHeadFactura] = useState<HeadCouting | null>(null);
    const [FacturaDetail, setFacturaDetail] = useState<CoutingDatail[]>([]);

    async function GetCompania() {
        let value = await filterCompanyByID(_valueFactura_.id_Company_Related)
        return value.length > 0 ? value[0] : null
    }

    async function GetLinesFactura() {
        let value : CoutingDatail[] = await filterLinesByHeadFactura(_valueFactura_.id)
        return value.length > 0 ? value : []
    }

    const FullFillFactura = async () => {
        !_valueFactura_ ? Alert.alert('No se obtuvo encabezado de Factura') : setHeadFactura(_valueFactura_);
        setEmpresa(await GetCompania());
        setFacturaDetail(await GetLinesFactura());
    }

    useEffect(() => {
        FullFillFactura();
    }, [_valueFactura_]);

    const FormattedFacturaNumber = (_value_: FacturaNumber | undefined) => {
        if (!_value_) return "Factura no generada";
        return `${_value_.FirstNumbers}-${_value_.SeconNumbers}-${_value_.thirdNumbers}-${_value_.LastNumbers}`;
    };

    return (
        <View>
            <View style={[{ margin: 5 }]}>
                <Text style={[styles.bigtitle, { fontWeight: "bold" }]}>{Empresa?.nombre}</Text>
                <Text style={[styles.title, { fontWeight: "bold", color: 'grey' }]}>Factura: {FormattedFacturaNumber(HeadFactura?._NumberOfBill_)}</Text>
            </View>

            <View style={{ flexDirection: "row", justifyContent: "space-between", margin: 10 }}>
                {/* 📌 Columna 1 - Información de la Empresa */}
                <View style={{ flex: 1, paddingRight: 10 }}>

                    <Text style={[styles.title, { fontWeight: "bold" }]}>Fecha: {getFormattedDate()}</Text>
                    <Text style={styles.title}>Dirección: {Empresa?.direccion}</Text>
                    <Text style={styles.title}>Teléfono: {Empresa?.contacto}</Text>
                    <Text style={styles.title}>Fecha Límite: {Empresa?.fechalimite}</Text>
                    <Text style={styles.title}>RTN: {Empresa?.RTN}</Text>
                </View>

                {/* 📌 Columna 2 - Información del Cliente */}
                <View style={{ flex: 1, paddingLeft: 10 }}>
                    <Text style={styles.title}>Correo: {Empresa?.correo}</Text>
                    <Text style={styles.title}>CAI: {Empresa?.CAI}</Text>
                    <Text style={styles.title}>Contacto: {Empresa?.contacto}</Text>
                    <Text style={[styles.title, { fontWeight: "bold", marginTop: 10 }]}>Cliente: {HeadFactura?.ClientName.name}</Text>
                    <Text style={styles.title}>RTN: {HeadFactura?.ClientName.RTN}</Text>
                </View>
            </View>
            <View style={{borderBottomWidth : 1, borderBottomColor : 'grey', width : '90%', alignSelf : 'center'}}/>
            
            <FlatList
                data={FacturaDetail}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <View style={[styles.rowContainer, { alignContent: 'space-between', margin: 5, elevation : 0, backgroundColor : ''}]}>
                        <Text style={{ width: '50%' }}>{item.detail}</Text>
                        <Text style={{ width: '10%' }}>{item.cantidad}</Text>
                        <Text style={{ width: '10%' }}>{item.descuento}</Text>
                        <Text style={{ width: '10%' }}>{item.price}</Text>
                    </View>
                )}
            />

        </View>
    )
}