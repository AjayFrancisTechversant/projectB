import { View, Text } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import ImageUploader from './src/Screens/ImageUploader/ImageUploader'
import NativeStack1 from './src/Stacks/NativeStack1'


const App = () => {
  return (
   <NavigationContainer>
    <NativeStack1/>
    </NavigationContainer>
  
  )
}

export default App