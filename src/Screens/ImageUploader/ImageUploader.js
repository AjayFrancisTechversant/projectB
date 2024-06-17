import { View, Text, Linking, StyleSheet, TouchableOpacity, Alert, ActivityIndicator, Image, FlatList, ScrollView } from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import { styles } from './Style';
import Entypo from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useCameraDevice, useCameraPermission, Camera } from 'react-native-vision-camera';
import { Badge } from 'react-native-paper';
import ImageResizer from '@bam.tech/react-native-image-resizer';
import storage from '@react-native-firebase/storage';
import { utils } from '@react-native-firebase/app';

const ImageUploader = ({ navigation }) => {
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const { hasPermission, requestPermission } = useCameraPermission();
  const [takenPhotos, setTakenPhotos] = useState([]);
  const [compressedPhotos, setCompressedPhotos] = useState([]);
  const [isShutterLoading, setIsShutterLoading] = useState(false);
  const [isUploadLoading, setIsUploadLoading] = useState(false);
  const [uploadedImageUrls, setUploadedImageUrls] = useState([]);
  const [isFetchingImages, setIsFetchingImages] = useState(false);
  const camera = useRef(null);

  useEffect(() => {
    requestPermission();
    fetchUploadedImages();
  }, []);

  const device = useCameraDevice('back');
  if (device == null) {
    Alert.alert('No camera device available');
  }

  const handleShutter = async () => {
    setIsShutterLoading(true);
    try {
      const photo = await camera.current.takePhoto();
      setTakenPhotos(prevPhotos => [...prevPhotos, photo.path]);
    } catch (error) {
      Alert.alert('Error taking photo', error.message);
    } finally {
      setIsShutterLoading(false);
    }
  };

  const handleCameraButton = async () => {
    if (!hasPermission) {
      Alert.alert('No camera permission', 'Please grant camera permission', [
        { text: 'Open Settings', onPress: () => Linking.openSettings() },
        { text: 'Cancel' }
      ]);
    } else {
      setIsCameraOpen(true);
    }
  };

  const handleDeleteImage = (index) => {
    setTakenPhotos(prevPhotos => prevPhotos.filter((_, i) => i !== index));
  };

  const compressTakenPhotos = async () => {
    const compressed = await Promise.all(
      takenPhotos.map(async (photo) => {
        try {
          const response = await ImageResizer.createResizedImage(photo, 300, 500, 'JPEG', 50, 90);
          return response.uri;
        } catch (error) {
          Alert.alert('Error compressing image', error.message);
          return null;
        }
      })
    );
    return compressed.filter(uri => uri !== null);
  };

  const fetchExistingFiles = async () => {
    const reference = storage().ref('Pics');
    const result = await reference.listAll();
    return result.items.map(item => item.fullPath);
  };

  const deleteExtraFiles = async (existingFiles, currentFiles) => {
    const currentFileNames = currentFiles.map((_, index) => `Pics/pic${index + 1}`);
    const filesToDelete = existingFiles.filter(file => !currentFileNames.includes(file));
    await Promise.all(filesToDelete.map(async (file) => {
      const fileRef = storage().ref(file);
      await fileRef.delete();
    }));
  };

  const uploadFilesToCloud = async (currentFiles) => {
    console.log('Uploading');
    try {
      const existingFiles = await fetchExistingFiles();
      await deleteExtraFiles(existingFiles, currentFiles);
      await Promise.all(
        currentFiles.map(async (photo, index) => {
          const reference = storage().ref(`Pics/pic${index + 1}`);
          await reference.putFile(photo);
        })
      );
    } catch (error) {
      Alert.alert('Error uploading files', error.message);
    }
  };

  const handleUploadButton = async () => {
    setIsUploadLoading(true);
    const compressed = await compressTakenPhotos();
    setCompressedPhotos(compressed);
    await uploadFilesToCloud(compressed);
    await fetchUploadedImages();
    setIsUploadLoading(false);
    setTakenPhotos([])
  };

  const fetchUploadedImages = async () => {
    setIsFetchingImages(true);
    try {
      const existingFiles = await fetchExistingFiles();
      const urls = await Promise.all(existingFiles.map(async (filePath) => {
        const url = await storage().ref(filePath).getDownloadURL();
        return url;
      }));
      setUploadedImageUrls(urls);
    } catch (error) {
      Alert.alert('Error fetching uploaded images', error.message);
    } finally {
      setIsFetchingImages(false);
    }
  };

  // console.log('compressed Photos=', compressedPhotos);
  // console.log('taken Photos=', takenPhotos);
  // console.log('uploaded Image URLs=', uploadedImageUrls);

  return (
    <View style={styles.canvas}>
      {isCameraOpen ? (
        <>
          <Camera
            ref={camera}
            style={StyleSheet.absoluteFill}
            device={device}
            isActive={true}
            photo={true}
          />
          <TouchableOpacity onPress={() => setIsCameraOpen(false)} style={styles.backButton}>
            <Entypo name='chevron-left' color='white' size={40} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setIsCameraOpen(false)} style={styles.galleryIcon}>
            <Badge>{takenPhotos.length}</Badge>
            <Entypo name='images' color='white' size={40} />
          </TouchableOpacity>
          {isShutterLoading ? (
            <ActivityIndicator color={'orange'} size={70} style={styles.shutterButton} />
          ) : (
            <TouchableOpacity onPress={handleShutter} style={styles.shutterButton}>
              <Entypo name='circle' color='white' size={70} />
            </TouchableOpacity>
          )}
        </>
      ) : (
        <ScrollView>
          <Text style={styles.mainHeading}>ImageUploader</Text>
          <TouchableOpacity style={styles.cameraButton} onPress={handleCameraButton}>
            <MaterialCommunityIcons name='camera-plus' size={50} />
          </TouchableOpacity>
          <FlatList
            ListHeaderComponent={<View style={styles.itemSeparatorComponent}></View>}
            ListFooterComponent={<View style={styles.itemSeparatorComponent}></View>}
            ItemSeparatorComponent={<View style={styles.itemSeparatorComponent}></View>}
            horizontal={true}
            ListEmptyComponent={<Text style={styles.emptyComponentStyle}>No Images in cache</Text>}
            data={takenPhotos}
            renderItem={({ index, item }) => (
              <View>
                <TouchableOpacity onPress={() => handleDeleteImage(index)} style={styles.imageDeleteCloseButton}>
                  <AntDesign name='closecircle' size={30} color={'red'} />
                </TouchableOpacity>
                <Image source={{ uri: `file://${item}` }} style={styles.imageStyle} />
              </View>
            )}
          />
          {isUploadLoading ? (
            <ActivityIndicator size={50} style={styles.uploadButton} />
          ) : (
            takenPhotos.length > 0 && takenPhotos.length <= 6 ? (
              <TouchableOpacity onPress={handleUploadButton} style={styles.uploadButton}>
                <AntDesign name='cloudupload' size={50} color={'green'} />
              </TouchableOpacity>
            ) : takenPhotos.length > 6 ? (
              <View>
                <TouchableOpacity disabled style={styles.uploadButton}>
                  <AntDesign name='cloudupload' size={50} color={'green'} />
                </TouchableOpacity>
                <Text style={styles.only6PicsText}>You can upload only 6 pictures</Text>
              </View>
            ) : null
          )}
          <Text style={styles.mainHeading}>Uploaded Images</Text>
          {isFetchingImages ? (
            <ActivityIndicator size={50} />
          ) : (
            <FlatList
              ListHeaderComponent={<View style={styles.itemSeparatorComponent}></View>}
              ListFooterComponent={<View style={styles.itemSeparatorComponent}></View>}
              ItemSeparatorComponent={<View style={styles.itemSeparatorComponent}></View>}
              horizontal={true}
              ListEmptyComponent={<Text style={styles.emptyComponentStyle}>No Uploaded Images</Text>}
              data={uploadedImageUrls}
              renderItem={({ item }) => (
                <View>
                  
                  <Image source={{ uri: item }} style={styles.imageStyle} />
                  
                  </View>
               
              )}
              keyExtractor={(item, index) => index.toString()}
            />
          )}
        </ScrollView>
      )}
    </View>
  );
};

export default ImageUploader;
