import { View, Text, TouchableOpacity, Modal, Alert, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import auth from '@react-native-firebase/auth';
import { styles } from './Style';
import { TextInput } from 'react-native-paper';



const LoginPage = () => {
    const [modalVisible, setModalVisible] = useState(false);
    const [enteredMobNumber, setEnteredMobNumber] = useState('')
    const [isOTPSent, setIsOTPSent] = useState(false)
    // If null, no SMS has been sent
    const [confirm, setConfirm] = useState(null);
    const [isLoading,setIsLoading]=useState(false)

    // verification code (OTP - One-Time-Passcode)
    const [code, setCode] = useState('');

    // function onAuthStateChanged(user) {
    //     if (user) {
    //         // Some Android devices can automatically process the verification code (OTP) message, and the user would NOT need to enter the code.
    //         // Actually, if he/she tries to enter it, he/she will get an error message because the code was already used in the background.
    //         // In this function, make sure you hide the component(s) for entering the code and/or navigate away from this screen.
    //         // It is also recommended to display a message to the user informing him/her that he/she has successfully logged in.
    //     }
    // }

    // useEffect(() => {
    //     const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    //     return subscriber; // unsubscribe on unmount
    // }, []);

    const handleGuestSignin = () => {
        setIsLoading(true)
        auth()
            .signInAnonymously()
            .then(() => {
                console.log('User signed in anonymously')
                setIsLoading(false)
            })
            .catch(error => {
                if (error.code === 'auth/operation-not-allowed') {
                    console.log('Enable anonymous in your firebase console.');
                }
                console.error(error);
                setIsLoading(false)
            });
            
    }

    async function signInWithPhoneNumber(phoneNumber) {
        setIsLoading(true)
        try {
            const confirmation = await auth().signInWithPhoneNumber(phoneNumber);
            console.log(confirmation);
            setConfirm(confirmation);
            setIsOTPSent(true)
        } catch (error) {
            Alert.alert(error.message)
            console.log(error.message);
        }
        setIsLoading(false)
    }
    async function confirmCode() {
        try {
            await confirm.confirm(code);
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <View>
            <Text style={{ alignSelf: 'center' }}>LoginPage</Text>
            <TouchableOpacity style={styles.loginAsGuestButton} onPress={() => handleGuestSignin()}>
                {isLoading?
                <ActivityIndicator size={30} color={'white'}/>
                :
                <Text>Guest</Text>}
            </TouchableOpacity>
            <TouchableOpacity style={styles.loginWithOTPButton} onPress={() => setModalVisible(true)}>
                <Text>Login With OTP</Text>
            </TouchableOpacity>
            <Modal

                animationType="slide"
                visible={modalVisible}
                onRequestClose={() => {
                    Alert.alert('Modal has been closed.');
                    setModalVisible(!modalVisible);
                }}>
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Text style={styles.modalHeadingText}>Login with OTP</Text>
                        {!isOTPSent ?
                            <View>
                                <TextInput

                                    mode='outlined'
                                    style={styles.textInput}
                                    label="Enter Mobile number"
                                    value={enteredMobNumber}
                                    onChangeText={text => setEnteredMobNumber(text)}
                                />
                                <TouchableOpacity
                                    style={styles.sendOTPButton}
                                    onPress={() => signInWithPhoneNumber('+91' + enteredMobNumber)}                            >
                                   {isLoading?
                                   <ActivityIndicator size={30} color={'white'}/>
                                   :
                                   <Text style={{color:'white'}} >Send OTP</Text>
                                   }
                                </TouchableOpacity>
                            </View>
                            :
                            <View>
                                <TextInput
                                    keyboardType='numeric'
                                    mode='outlined'
                                    style={styles.textInput}
                                    label="Enter OTP"
                                    value={code}
                                    onChangeText={e => setCode(e)}
                                />
                                <TouchableOpacity
                                    style={styles.reEnterMOBButton}
                                    onPress={() => setIsOTPSent(false)}                            >
                                    <Text >re-enter MOB number</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={styles.sendOTPButton}
                                    onPress={() => confirmCode()}
                                >
                                    <Text >Verify</Text>
                                </TouchableOpacity>
                            </View>
                        }
                        <TouchableOpacity
                            style={styles.cancelButton}
                            onPress={() => setModalVisible(!modalVisible)}>
                            <Text >cancel</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </View>
    )
}

export default LoginPage