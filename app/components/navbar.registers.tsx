import { useState, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { styles } from "../../assets/styles/styles";
import { ModalCreateRegister } from "../../app/modals/createregister";

interface propsNavar{
    onUpdate : ()=> void;
}

export const NavbarRegister = ({onUpdate} : propsNavar) =>{
    const [ openmodal, setopenmodal] = useState(Boolean);

    const _Onclose_ = () =>{ onUpdate(); setopenmodal(false)}
    const _Onopen_ = () =>{ setopenmodal(true)}

    return(
        <View style={{ width : 'auto',display : 'flex', flexDirection :'row', justifyContent : 'space-between', padding : 5, borderRadius : 5}}>

            <ModalCreateRegister vis={openmodal} closeModal={_Onclose_}/>
            
            <View>
                <TouchableOpacity style={[styles.greenButton]} onPress={()=> _Onopen_()}>
                    <Text style={[ styles.bigtitle, {color : 'white', textAlign : 'center'}]}>+ CREAR</Text>
                </TouchableOpacity>
            </View>
       
        </View>
    )
}