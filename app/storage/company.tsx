import AsyncStorage from '@react-native-async-storage/async-storage';

export interface impuesto{
    id: number;
    nombre: string;
    porcentaje : number;
}

// Define la interfaz de Company
export interface Company {
  id : number;
  nobre : string;
  RTN : string;
  contacto : string;
  correo : string;
  direccion : string;
  CAI: string;
  correlativo : number;
  rango : number;
  fechalimite : string;
  impuesto : impuesto[];
}

const STORAGE_KEY = '_couting_';

export const getCouting = async (): Promise<Company[]> => {
  try {
    const storedData = await AsyncStorage.getItem(STORAGE_KEY);
    return storedData ? JSON.parse(storedData) : [];
  } catch (error) {
    console.error('Error al obtener los registros:', error);
    return [];
  }
};

// Agregar un nuevo registro
export const addCoutingLine = async (data: Company): Promise<void> => {
  try {
    const Companys = await getCouting();
    Companys.push(data);
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(Companys));
  } catch (error) {
    console.error('Error al agregar el registro:', error);
  }
};

// Actualizar un registro
export const updateCoutinh = async (
  id: number,
  newData: Partial<Company>
): Promise<void> => {
  try {
    const Companys = await getCouting();
    const updatedCompanys = Companys.map((item) =>
      item.id === id ? { ...item, ...newData } : item
    );
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updatedCompanys));
  } catch (error) {
    console.error('Error al actualizar el registro:', error);
  }
};

// Eliminar un registro
export const deleteCouting = async (id: number): Promise<void> => {
  try {
    const Companys = await getCouting();
    const filteredCompanys = Companys.filter((item) => item.id !== id);
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(filteredCompanys));
  } catch (error) {
    console.error('Error al eliminar el registro:', error);
  }
};

// Filtrar registros por título
export const filterCoutingByID = async (searchTerm: string): Promise<Company[]> => {
  try {
    const Companys = await getCouting();
    const filteredCompanys = Companys.filter((item) =>
      item.nobre = searchTerm// Coincidencia parcial, ignorando mayúsculas/minúsculas
    );
    return filteredCompanys;
  } catch (error) {
    console.error('Error al filtrar los registros:', error);
    return [];
  }
};
