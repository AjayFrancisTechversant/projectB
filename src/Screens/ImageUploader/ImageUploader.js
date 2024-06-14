import { View, Text, Linking, StyleSheet, TouchableOpacity, Alert, ActivityIndicator, Image, FlatList } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { styles } from './Style'
import Entypo from 'react-native-vector-icons/Entypo'
import { useCameraDevice, useCameraPermission, Camera, PhotoFile } from 'react-native-vision-camera'






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

    setTakenPhotos([...TakenPhotos, photo.path])
    setIsShutterLoading(false)
  }
  console.log(TakenPhotos);


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
          {isShutterLoading ?
            <ActivityIndicator color={'orange'} size={70} style={styles.shutterButton} />
            :
            <TouchableOpacity onPress={handleShutter} style={styles.shutterButton}>
              <Entypo name='circle' color='white' size={70} />
            </TouchableOpacity>}
        </>
        :
        <>
         
          <FlatList
          ListHeaderComponent={
           <>
              <Text style={styles.mainHeading}>ImageUploader</Text>
              <TouchableOpacity style={styles.cameraButton} onPress={() => handleCameraButton()} >
                <Entypo name='camera' size={50} />
              </TouchableOpacity>
           </>

          }
          ListEmptyComponent={<Text style={styles.emptyComponentStyle}>No Images!</Text>}
          data={TakenPhotos}
          renderItem={({item})=>
            
              <Image source={{
                uri: `file://${item}`}}
                style={styles.takenImageStyle}
                />
          
          }
          
          />
          {/* {TakenPhotos.length > 0 ?
            <Image source={{
              uri: `file://${TakenPhotos[0]}`}}
              style={styles.takenImageStyle}
              />
            :
            <Text>
              No images
            </Text>
          } */}
        </>
      }
    </View>
  )
}

export default ImageUploader