import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    loginAsGuestButton: { height: 50, width: 300, backgroundColor: 'grey', borderRadius: 5, alignSelf: 'center', justifyContent: 'center', alignItems: 'center', marginVertical: 20 },
    loginWithOTPButton: { height: 50, width: 300, backgroundColor: 'grey', borderRadius: 5, alignSelf: 'center', justifyContent: 'center', alignItems: 'center', marginVertical: 20 },
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
        backgroundColor:'rgba(0,0,0,0.7)'
    },
    modalView: {height:500,width:400,
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 10,
    },
    cancelButton:{backgroundColor:'red',borderRadius:5,padding:10,margin:20},
    textInput:{width:300},
    modalHeadingText:{marginBottom:10},
    sendOTPButton:{backgroundColor:'green',borderRadius:5,padding:10,margin:20},
    reEnterMOBButton:{backgroundColor:'grey',borderRadius:5,padding:10,margin:20}
});