import AsyncStorage from '@react-native-async-storage/async-storage';

export interface ServiceSheet {
  id: number; // ID único generado automáticamente
  title: string;
  fecha: string; // Fecha generada automáticamente
  cliente : string,
  cliente_detalle : string,
  description : string
}

const STORAGE_KEY = 'ServiceSheets';

export const getServicesSheets = async (): Promise<ServiceSheet[]> => {
  try {
    const storedData = await AsyncStorage.getItem(STORAGE_KEY);
    return storedData ? JSON.parse(storedData) : [];
  } catch (error) {
    console.error('Error al obtener los registros:', error);
    return [];
  }
};

// Agregar un nuevo registro
export const addServiceSheet = async (data: ServiceSheet): Promise<void> => {
  try {
    const headSheets = await getServicesSheets();
    headSheets.push(data);
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(headSheets));
  } catch (error) {
    console.error('Error al agregar el registro:', error);
  }
};

// Actualizar un registro
export const updateServiceSheet = async (
  id: number,
  newData: Partial<ServiceSheet>
): Promise<void> => {
  try {
    const headSheets = await getServicesSheets();
    const updatedHeadSheets = headSheets.map((item) =>
      item.id === id ? { ...item, ...newData } : item
    );
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updatedHeadSheets));
  } catch (error) {
    console.error('Error al actualizar el registro:', error);
  }
};

// Eliminar un registro
export const deleteServiceSheet = async (id: number): Promise<void> => {
  try {
    const headSheets = await getServicesSheets();
    const filteredHeadSheets = headSheets.filter((item) => item.id !== id);
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(filteredHeadSheets));
  } catch (error) {
    console.error('Error al eliminar el registro:', error);
  }
};

// Filtrar registros por título
export const filteServiceSheetsByTitle = async (searchTerm: string): Promise<ServiceSheet[]> => {
  try {
    const headSheets = await getServicesSheets();
    const filteredHeadSheets = headSheets.filter((item) =>
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) // Coincidencia parcial, ignorando mayúsculas/minúsculas
    );
    return filteredHeadSheets;
  } catch (error) {
    console.error('Error al filtrar los registros:', error);
    return [];
  }
};
