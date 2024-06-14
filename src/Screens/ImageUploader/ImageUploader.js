import { View, Text, Linking, StyleSheet, TouchableOpacity, Alert, ActivityIndicator, Image, FlatList } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { styles } from './Style'
import Entypo from 'react-native-vector-icons/Entypo'
import AntDesign from 'react-native-vector-icons/AntDesign'
import  MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { useCameraDevice, useCameraPermission, Camera, PhotoFile } from 'react-native-vision-camera'
import { Badge } from 'react-native-paper'
import { stat } from 'react-native-fs'






const ImageUploader = ({ navigation }) => {
  const [isCameraOpen, setIsCameraOpen] = useState(false)
  const { hasPermission, requestPermission } = useCameraPermission()
  requestPermission()
  const [TakenPhotos, setTakenPhotos] = useState([])
  const [isShutterLoading, setIsShutterLoading] = useState(false)
  const camera = useRef(null)
  const device = useCameraDevice('back')
  if (device == null) {
    Alert.alert('no camera device');
  }
  const handleShutter = async () => {
    setIsShutterLoading(true)
    const photo = await camera.current.takePhoto()
    const statResult = await stat(`file://${photo.path}`)
    console.log(statResult);
    setTakenPhotos([...TakenPhotos, photo.path])
    setIsShutterLoading(false)
  }

  const handleCameraButton = async () => {

    if (!hasPermission) {
      Alert.alert('No camera permission', 'Please Grant Camera Permission', [
        { text: 'Open Settings', onPress: () => Linking.openSettings() },
        { text: 'Cancel' }
      ])
    }
    else {
      setIsCameraOpen(true)
    }
  }

  const handleDeleteImage = (index) => {
    const newItems = [...TakenPhotos]; // Create a copy of the array
    newItems.splice(index, 1); // Remove the item
    setTakenPhotos(newItems);
  }
  const compressTakenPhotos=()=>{
    TakenPhotos.map(path=>(
      console.log(path)
    ))
  }

  const handleUpload=()=>{
compressTakenPhotos()
  }
  return (
    <View style={styles.canvas}>
      {isCameraOpen ?
        <>
          <Camera
            //         onInitialized={()=>console.log('oninitialised')}
            //    onStarted={()=>console.log('on started')}
            //    onStopped={()=>{console.log('on stopped')}}
            ref={camera}
            style={StyleSheet.absoluteFill}
            device={device}
            isActive={true}
            photo={true}
          />
          <TouchableOpacity onPress={() => setIsCameraOpen(false)} style={styles.backButton} >
            <Entypo name='chevron-left' color='white' size={40} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setIsCameraOpen(false)} style={styles.galleryIcon} >
            <Badge>{TakenPhotos.length}</Badge>
            <Entypo name='images' color='white' size={40} />
          </TouchableOpacity>
          {isShutterLoading ?
            <ActivityIndicator color={'orange'} size={70} style={styles.shutterButton} />
            :
            <TouchableOpacity onPress={handleShutter} style={styles.shutterButton}>
              <Entypo name='circle' color='white' size={70} />
            </TouchableOpacity>}
        </>
        :
        <View>

          <Text style={styles.mainHeading}>ImageUploader</Text>
          <TouchableOpacity style={styles.cameraButton} onPress={() => handleCameraButton()} >
            <MaterialCommunityIcons name='camera-plus' size={50} />
          </TouchableOpacity>
          <FlatList
            ListHeaderComponent={<View style={styles.itemSeparatorComponent}></View>}
            ListFooterComponent={<View style={styles.itemSeparatorComponent}></View>}
            ItemSeparatorComponent={<View style={styles.itemSeparatorComponent}></View>}
            horizontal={true}
            ListEmptyComponent={<Text style={styles.emptyComponentStyle}>No Images Clicked!</Text>}
            data={TakenPhotos}
            renderItem={({ index, item }) =>
              <View>
                <TouchableOpacity onPress={() => handleDeleteImage(index)} style={styles.imageDeleteCloseButton}>
                  <AntDesign name='closecircle' size={30} color={'red'} />
                </TouchableOpacity>
                <Image source={{ uri: `file://${item}` }}
                  style={styles.takenImageStyle}
                />
              </View>

            }

          />
          {TakenPhotos.length > 0 && TakenPhotos.length <= 6 ?

            <TouchableOpacity onPress={handleUpload} style={styles.uploadButton}>
              <AntDesign name='cloudupload' size={50} color={'green'} />
            </TouchableOpacity>
            : TakenPhotos.length > 6 &&
            <View>
              <TouchableOpacity disabled style={styles.uploadButton}>
                <AntDesign name='cloudupload' size={50} color={'green'} />
              </TouchableOpacity>
              <Text style={styles.only6PicsText}>You can upload only 6 pictures</Text>
            </View>
          }

        </View>
      }
    </View>
  )
}

export default ImageUploader