import { View, Text, TextInput, Button } from "react-native";
import { useEffect, useState } from "react";
import { HeadSheet, updateHeadSheet } from "../../app/storage/headservice"
import { ClientesParamList } from "../../app/_layout";
import { useNavigation, RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from "@react-navigation/stack";
import { styles } from "../../assets/styles/styles";

type EditClientProps = {
    route: RouteProp<ClientesParamList, 'editClient'>
}

type EditClientProp = StackNavigationProp<ClientesParamList, 'homeClient'>

export const EditClientSubpage = ({ route }: EditClientProps) => {
    const navigation = useNavigation<EditClientProp>();
    const { _data_ } = route.params
    const [updatedClient, setUpdatedClient] = useState<HeadSheet>(_data_)

    useEffect(() => {
        setUpdatedClient(_data_);
    }, [_data_]);

    const handleInputChange = (field: keyof HeadSheet, value: string | number) => {
        setUpdatedClient({ ...updatedClient, [field]: value, });
    };

    const _onUpdated_ = async () => {
        await updateHeadSheet(updatedClient.id, updatedClient);
        navigation.navigate('homeClient');
    }

    return (
        <View>
            <Text style={[styles.bigtitle, { textAlign: 'center' }]}>EDICION DE CLIENTE</Text>
            <View style={[styles.card, { alignSelf: 'center', backgroundColor : 'white', borderWidth :1, borderColor : 'grey' }]}>
                <Text style={styles.parrafo}>{updatedClient?.fecha}</Text>
                <TextInput placeholder={'NOMBRE: ' + updatedClient?.title} style={[styles.textbox_edit]} onChangeText={(e: string) => { handleInputChange("title", e) }} />
                <TextInput placeholder={'CONTACTO: ' + updatedClient?.contacto} style={[styles.textbox_edit]} onChangeText={(e: string) => { handleInputChange("contacto", e) }} />
                <TextInput placeholder={'RTN: ' + updatedClient?.rtn} style={[styles.textbox_edit]} onChangeText={(e: string) => { handleInputChange("rtn", e) }} />
                <TextInput placeholder={'CORREO: ' + updatedClient?.correo} style={[styles.textbox_edit]} onChangeText={(e: string) => { handleInputChange("contacto", e) }} />
                <TextInput placeholder={'DESCRIPCION: ' + updatedClient?.description} style={[styles.textbox_edit]} onChangeText={(e: string) => { handleInputChange("description", e) }} />
            </View>
            <View style={[{ width: '90%', alignSelf: 'center' }]}>
                <Button title="GUARDAR CAMBIOS" onPress={() => { _onUpdated_() }} />
            </View>
        </View>
    )
}