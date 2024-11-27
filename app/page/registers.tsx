import { View, Text } from "react-native";
import { Headsheetcard } from "../../app/components/cardhead";
import { NavbarRegister } from "../../app/components/navbar.registers";

export const RegistrosPage = () => {
  return (
    <View style={{ flex: 1, marginTop : 5, alignItems: "center"}}>
      <View style={{ width: "95%", justifyContent: "center", alignItems: "center" }}>
        <View>
            <NavbarRegister/>
        </View>

        <Headsheetcard head="HONDUCAFE"  des="Departamento químico de Honducafe."/>
      </View>
    </View>
  );
};
