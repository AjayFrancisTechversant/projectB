import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    canvas: { flex: 1, backgroundColor: 'white' },
    mainHeading: {
        fontSize: 40, marginVertical: 10, marginLeft: 10, fontWeight: "bold"
    },
    subHeading: {fontSize: 20, marginVertical: 10, marginLeft: 10,fontWeight:'bold'},
    dashedBorder: { borderWidth: 1, width: 300, height: 150, alignSelf: 'center', borderRadius: 20, justifyContent: 'center', alignItems: 'center', borderStyle: 'dashed', borderColor: 'grey' },
    cameraButton: { marginBottom: 20, },
    shutterButton: { position: 'absolute', bottom: 20, alignSelf: 'center' },
    backButton: { position: 'absolute', top: 10, left: 10 },
    emptyComponentStyle: { alignSelf: 'center', fontSize: 14, marginLeft: 30, marginTop: 10 },
    imageStyle: { height: 200, width: 200, borderRadius: 10 },
    itemSeparatorComponent: { width: 20 },
    galleryIcon: { position: 'absolute', bottom: 30, left: 40 },
    imageDeleteCloseButton: { zIndex: 1, position: 'absolute', top: 5, right: 5 },
    uploadButton: { alignSelf: 'center', marginTop: 20 },
    only6PicsText: { alignSelf: 'center', margin: 10, color: 'red' },
    lineBreak: { alignSelf: 'center' },
    uploadedImagesContainer: {
    },
    flashIcon: { position: 'absolute', right: 10, top: 10 },
    torchIcon: { position: 'absolute', right: 10, top: 100 },
    cardView:{marginVertical:10}
});