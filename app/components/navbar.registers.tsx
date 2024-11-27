import { useState, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { styles } from "../../assets/styles/styles";
import { ModalCreateRegister } from "../../app/modals/createregister";

export const NavbarRegister = () =>{
    const [ value, setValue] = useState(String);
    const [ openmodal, setopenmodal] = useState(Boolean);

    const _Onclose_ = () =>{ setopenmodal(false)}
    const _Onopen_ = () =>{ setopenmodal(true)}

    return(
        <View style={{ width : '100%',display : 'flex', flexDirection :'row', justifyContent : 'space-between', backgroundColor : 'white', padding : 5, borderRadius : 5, elevation : 10}}>

            <ModalCreateRegister vis={openmodal} closeModal={_Onclose_}/>

            <View style={{ width : '60%', borderWidth : 1, borderColor : '#ebedef', borderRadius : 5}}>
                <TextInput onChangeText={(e) => setValue(e)} placeholder="BUSCAR POR TITULO"/>
            </View>
            
            <View style={{ width : '30%'}}>
                <TouchableOpacity style={{ backgroundColor : 'green', borderRadius : 5, padding : 10}} onPress={()=> _Onopen_()}>
                    <Text style={[ styles.bigtitle, {color : 'white', textAlign : 'center'}]}>+ CREAR</Text>
                </TouchableOpacity>
            </View>
       
        </View>
    )
}