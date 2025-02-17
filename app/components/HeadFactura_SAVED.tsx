import { useState, useEffect } from "react";
import { Company, FacturaNumber } from "../../app/storage/company";
import { userBillName } from "../../app/storage/headCouting";
import { View, Text, Button } from "react-native";
import { styles } from "../../assets/styles/styles";
import { getFormattedDate } from "../../app/modals/crear_service_detail";
import { GenerateFacturaNumber } from "../../app/utils/FacturasFuncs";

interface props {
    _OnCancel_: () => void;
    empresa: Company | undefined;
    Usuario: userBillName | undefined;
}

export const SavedUSerFactura: React.FC<props> = ({ _OnCancel_, empresa, Usuario }) => {
    const [Empresa, setEmpresa] = useState<Company>();
    const [usuario, setUsuario] = useState<userBillName>();
    const [FactNumber, SetFactnumber] = useState<FacturaNumber | null>();

    const FActuNum_ = async () => {
        empresa && typeof empresa === 'object' && SetFactnumber(await GenerateFacturaNumber(empresa.id));
    }

    const UpdatingValues = async () => {
        empresa && typeof empresa === 'object' && setEmpresa(empresa);
        setUsuario(Usuario);
        await FActuNum_()
    }

    const FormattedFacturaNumber = () => {
        return FactNumber?.FirstNumbers.toString() + '-'
            + FactNumber?.SeconNumbers.toString() + '-'
            + FactNumber?.thirdNumbers.toString() + '-'
            + FactNumber?.LastNumbers.toString()
    }

    useEffect(() => {
        UpdatingValues();
    }, [empresa, Usuario])

    return (
        <View style={[styles.card, { borderWidth: 1, borderColor: "grey", padding: 10 }]}>
            <Button title="CANCELAR" onPress={_OnCancel_} color={"red"} />

            <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                {/* 📌 Columna 1 - Información de la Empresa */}
                <View style={{ flex: 1, paddingRight: 10 }}>
                    <Text style={[styles.bigtitle, { fontWeight: "bold" }]}>Factura: {FormattedFacturaNumber()}</Text>
                    <Text style={[styles.bigtitle, { fontWeight: "bold" }]}>{Empresa?.nombre}</Text>
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
                    <Text style={[styles.title, { fontWeight: "bold", marginTop: 10 }]}>Cliente: {usuario?.name}</Text>
                    <Text style={styles.title}>RTN: {usuario?.RTN}</Text>
                </View>
            </View>
        </View>

    )
}