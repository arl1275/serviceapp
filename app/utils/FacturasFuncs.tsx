import { HeadCouting, addCoutingLine, getHCouting } from "../../app/storage/headCouting";
import { Company, FacturaNumber, getCompanies, filterCompanyByID } from "../../app/storage/company";
import { Alert } from "react-native";

const getLastFacturaValidated = async () => {
    const LastHeadCouting = await getHCouting();
    if (!LastHeadCouting || LastHeadCouting.length === 0) {
        return false; // Retorna null si la lista está vacía
    }
    for (let i = LastHeadCouting.length - 1; i >= 0; i--) {
        if (LastHeadCouting[i].isClosed === true) {
            return LastHeadCouting[i];
        }
    }
    return true;
};


export const getCompanyByIDRange = async ( id_company : number) =>{
    const value : Company[] = await filterCompanyByID(id_company);
    const [rango, correlativo, fechalimite] = value;
    return {rango, correlativo, fechalimite};
}

export const ChecksLimitdate = (LateDate: string) => {
    return new Date(LateDate).getTime() > Date.now();
};


export const MainCalculus = (LastFactura : HeadCouting , CompanyRanges : any) =>{
    const Fecha : string = CompanyRanges.fechalimite;
    const Rango : number = CompanyRanges.rango;
    const Correlativo : FacturaNumber = CompanyRanges.correlativo;
    if(ChecksLimitdate(Fecha)){
        if(Correlativo.thirdNumbers < Rango){
            const NewLastNumber : number = Correlativo.thirdNumbers + 1;
            return NewLastNumber;
        }else{
            return false;
        }
    }else{
        return false;
    }
}

export async function GetCalculatedFactura(id_company: number) {
    try {
        const ValuesCompany = await getCompanyByIDRange(id_company);
        const LastFacturaValidated: boolean | HeadCouting = await getLastFacturaValidated();

        if (typeof LastFacturaValidated === "object") {
            const CalculatedFactura = MainCalculus(LastFacturaValidated, ValuesCompany);
            return CalculatedFactura; // Retorna el resultado
        } else {
            Alert.alert('Información', 'No se encontró una factura válida.');
            return null; // Retorna null si no hay factura válida
        }
    } catch (error) {
        Alert.alert('Error', 'Error al calcular la última factura');
        console.error(error); // Agrega un log para depuración
    }
}
