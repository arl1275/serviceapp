import AsyncStorage from '@react-native-async-storage/async-storage';

export interface dataServiceSheet {
  id: number; // ID único generado automáticamente
  title: string;
  fecha: string; // Fecha generada automáticamente
  description: string;
  photo: string; // Base64 de la foto
  id_service_sheet: number;
}

const STORAGE_KEY = 'dataServiceSheets';

export const getdataServicesSheets = async (): Promise<dataServiceSheet[]> => {
  try {
    const storedData = await AsyncStorage.getItem(STORAGE_KEY);
    return storedData ? JSON.parse(storedData) : [];
  } catch (error) {
    console.error('Error al obtener los registros:', error);
    return [];
  }
};

export const adddataServiceSheet = async (data: dataServiceSheet): Promise<void> => {
  try {
    const headSheets = await getdataServicesSheets();
    headSheets.push(data);
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(headSheets));
  } catch (error) {
    console.error('Error al agregar el registro:', error);
  }
};

export const updatedataServiceSheet = async (
  id: number,
  newData: Partial<dataServiceSheet>
): Promise<void> => {
  try {
    const headSheets = await getdataServicesSheets();
    const updatedHeadSheets = headSheets.map((item) =>
      item.id === id ? { ...item, ...newData } : item
    );
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updatedHeadSheets));
  } catch (error) {
    console.error('Error al actualizar el registro:', error);
  }
};

// Eliminar un registro
export const deletedataServiceSheet = async (id: number): Promise<void> => {
  try {
    const headSheets = await getdataServicesSheets();
    const filteredHeadSheets = headSheets.filter((item) => item.id !== id);
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(filteredHeadSheets));
  } catch (error) {
    console.error('Error al eliminar el registro:', error);
  }
};

// Filtrar registros por ID
export const filterServiceSheetsByID = async (_id_: number): Promise<dataServiceSheet[]> => {
  try {
    const headSheets = await getdataServicesSheets();
    const filteredHeadSheets = headSheets.filter((item: dataServiceSheet) =>
      item.id_service_sheet === _id_
    );
    return filteredHeadSheets;
  } catch (error) {
    console.error('Error al filtrar los registros:', error);
    return [];
  }
};


// Procesar una foto y almacenarla en el campo 'photo'
export const processAndAddPhotoToSheet = async (
  id: number,
  photoUri: string
): Promise<void> => {
  try {
    const RNFS = require('react-native-fs'); // Asegúrate de instalar esta librería
    const base64Photo = await RNFS.readFile(photoUri, 'base64');

    // Actualizar el registro con la foto en base64
    await updatedataServiceSheet(id, { photo: base64Photo });
    console.log('Foto agregada al registro exitosamente');
  } catch (error) {
    console.error('Error al procesar y agregar la foto:', error);
  }
};
