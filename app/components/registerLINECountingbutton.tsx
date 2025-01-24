
import React, { useState, useEffect } from "react"
import { View } from "react-native"
import { CoutingDatail } from "../../app/storage/couting";

interface props{
    addCoutingLine : (value : CoutingDatail) => void;
    DeleteCoutingLine : (value : CoutingDatail) => void;
    editCoutingLine : (value : CoutingDatail) => void;
    id_head_Couting : number;
    id_head_sheet : number;
}

export const RegisterCountingLine : React.FC<props> = ({ addCoutingLine, DeleteCoutingLine, editCoutingLine, id_head_Couting, id_head_sheet}) => {
    const [CoutingLine, setCoutingLine] = useState<CoutingDatail>();
    
    return(
        <View>
        </View>
    )
}