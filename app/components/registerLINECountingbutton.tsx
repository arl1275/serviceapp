import React, { useState, useEffect } from "react";
import { Button, TextInput, View, FlatList, Text, Alert } from "react-native";
import { CoutingDatail } from "../../app/storage/couting";
import { getFormattedDate } from "../../app/modals/crear_service_detail";
import { styles } from "../../assets/styles/styles";
import { Ionicons } from "@expo/vector-icons";

interface props {
    addCoutingLine: (value: CoutingDatail) => void;
    DeleteCoutingLine: (value: number) => void;
    //editCoutingLine: (_id_: number, value: CoutingDatail) => void;
    data: CoutingDatail[] | null;
    id_head_Couting: number;
    id_head_sheet: number | null;
}

export const RegisterCountingLine: React.FC<props> = ({
    addCoutingLine,
    DeleteCoutingLine,
    //editCoutingLine,
    data,
    id_head_Couting,
    id_head_sheet,
}) => {
    const [CoutingLine, setCoutingLine] = useState<CoutingDatail>({
        id: Date.now(),
        id_service_sheet: null,
        id_Head_Couting: id_head_Couting,
        detail: "",
        cantidad: 1,
        descuento: 0,
        price: 0.0,
        _date_: getFormattedDate(),
    });
    const [addLine, setAddline] = useState<boolean>(false);
    const [saveLine, setSaveLine] = useState<boolean>(false);
    const [valoresFactura, setValoresFactura] = useState<CoutingDatail[]>([]);

    const SaveLineDetail = () => {
        setCoutingLine((prev) => ({
            ...prev,
            id: Date.now(),
            id_service_sheet: id_head_sheet ? id_head_sheet : 0,
            _date_: getFormattedDate(),
        }));

        if (CoutingLine.price === 0.0) {
            Alert.alert('FALTA DE DATOS', 'Favor, agrege la informacion requerida para la factura',
                [{
                    text: 'Aceptar',
                    style: 'default',
                    onPress: () => isAdding()
                }])
        } else {
            addCoutingLine(CoutingLine);
            isAdding();
        }
    };

    useEffect(() => {
        data ? setValoresFactura(data) : null;
    }, [data]);

    useEffect(() => {
        if (saveLine) {
            SaveLineDetail();
            setSaveLine(false);
        }
    }, [saveLine]);

    const isAdding = () => setAddline(!addLine);
    const Add = () => setSaveLine(true);

    const updateVAlue = (value: string, valor: string | number) => {
        setCoutingLine((prev) => ({
            ...prev,
            [value]: typeof valor === "string" && !isNaN(Number(valor)) ? Number(valor) : valor,
        }));
    };

    return (
        <View>
            <View style={{margin : 5}}><Button title="CREAR LINEA" onPress={isAdding} /></View>
            
            {
                valoresFactura.length > 0 &&
                <View style={[styles.rowContainer, { alignContent: 'space-between', margin: 5 }]}>
                    <Text>Detalle</Text>
                    <Text>Cantidad</Text>
                    <Text>Descuento</Text>
                    <Text>Precio</Text>
                    <Text>ACCION</Text>
                </View>
            }
            {addLine && (
                <View style={[styles.rowContainer, { padding: 3, margin : 5, width : 'auto' }]}>
                    <TextInput placeholder="DETALLE" onChangeText={(e) => updateVAlue("detail", e)} style={[styles.textbox_edit, { width: "20%" }]} />
                    <TextInput placeholder="CANTIDAD" keyboardType="numeric" onChangeText={(e) => updateVAlue("cantidad", Number(e) || 1)} style={[styles.textbox_edit, { width: "20%" }]} />
                    <TextInput placeholder="DESCUENTO" keyboardType="numeric" onChangeText={(e) => updateVAlue("descuento", Number(e) || 0)} style={[styles.textbox_edit, { width: "20%" }]} />
                    <TextInput placeholder="PRECIO" keyboardType="numeric" onChangeText={(e) => updateVAlue("price", Number(e) || 1)} style={[styles.textbox_edit, { width: "20%" }]} />
                    <View style={[{ width : '10%'}]}><Button title="Agregar" onPress={Add} /></View>
                    
                </View>
            )}

            <FlatList
                data={valoresFactura}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <View style={[styles.rowContainer, { alignContent: 'space-between', margin: 5 }]}>
                        <Text style={{width : '15%'}}>{item.detail}</Text>
                        <Text style={{width : '15%'}}>{item.cantidad}</Text>
                        <Text style={{width : '15%'}}>{item.descuento}</Text>
                        <Text style={{width : '15%'}}>{item.price}</Text>
                        <Ionicons name="trash" size={20} color="red" style={{ margin: 10 }} onPress={() => DeleteCoutingLine(item.id)} />
                    </View>
                )}
            />
        </View>
    );
};
