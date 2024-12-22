
import { View, TouchableOpacity, Text, FlatList } from "react-native"
import { Company, getCompanies } from "../storage/company"
import { useCallback, useEffect, useState } from "react"
import { styles } from "../../assets/styles/styles"
import { ModalcreateCompany } from "../../app/modals/crear_compania"
import { Headsheetcard } from "../../app/components/cardhead"
import { CompanyHeadCard } from "../../app/components/companyHeadCARD"

export const CompanyPage = () =>{
    const [companies, setCompanies] = useState<Company[]>([])
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
    
      useEffect(()=>{
        UpdateList();
      }, [])

    return(
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
            <ModalcreateCompany vis={ModalisOpen} closeModal={_CloseModal_} onUpdate={UpdateList} />
            <View style={[styles.rowContainer, { elevation: 0, backgroundColor : 'white' }]}>
            <TouchableOpacity style={[styles.greenButton]} onPress={()=> _openModal_()}>
              <Text style={{ color: "white", fontWeight: "bold", textAlign: "center" }}>CREAR COMPAÑIA</Text>
            </TouchableOpacity>
          </View>

          
                  {companies.length > 0 ? (
                    <FlatList
                      data={companies}
                      style={{ borderRadius : 5, width : '95%'}}
                      keyExtractor={(item) => item.id.toString()}
                      renderItem={({item }) => (<CompanyHeadCard data={item}/>)}
                    />
                  ) : (
                    <Text style={{ fontSize: 20, color: "#000" }}>
                      NO HAY REGISTROS
                    </Text>
                  )}
        </View>
    )
}