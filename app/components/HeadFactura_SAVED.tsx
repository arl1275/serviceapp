import { useState, useEffect } from "react";
import { Company } from "../../app/storage/company";
import { userBillName } from "../../app/storage/headCouting";
import { View, Text, Button } from "react-native";
import { styles } from "../../assets/styles/styles";
import { getFormattedDate } from "../../app/modals/crear_service_detail";

interface props {
    _OnCancel_: () => void;
    empresa: Company | undefined;
    Usuario: userBillName | undefined;
}

export const SavedUSerFactura: React.FC<props> = ({ _OnCancel_, empresa, Usuario }) => {
    const [Empresa, setEmpresa] = useState<Company>();
    const [usuario, setUsuario] = useState<userBillName>();
    const UpdatingValues = () => { setEmpresa(empresa); setUsuario(Usuario) }

    useEffect(() => {
        UpdatingValues();
    }, [empresa, Usuario])

    return (
        <View style={[styles.card, { borderWidth : 1, borderColor : 'grey'}]}>
            <Button title="CANCELAR" onPress={_OnCancel_} color={'red'}/>
            <View>
                <Text style={[styles.title, {fontWeight : 'bold'}]}>{Empresa?.nombre}</Text>
                <Text style={[styles.title, {fontWeight : 'bold'}]}>Fecha {getFormattedDate()}</Text>
                <Text style={styles.title}>Direccion: {Empresa?.direccion}</Text>
                <Text style={styles.title}>Telefono: {Empresa?.contacto}</Text>
                <Text style={styles.title}>RTN: {Empresa?.RTN}</Text>
                <Text style={styles.title}>Correo: {Empresa?.correo}</Text>
                <Text style={styles.title}>CAI: {Empresa?.CAI}</Text>
                <Text style={styles.title}>Contacto: {Empresa?.contacto}</Text>
            </View>
            <View>
                <Text style={styles.title}>Cliente:{usuario?.RTN}</Text>
                <Text style={styles.title}>RTN: {usuario?.name}</Text>
            </View>
        </View>
    )
}