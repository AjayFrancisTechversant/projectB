import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import auth from '@react-native-firebase/auth';


const Me = () => {
    const handleLogout = () => {
        auth()
            .signOut()
            .then(() => console.log('User signed out!'));
    }
    return (
        <View>
            <Text>Me</Text>
            <TouchableOpacity onPress={() => handleLogout()}>
                <Text>Logout</Text>
            </TouchableOpacity>
        </View>
    )
}

export default Me