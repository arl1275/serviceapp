import AsyncStorage from '@react-native-async-storage/async-storage';

export interface impuesto {
  id: number;
  nombre: string;
  porcentaje: number;
}
export interface FacturaNumber {
  id: number;
  FirstNumbers: number;
  SeconNumbers: number;
  thirdNumbers: number;
  LastNumbers: number;
}

// Define la interfaz de Company
export interface Company {
  id: number;
  imagen: string;
  nombre: string;
  RTN: string;
  contacto: string;
  correo: string;
  direccion: string;
  CAI: string;
  correlativo: FacturaNumber;
  rango: number;
  fechalimite: string;
  impuesto: impuesto[];
}

const STORAGE_KEY = '_companies_';

export const getCompanies = async (): Promise<Company[]> => {
  try {
    const storedData = await AsyncStorage.getItem(STORAGE_KEY);
    return storedData ? JSON.parse(storedData) : [];
  } catch (error) {
    console.error('Error al obtener los registros:', error);
    return [];
  }
};

// Agregar un nuevo registro
export const addCompanies = async (data: Company): Promise<void> => {
  try {
    const Companys = await getCompanies();
    Companys.push(data);
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(Companys));
  } catch (error) {
    console.error('Error al agregar el registro:', error);
  }
};

// Actualizar un registro
export const updateCompanies = async (
  id: number,
  newData: Partial<Company>
): Promise<void> => {
  try {
    const Companys = await getCompanies();
    const updatedCompanys = Companys.map((item) =>
      item.id === id ? { ...item, ...newData } : item
    );
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updatedCompanys));
  } catch (error) {
    console.error('Error al actualizar el registro:', error);
  }
};

// Eliminar un registro
export const deleteCompanies = async (id: number): Promise<void> => {
  try {
    const Companys = await getCompanies();
    const filteredCompanys = Companys.filter((item) => item.id !== id);
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(filteredCompanys));
  } catch (error) {
    console.error('Error al eliminar el registro:', error);
  }
};

// Filtrar registros por título
export const filterCompanyByID = async (searchTerm: number): Promise<Company[]> => {
  try {
    const Companys = await getCompanies();
    const filteredCompanys = Companys.filter((item) =>
      item.id === searchTerm// Coincidencia parcial, ignorando mayúsculas/minúsculas
    );
    return filteredCompanys;
  } catch (error) {
    console.error('Error al filtrar los registros:', error);
    return [];
  }
};

export const filterCompanyByName = async (searchTerm: string): Promise<Company[]> => {
  try {
    const Companys = await getCompanies();
    const filteredCompanys = Companys.filter((item) =>
      item.nombre === searchTerm// Coincidencia parcial, ignorando mayúsculas/minúsculas
    );
    return filteredCompanys;
  } catch (error) {
    console.error('Error al filtrar los registros:', error);
    return [];
  }
};

