
import { View, TouchableOpacity, Text } from "react-native"
import { Company, getCompanies } from "../storage/company"
import { useCallback, useState } from "react"
import { styles } from "../../assets/styles/styles"
import { ModalcreateCompany } from "../../app/modals/crear_compania"

export const CompanyPage = () =>{
    const [companies, setCompanies] = useState<Company[]>()
    const [ModalisOpen, setModalisOpen] = useState<boolean>(false);

    const _openModal_ = ()=>{ setModalisOpen(true)};
    const _CloseModal_ = ()=>{ setModalisOpen(false)};

    const UpdateList = useCallback(async () => {
        try {
          const data = await getCompanies();
          setCompanies(data);
        } catch (error) {
          console.error("Error al cargar los registros:", error);
        }
      }, []);

    return(
        <View>
            <ModalcreateCompany vis={ModalisOpen} closeModal={_CloseModal_} onUpdate={UpdateList} />
            <View style={[styles.rowContainer, { elevation: 0, backgroundColor : 'white' }]}>
            <TouchableOpacity style={[styles.greenButton]} onPress={()=> _openModal_()}>
              <Text style={{ color: "white", fontWeight: "bold", textAlign: "center" }}>CREAR COMPAÑIA</Text>
            </TouchableOpacity>
          </View>
        </View>
    )
}