import AsyncStorage from '@react-native-async-storage/async-storage';

// Define la interfaz de CoutingDatail
export interface CoutingDatail {
  id: number; // ID único generado automáticamente
  id_service_sheet : number | null;
  id_Head_Couting : number;
  detail : string;
  cantidad : number;
  descuento: number;
  price : number;
  _date_ : string;
}

const STORAGE_KEY = '_couting_';

export const getCouting = async (): Promise<CoutingDatail[]> => {
  try {
    const storedData = await AsyncStorage.getItem(STORAGE_KEY);
    return storedData ? JSON.parse(storedData) : [];
  } catch (error) {
    console.error('Error al obtener los registros:', error);
    return [];
  }
};

// Agregar un nuevo registro
export const addCoutingLineDetail = async (data: CoutingDatail): Promise<void> => {
  try {
    const CoutingDatails = await getCouting();
    CoutingDatails.push(data);
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(CoutingDatails));
  } catch (error) {
    console.error('Error al agregar el registro:', error);
  }
};

// Actualizar un registro
export const updateCoutinh = async (
  id: number,
  newData: Partial<CoutingDatail>
): Promise<void> => {
  try {
    const CoutingDatails = await getCouting();
    const updatedCoutingDatails = CoutingDatails.map((item) =>
      item.id === id ? { ...item, ...newData } : item
    );
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updatedCoutingDatails));
  } catch (error) {
    console.error('Error al actualizar el registro:', error);
  }
};

// Eliminar un registro
export const deleteCouting = async (id: number): Promise<void> => {
  try {
    const CoutingDatails = await getCouting();
    const filteredCoutingDatails = CoutingDatails.filter((item) => item.id !== id);
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(filteredCoutingDatails));
  } catch (error) {
    console.error('Error al eliminar el registro:', error);
  }
};

// Filtrar registros por título
export const filterCoutingByID = async (searchTerm: number | null): Promise<CoutingDatail[]> => {
  try {
    const CoutingDatails = await getCouting();
    const filteredCoutingDatails = CoutingDatails.filter((item) =>
      item.id_service_sheet = searchTerm// Coincidencia parcial, ignorando mayúsculas/minúsculas
    );
    return filteredCoutingDatails;
  } catch (error) {
    console.error('Error al filtrar los registros:', error);
    return [];
  }
};

export const filterLinesByHeadFactura = async (searchTerm: number): Promise<CoutingDatail[]> => {
  try {
    const CoutingDatails = await getCouting();
    const filteredCoutingDatails = CoutingDatails.filter((item) =>
      item.id_Head_Couting = searchTerm// Coincidencia parcial, ignorando mayúsculas/minúsculas
    );
    return filteredCoutingDatails;
  } catch (error) {
    console.error('Error al filtrar los registros:', error);
    return [];
  }
};
