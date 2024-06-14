import {  ActivityIndicator, Alert, StyleSheet, Text, TouchableOpacity, View} from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { Camera, useCameraDevice } from 'react-native-vision-camera'
import { styles } from './Style'
import { useIsFocused } from '@react-navigation/native'
import { useAppState } from '@react-native-community/hooks'
import Entypo from 'react-native-vector-icons/Entypo'






const CameraScreen = ({navigation}) => {
    const [TakenPhotos,setTakenPhotos]=useState([])
    const [isShutterLoading,setIsShutterLoading]=useState(false)
    const camera=useRef(null)
    const device = useCameraDevice('back')
    if (device == null) {
        Alert.alert('no camera device');
    }
    const handleShutter=async()=>{
        setIsShutterLoading(true)
        const photo = await camera.current.takePhoto() 
         
        setTakenPhotos([...TakenPhotos,photo.path])
        setIsShutterLoading(false)
      }
  console.log(TakenPhotos);
    return (


     <View style={styles.canvas}>
          
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
                <TouchableOpacity onPress={()=>navigation.goBack()} style={styles.backButton} >
                    <Entypo name='chevron-left' color='white' size={40}/>
                </TouchableOpacity>
                {isShutterLoading?
                    <ActivityIndicator color={'orange'} size={70} style={styles.shutterButton}/>
                :
                    <TouchableOpacity onPress={handleShutter} style={styles.shutterButton}>
                    <Entypo name='circle' color='white' size={70}/>
                </TouchableOpacity> }      
          
     </View>

    )
}

export default CameraScreen