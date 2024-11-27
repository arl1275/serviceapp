import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  card: {
    width: "95%",
    padding: 10,
    margin: 5,
    borderRadius: 5,
  },
  bigtitle: {
    fontSize: 20,
    fontWeight: "bold",
  },
  title: {
    fontSize: 15,
    fontWeight: "normal",
  },
  parrafo: {
    fontSize: 12,
    fontWeight: "normal",
  },
  headsheet: {
    borderBottomWidth: 1,
    borderBottomColor: "#f2f4f4",
    borderRadius: 0,
    padding:20,
    width: "100%",
    elevation: 0,
    backgroundColor: "white"//"#e1f5fe",
  },
  headsheetblock: {
    borderWidth: 1,
    borderColor: "grey",
    borderRadius: 5,
    padding: 5,
  },
  rowContainer: {
    flexDirection: "row", // Organiza los elementos en una fila
    justifyContent: "space-between", // Espaciado entre los elementos
    alignItems: "center", // Alinea verticalmente los elementos
    width: "95%", // Ancho total del contenedor
    //paddingHorizontal: 10,
    //marginVertical: 10,
    backgroundColor : 'white',
    borderRadius :5,
    margin :5,
    elevation : 5
  },
  textInput: {
    width : '70%', //flex:1, // Proporción del ancho para TextInput
    borderWidth: 1,
    borderColor: "#f2f4f4",
    borderRadius: 5,
    padding: 0,
    marginLeft: 5, // Espaciado entre TextInput y NavbarRegister
    height : '90%',
    textAlign : 'justify'
},
});
