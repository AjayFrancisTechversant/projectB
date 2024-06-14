import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    canvas:{flex:1,backgroundColor:'white'},
    mainHeading:{
        fontSize:40,alignSelf:'center',marginVertical:20
    },
    cameraButton:{alignSelf:'center',marginBottom:20},
    shutterButton:{position:'absolute',bottom:20,alignSelf:'center'},
    backButton:{position:'absolute',top:10,left:10},
    emptyComponentStyle:{ alignSelf:'center',fontSize:30,color:'orange'},
    takenImageStyle:{height:200,width:200},
    itemSeparatorComponent:{width:20},
    galleryIcon:{position:'absolute',bottom:30,left:40},
    imageDeleteCloseButton:{zIndex:1, position:'absolute',top:3,right:3},
    uploadButton:{alignSelf:'center'},
    only6PicsText:{alignSelf:'center',margin:10,color:'red'}
});