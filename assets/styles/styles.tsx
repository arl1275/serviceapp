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
    backgroundColor: "white",//"#e1f5fe",
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
DropBoxcontainer: {
  flex: 1,
  justifyContent: "center",
  alignItems: "center",
},
Dropboxlabel: {
  fontSize: 18,
  marginBottom: 0,
},
DropBoxpicker: {
  width: '100%',
  height: 50,
  borderWidth: 1,
  borderColor: "#ccc",
  backgroundColor: "#f8f8f8",
},
DropBoxselectedValue: {
  marginTop: 20,
  fontSize: 16,
  fontWeight: "bold",
},
  greenButton : {
    backgroundColor : 'green', 
    borderRadius : 5, 
    padding : 10, 
    color : 'white', 
    fontWeight : 'bold',
    textAlign : 'center'
  },
  pdfButton : {
    backgroundColor : '#2196f3',
    padding : 10,
    borderRadius : 7,
    width : '30%'
  },sheet: {
    padding: 15,
    backgroundColor: "#fff",
    borderRadius: 0,
    marginBottom: 0,
    borderBottomWidth : 1,
    borderBottomColor : '#f4f6f6',
    elevation: 1,
    width : '100%'
  },
  unstylebutton : {
    borderWidth : 1,
    borderColor : '#f4f6f6',
    borderRadius : 7,
    padding : 0,
    width : '100%'
  }
});
