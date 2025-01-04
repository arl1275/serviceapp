import { HeadCouting, addCoutingLine, getHCouting } from "../../app/storage/headCouting";
import { Company, getCompanies } from "../../app/storage/company";

const getLastFacturaValidated = async () => {
    const LastHeadCouting: HeadCouting[] = await getHCouting();
    const LastFacturaValidated = LastHeadCouting[LastHeadCouting.length - 1]
    return LastFacturaValidated;
}

export const getCompanyByIDRange = async () =>{

}

export function GetCalculatedFactura() {

}