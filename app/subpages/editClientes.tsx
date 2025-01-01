import { View, Text } from "react-native";
import { useEffect, useState } from "react";
import { HeadSheet } from "../../app/storage/headservice"
import { ClientesParamList } from "../../app/_layout";
import { useNavigation, RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from "@react-navigation/stack";

type EditClientProps = {
    route: RouteProp<ClientesParamList, 'editClient'>
}

type EditClientProp = StackNavigationProp<ClientesParamList, 'homeClient' >

export const EditClientSubpage = ({ route } : EditClientProps ) => {
    const navigation = useNavigation<EditClientProp>();
    const {_data_} = route.params
    const [updatedClient, setUpdatedClient] = useState<HeadSheet>()

    useEffect(()=>{
        setUpdatedClient(_data_);
    }, [_data_])

    return(
        <View>
            <Text> Edit Client </Text>
        </View>
    )
}