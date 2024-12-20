import React, { useState } from 'react';
import { View, Text, Button, Image, StyleSheet, Alert } from 'react-native';
import DocumentPicker, { DocumentPickerResponse } from 'react-native-document-picker';
import RNFS from 'react-native-fs';

interface AddLogoComponentProps {
    onLogoSelected: (logoPath: string) => void; 
  }
  

  export const AddLogoComponent: React.FC<AddLogoComponentProps> = ({ onLogoSelected }) => {
    const [photoPath, setPhotoPath] = useState<string | null>(null);
  
    const handleAddPhoto = async (): Promise<void> => {
      try {
        // Abrir el selector de documentos para seleccionar una imagen
        const res: DocumentPickerResponse[] = await DocumentPicker.pick({
          type: [DocumentPicker.types.images], // Solo imágenes
        });
  
        // Ruta del archivo seleccionado
        const sourcePath = res[0]?.uri;
  
        if (!sourcePath) {
          throw new Error('No se pudo obtener la URI de la imagen seleccionada.');
        }
  
        // Crear la ruta de destino en el directorio de documentos de la app
        const destPath = `${RNFS.DocumentDirectoryPath}/${res[0]?.name}`;
  
        // Copiar el archivo al directorio de la app
        await RNFS.copyFile(sourcePath, destPath);
  
        // Actualizar el estado para mostrar la imagen
        setPhotoPath(destPath);
  
        // Enviar la información del logo al componente padre
        onLogoSelected(destPath);
  
        Alert.alert('Éxito', 'Imagen agregada a los archivos de la app.');
      } catch (err) {
        if (DocumentPicker.isCancel(err)) {
          console.log('Selección de documento cancelada.');
        } else {
          console.error('Error al agregar la foto:', err);
          Alert.alert('Error', 'Ocurrió un error al agregar la foto.');
        }
      }
    };
  
    return (
      <View style={styles.container}>
        <Button title="Agregar Foto" onPress={handleAddPhoto} />
        {photoPath && <Image source={{ uri: `file://${photoPath}` }} style={styles.image} />}
      </View>
    );
  };
  

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection : 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width : '100%'
  },
  title: {
    fontSize: 20,
    marginBottom: 20,
  },
  image: {
    marginLeft : 10,
    width: '60%',
    height: '100%',
    marginBottom: 20,
    borderRadius: 10,
    opacity : 0.5
  },
});

