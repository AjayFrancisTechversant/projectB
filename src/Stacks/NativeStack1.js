import { View, Text } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import ImageUploader from '../Screens/ImageUploader/ImageUploader'
import CameraScreen from '../Screens/CameraScreen/CameraScreen'

const Stack=createNativeStackNavigator()

const NativeStack1 = () => {
  return (
   <Stack.Navigator screenOptions={{headerShown:false}}>
    <Stack.Screen name='ImageUploader' component={ImageUploader} />
    <Stack.Screen name='CameraScreen' component={CameraScreen} />

   </Stack.Navigator>
  )
}

export default NativeStack1