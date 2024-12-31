import { useState, useEffect } from "react";
import { styles } from "../../assets/styles/styles";
import { View, Text, TouchableOpacity, Button, TextInput, Alert, FlatList, ScrollView } from "react-native";
import { Company, impuesto } from "../../app/storage/company";

type PropsCompany = {
    editablecompany: Company;
    setEditableImpuestos: (field: keyof Company, value: string | number | Array<impuesto>) => void;
};

export const ImpuestosComponent = ({ editablecompany, setEditableImpuestos }: PropsCompany) => {
    const [Impuestos, SetImpuestos] = useState<impuesto[]>([]);
    const [addImpuesto, setNewAddImpuesto] = useState<impuesto>({ id: Date.now(), nombre: "", porcentaje: 0 });

    useEffect(() => {
        SetImpuestos(editablecompany.impuesto || []);
    }, [editablecompany]);

    const _OnSaveImpuesto_ = () => {
        if (addImpuesto.nombre.length > 0 && addImpuesto.porcentaje > 0) {
            SetImpuestos((prevImpuestos) => {
                const updatedImpuestos = [...prevImpuestos, addImpuesto];
                setEditableImpuestos("impuesto", updatedImpuestos); // Usa el nuevo estado
                return updatedImpuestos;
            });
            setNewAddImpuesto({ id: Date.now(), nombre: "", porcentaje: 0 }); // Resetea el formulario
        } else {
            Alert.alert("ERR", "Ingrese correctamente el impuesto");
        }
    };

    return (
        <View style={[styles.headsheet]}>
            <Text style={styles.title}>Impuestos</Text>
            <View>
                <View style={[styles.rowContainer, { elevation : 0, borderWidth : 1, borderColor : '#eaeded'}]}>
                    <View style={{width : '20%', marginLeft : 10, borderRadius : 10}}>
                    <Button title="Crear" color={"blue"} onPress={_OnSaveImpuesto_}/>
                    </View>
                    
                    <TextInput style={{width : '20%', borderWidth : 1, borderColor : '#ebedef', margin : 10, borderRadius : 7}}
                        placeholder="Nombre"
                        value={addImpuesto.nombre}
                        onChangeText={(e: string) => {setNewAddImpuesto((prevImpuesto) => ({ ...prevImpuesto, nombre: e }));}}
                    />
                    <TextInput
                        placeholder="%"
                        keyboardType="numeric"
                        style={{width : '20%', borderWidth : 1, borderColor : '#ebedef', margin : 10, borderRadius : 7}}
                        value={addImpuesto.porcentaje ? addImpuesto.porcentaje.toString() : ""}
                        onChangeText={(e) => {
                            const porcentaje = parseInt(e, 10);
                            if (!isNaN(porcentaje)) {
                                setNewAddImpuesto((prevImpuesto) => ({ ...prevImpuesto, porcentaje }));
                            }
                        }}
                    />
                </View>
                <ScrollView style={{height : '20%'}}>
                    <FlatList
                        data={Impuestos}
                        keyExtractor={(item: impuesto) => item.id.toString()}
                        renderItem={({ item }) => (
                            <View style={[styles.rowContainer, { justifyContent: "space-around" , padding : 10}]}>
                                <Text>{item.nombre}</Text>
                                <Text>{item.porcentaje.toString()}</Text>
                            </View>
                        )}
                    />
                </ScrollView>
            </View>
        </View>
    );
};
