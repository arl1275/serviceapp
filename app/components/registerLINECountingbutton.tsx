
import React, { useState, useEffect } from "react"
import { Button, TextInput, View, FlatList, Text } from "react-native"
import { CoutingDatail } from "../../app/storage/couting";
import { getFormattedDate } from "../../app/modals/crear_service_detail";
import { styles } from "../../assets/styles/styles";
import { Ionicons } from "@expo/vector-icons";

interface props {
    addCoutingLine: (value: CoutingDatail) => void;
    DeleteCoutingLine: (value: number) => void;
    editCoutingLine: (_id_ : number, value: CoutingDatail) => void;
    data: CoutingDatail[] | null;
    id_head_Couting: number ;
    id_head_sheet: number | null;
}

export const RegisterCountingLine: React.FC<props> = ({ addCoutingLine, DeleteCoutingLine, editCoutingLine, data, id_head_Couting, id_head_sheet }) => {
    const [CoutingLine, setCoutingLine] = useState<CoutingDatail>({
        id: Date.now(),
        id_service_sheet: null,
        id_Head_Couting: 0,
        detail: '',
        cantidad: 0,
        descuento: 0,
        price: 0,
        _date_: getFormattedDate()
    });
    const [addLine, setAddline] = useState<boolean>(false);
    const [saveLine, setSaveLine] = useState<boolean>(false);
    const [valoresFactura, setValoresFactura] = useState<CoutingDatail[]>([]);

    const SaveLineDetail = () => {
        updateVAlue('id_service_sheet', id_head_sheet ? id_head_sheet : 0);
        updateVAlue('id_Head_Couting', id_head_Couting);
        updateVAlue('_data_', getFormattedDate());
        addCoutingLine(CoutingLine);
        isAdding();
    }

    useEffect(() => { data?.length ? setValoresFactura(data) : null }, [data]);

    useEffect(() => {
        SaveLineDetail();
    }, [saveLine])

    const isAdding = () => { setAddline(!addLine) };
    const Add = () => { setSaveLine(!saveLine) };
    const updateVAlue = (value: string, valor: string | number) => { setCoutingLine((prev) => ({ ...prev, [value]: valor })) }

    return (
        <View>
            <Button title="CREAR LINEA" onPress={isAdding} />
            {addLine &&
                <View>
                    <TextInput placeholder="Detalle" />
                    <TextInput placeholder="cantidad" />
                    <TextInput placeholder="descuento" />
                    <TextInput placeholder="precio" />
                    <Button title="agregar" onPress={Add} />
                </View>
            }
            {
                valoresFactura &&
                <FlatList
                    data={valoresFactura}
                    renderItem={({ item }) => (
                        <View style={[styles.rowContainer]}>
                            <Text>{item.detail}</Text>
                            <Text>{item.cantidad}</Text>
                            <Text>{item.descuento}</Text>
                            <Text>{item.price}</Text>
                            <Ionicons
                                name='trash'
                                size={20}
                                color="red"
                                style={{ margin: 10 }}
                                onPress={() => DeleteCoutingLine(item.id)}
                            />
                        </View>
                    )}
                />
            }
        </View>
    )
}