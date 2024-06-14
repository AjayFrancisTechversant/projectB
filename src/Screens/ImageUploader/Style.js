import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    canvas:{flex:1,backgroundColor:'white'},
    mainHeading:{
        fontSize:40,alignSelf:'center',marginVertical:20
    },
    cameraButton:{alignSelf:'center'},
    shutterButton:{position:'absolute',bottom:20,alignSelf:'center'},
    backButton:{position:'absolute',top:10,left:10},
    emptyComponentStyle:{marginTop:30,alignSelf:'center',fontSize:30,color:'orange'},
    takenImageStyle:{height:100,width:100}
});