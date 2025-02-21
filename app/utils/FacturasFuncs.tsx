import { HeadCouting, addHeadCouting, getHCouting, GetFacturasByCompany } from "../../app/storage/headCouting";
import { Company, FacturaNumber, getCompanies, filterCompanyByID } from "../../app/storage/company";
import { Alert } from "react-native";
import { getFormattedDate } from "../../app/modals/crear_service_detail";

export const GenerateFacturaNumber = async (id_company: number) => {
    const company: Company[] = await filterCompanyByID(id_company);
    if (company && company.length > 0) {
        if (ValidateDate(company[0]) === false) {
            const TodasLasFacturasPorEmpresa: HeadCouting[] = await GetFacturasByCompany(company[0].id);
            if (TodasLasFacturasPorEmpresa && TodasLasFacturasPorEmpresa.length > 0) {
                return nextFactura(TodasLasFacturasPorEmpresa, company[0])
            } else {
                return FirstFactura(company[0]);
            }
        } else {
            Alert.alert('Fecha Superada', 'Se llego al limite de tiempo para emitir facturas');
            return null;
        }
    } else {
        Alert.alert("Error", "Company not found");
        return null;
    }
}

const ValidateDate = (Empresa : Company) => {
    const [year, month, day] = Empresa.fechalimite.split("-").map(Number);
    const LimitDateCompany = new Date(year, month - 1, day); 
    const CurrentDate = new Date(); 
    return LimitDateCompany.getTime() <= CurrentDate.getTime();
};


const nextFactura = (AllFacturas: HeadCouting[], Empresa: Company) => {
    const EmpresaFacturas : HeadCouting[] = AllFacturas.filter(( item : HeadCouting)=> item.id_Company_Related === Empresa.id) 
    const LastFacuta = EmpresaFacturas.sort((a, b)=> a.id - b.id)[EmpresaFacturas.length -1];

    const NewLastFacturaNumber: FacturaNumber = {
        id: Date.now(),
        FirstNumbers: Empresa.correlativo.FirstNumbers,
        SeconNumbers: Empresa.correlativo.SeconNumbers,
        thirdNumbers: Empresa.correlativo.thirdNumbers,
        LastNumbers: Empresa.correlativo.LastNumbers
    };
    if (LastFacuta._NumberOfBill_.LastNumbers < (Empresa.correlativo.thirdNumbers + Empresa.rango)) {
        NewLastFacturaNumber.LastNumbers = LastFacuta._NumberOfBill_.LastNumbers + 1;
    } else {
        Alert.alert('ERROR', 'No hay Correlativos disponibles para una factura nueva.');
        return null;
    }
    return NewLastFacturaNumber;
}

const FirstFactura = (Empresa: Company) => {
    const NewLastFacturaNumber: FacturaNumber = {
        id: Date.now(),
        FirstNumbers: Empresa.correlativo.FirstNumbers,
        SeconNumbers: Empresa.correlativo.SeconNumbers,
        thirdNumbers: Empresa.correlativo.thirdNumbers,
        LastNumbers: Empresa.correlativo.LastNumbers + 1
    };
    return NewLastFacturaNumber;
}