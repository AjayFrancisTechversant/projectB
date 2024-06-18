import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import ImageUploader from '../Screens/ImageUploader/ImageUploader'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Me from '../Screens/Me/Me'

const BottomTabStack=createBottomTabNavigator()

const BottomTabStack1 = () => {
  return (
   <BottomTabStack.Navigator screenOptions={{headerShown:false,tabBarStyle:{height:50}}}>
    <BottomTabStack.Screen name='ImageUploader' component={ImageUploader} />
    <BottomTabStack.Screen name='Me' component={Me} />


   </BottomTabStack.Navigator>
  )
}

export default BottomTabStack1