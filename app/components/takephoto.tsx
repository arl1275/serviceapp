import React, { useState, useRef, useEffect } from 'react';
import { View, TouchableOpacity, Text, StyleSheet, Alert } from 'react-native';
import { Camera, CameraType } from 'expo-camera';
import * as FileSystem from 'expo-file-system';

const SavePhotoButton = () => {
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const cameraRef = useRef<Camera>();

  // Solicitar permisos de la cámara
  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  if (hasPermission === null) {
    return <Text>Solicitando permisos...</Text>;
  }

  if (hasPermission === false) {
    return <Text>No se tienen permisos para usar la cámara.</Text>;
  }

  const takeAndSavePhoto = async () => {
    if (cameraRef.current) {
      try {
        // Toma la foto
        const photo = await cameraRef.current.takePictureAsync();

        // Define una ruta para guardar la foto
        const fileName = `${FileSystem.documentDirectory}photo_${Date.now()}.jpg`;

        // Guarda la foto en el sistema de archivos
        await FileSystem.moveAsync({
          from: photo.uri,
          to: fileName,
        });

        Alert.alert('Foto Guardada', `Foto guardada en: ${fileName}`);
      } catch (error) {
        console.error('Error al tomar o guardar la foto:', error);
        Alert.alert('Error', 'No se pudo guardar la foto.');
      }
    }
  };

  return (
    <View style={styles.container}>
      <Camera
        style={styles.camera}
        type={CameraType.back}
        ref={cameraRef}
      >
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={takeAndSavePhoto}>
            <Text style={styles.text}>Guardar Foto</Text>
          </TouchableOpacity>
        </View>
      </Camera>
    </View>
  );
};

export default SavePhotoButton;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginBottom: 30,
  },
  button: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
  },
  text: {
    color: '#000',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
