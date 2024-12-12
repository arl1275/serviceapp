
import { View, TouchableOpacity, Text } from "react-native"
import { Company, getCouting } from "../storage/company"
import { useState } from "react"
import { styles } from "../../assets/styles/styles"

export const CompanyPage = () =>{
    const [companies, setCompanies] = useState<Company[]>()
    return(
        <View>
            <View style={[styles.rowContainer, { elevation: 0, backgroundColor : 'white' }]}>
            <TouchableOpacity style={[styles.greenButton]} >
              <Text style={{ color: "white", fontWeight: "bold", textAlign: "center" }}>CREAR DETALLE</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.pdfButton}>
              <Text style={{ color: "white", textAlign: "center", fontWeight: "bold" }}>PDF</Text>
            </TouchableOpacity>
          </View>
        </View>
    )
}