import AsyncStorage from '@react-native-async-storage/async-storage';
import { FacturaNumber } from './company';

export interface userBillName {
  name : string;
  RTN : string;
}

export interface HeadCouting {
    id : number;
    _NumberOfBill_ : FacturaNumber;
    ClientName : userBillName;
    _date_ : string;
    isClosed : boolean;
    isDeleted :boolean;
    hasPDFgenerated : boolean;
    isExported : boolean;
    isLinkedOnSherviceSheet : boolean;
    LinkedSherviceSheet : number;
    hasCreditNote : boolean;
    id_CreditNote : number | null;
    isCanceled : boolean;
    id_Company_Related : number;
}

const STORAGE_KEY = 'HeadCouting';

export const getHCouting = async (): Promise<HeadCouting[]> => {
  try {
    const storedData = await AsyncStorage.getItem(STORAGE_KEY);
    return storedData ? JSON.parse(storedData) : [];
  } catch (error) {
    console.error('Error al obtener los registros:', error);
    return [];
  }
};

// Agregar un nuevo registro
export const addHeadCouting = async ( data : HeadCouting): Promise<void> => {
  try {
    const CoutingH = await getHCouting();
    CoutingH.push(data);
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(CoutingH));
  } catch (error) {
    console.error('Error al agregar el registro:', error);
  }
};

// Actualizar un registro
export const updateCoutinh = async (
  id: number,
  newData: Partial<HeadCouting>
): Promise<void> => {
  try {
    const CoutingHead = await getHCouting();
    const updatedHeadC = CoutingHead.map((item) =>
      item.id === id ? { ...item, ...newData } : item
    );
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updatedHeadC));
  } catch (error) {
    console.error('Error al actualizar el registro:', error);
  }
};

// Eliminar un registro
export const deleteHCouting = async (id: number): Promise<void> => {
  try {
    const CoutingH = await getHCouting();
    const filteredHeadCouting = CoutingH.filter((item) => item.id !== id);
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(filteredHeadCouting));
  } catch (error) {
    console.error('Error al eliminar el registro:', error);
  }
};

// Filtrar registros por título
export const filterHeadCoutingBytitle = async ( searchTerm : FacturaNumber ): Promise<HeadCouting[]> => {
  try {
    const CoutingH = await getHCouting();
    const filteredHeadC = CoutingH.filter((item  : HeadCouting) =>
      item._NumberOfBill_ === searchTerm// Coincidencia parcial, ignorando mayúsculas/minúsculas
    );
    return filteredHeadC;
  } catch (error) {
    console.error('Error al filtrar los registros:', error);
    return [];
  }
};

export const GetFacturasByCompany = async ( searchTerm : number ): Promise<HeadCouting[]> => {
  try {
    const CoutingH = await getHCouting();
    const filteredHeadC = CoutingH.filter((item  : HeadCouting) =>
      item.id_Company_Related === searchTerm// Coincidencia parcial, ignorando mayúsculas/minúsculas
    );
    return filteredHeadC.sort((a, b)=> a.id - b.id);
  } catch (error) {
    console.error('Error al filtrar los registros:', error);
    return [];
  }
};
