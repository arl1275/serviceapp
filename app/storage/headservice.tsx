import AsyncStorage from '@react-native-async-storage/async-storage';

// Define la interfaz de HeadSheet
export interface HeadSheet {
  id: number; // ID único generado automáticamente
  title: string;
  description: string;
  fecha: string; // Fecha generada automáticamente
  //correo : String,
  //contacto : String,
  //address : string,
  //rtn : string
}

const STORAGE_KEY = 'headSheets';

export const getHeadSheets = async (): Promise<HeadSheet[]> => {
  try {
    const storedData = await AsyncStorage.getItem(STORAGE_KEY);
    return storedData ? JSON.parse(storedData) : [];
  } catch (error) {
    console.error('Error al obtener los registros:', error);
    return [];
  }
};

// Agregar un nuevo registro
export const addHeadSheet = async (data: HeadSheet): Promise<void> => {
  try {
    const headSheets = await getHeadSheets();
    headSheets.push(data);
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(headSheets));
  } catch (error) {
    console.error('Error al agregar el registro:', error);
  }
};

// Actualizar un registro
export const updateHeadSheet = async (
  id: number,
  newData: Partial<HeadSheet>
): Promise<void> => {
  try {
    const headSheets = await getHeadSheets();
    const updatedHeadSheets = headSheets.map((item) =>
      item.id === id ? { ...item, ...newData } : item
    );
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updatedHeadSheets));
  } catch (error) {
    console.error('Error al actualizar el registro:', error);
  }
};

// Eliminar un registro
export const deleteHeadSheet = async (id: number): Promise<void> => {
  try {
    const headSheets = await getHeadSheets();
    const filteredHeadSheets = headSheets.filter((item) => item.id !== id);
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(filteredHeadSheets));
  } catch (error) {
    console.error('Error al eliminar el registro:', error);
  }
};

// Filtrar registros por título
export const filterHeadSheetsByTitle = async (searchTerm: string): Promise<HeadSheet[]> => {
  try {
    const headSheets = await getHeadSheets();
    const filteredHeadSheets = headSheets.filter((item) =>
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) // Coincidencia parcial, ignorando mayúsculas/minúsculas
    );
    return filteredHeadSheets;
  } catch (error) {
    console.error('Error al filtrar los registros:', error);
    return [];
  }
};
