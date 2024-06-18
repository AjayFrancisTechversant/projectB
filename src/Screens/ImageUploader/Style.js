import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    canvas: { flex: 1, backgroundColor: 'white' },
    mainHeading: {
        fontSize: 30, marginVertical: 10, marginLeft: 10, fontWeight: "bold"
    },
    subHeading: {fontSize: 20, marginVertical: 10, marginLeft: 10,fontWeight:'bold'},
    dashedBorder: { borderWidth: 1, width: 300, height: 150, alignSelf: 'center', borderRadius: 20, justifyContent: 'center', alignItems: 'center', borderStyle: 'dashed', borderColor: 'grey' ,marginBottom:10},
    cameraButton: { marginBottom: 20, },
    emptyComponentStyle: { alignSelf: 'center', fontSize: 14, marginLeft: 30,  },
    
    itemSeparatorComponent: { width: 20 },
    
    uploadButton: { alignSelf: 'center', marginTop: 20 },
    only6PicsText: { alignSelf: 'center', margin: 10, color: 'red' },
    uploadedImagesContainer: {
    },
    
});