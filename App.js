import React, { useEffect, useState } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import NativeStack1 from './src/Stacks/BottomTabStack1'
import auth from '@react-native-firebase/auth';
import LoginPage from './src/Screens/LoginPage/LoginPage';

const App = () => {

    // Set an initializing state whilst Firebase connects
    const [initializing, setInitializing] = useState(true);
    const [user, setUser] = useState();
  
    // Handle user state changes
    function onAuthStateChanged(user) {
      setUser(user);
      if (initializing) setInitializing(false);
    }
  
    useEffect(() => {
      const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
      return subscriber; // unsubscribe on unmount
    }, []);
  
    if (initializing) return null;
  return (
   <NavigationContainer>

    {!user?
    <LoginPage/>
    :
    <NativeStack1/>}
    </NavigationContainer>
  
  )
}

export default App