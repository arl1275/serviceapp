import { useState, useEffect } from "react";
import { Company, FacturaNumber } from "../../app/storage/company";
import { HeadCouting, userBillName } from "../../app/storage/headCouting";
import { View, Text, Button, Alert } from "react-native";
import { styles } from "../../assets/styles/styles";
import { getFormattedDate } from "../../app/modals/crear_service_detail";
import { GenerateFacturaNumber } from "../../app/utils/FacturasFuncs";

interface props {
    _OnCancel_: () => void;
    _OnGenerateFactura_ : () => Promise<void>; // esto sirve para generar una factura
    empresa: Company | null;          // esto es para traer la empresa desde la subpagina
    Usuario: userBillName | undefined;// esto es para traer el usuario desde la subpagina
    HEadFact : HeadCouting | null;    // la cabeza de la factura
}

export const SavedUSerFactura: React.FC<props> = ({ _OnCancel_, _OnGenerateFactura_,empresa, Usuario, HEadFact }) => {
    const [Empresa, setEmpresa] = useState<Company>();
    const [usuario, setUsuario] = useState<userBillName>();
    const [FactNumber, SetFactnumber] = useState<FacturaNumber | null>(null);

    const UpdatingValues = async () => {
        if (!empresa || !HEadFact) return;
        setEmpresa(empresa);
        setUsuario(Usuario);
        SetFactnumber(HEadFact._NumberOfBill_)
    };
    const FormattedFacturaNumber = () => {
        if (!FactNumber) return "Factura no generada";
        return `${FactNumber.FirstNumbers}-${FactNumber.SeconNumbers}-${FactNumber.thirdNumbers}-${FactNumber.LastNumbers}`;
    };
    

    useEffect(() => {
        const fetchData = async () => {
            await UpdatingValues();
        };
        fetchData();
    }, [empresa, Usuario]);

    return (
        <View style={[styles.card, { borderWidth: 1, borderColor: "grey", padding: 10, backgroundColor : 'white' }]}>
            <View style={[styles.rowContainer, { elevation : 0}]}>s
                <Button title="CANCELAR" onPress={_OnCancel_} color={"red"} />
                <Button title="GENERAR FACTURA" onPress={async()=> await _OnGenerateFactura_()} color={"blue"} />
            </View>


            <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                {/* 📌 Columna 1 - Información de la Empresa */}
                <View style={{ flex: 1, paddingRight: 10 }}>
                    <Text style={[styles.bigtitle, { fontWeight: "bold", color : typeof FactNumber!= null ? 'green' :'red' }]}>Factura: {FormattedFacturaNumber()}</Text>
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