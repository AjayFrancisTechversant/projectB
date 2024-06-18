import { View, Text, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { styles } from './Style'
import AntDesign from 'react-native-vector-icons/AntDesign';

const CardA = ({ item, index, onPressDeletefn, componentlocation }) => {
    return (
        <View style={styles.cardView}>
            <TouchableOpacity onPress={() => onPressDeletefn(index)} style={styles.imageDeleteCloseButton}>
                <AntDesign name='closecircle' size={30} color={'red'} />
            </TouchableOpacity>
            {componentlocation == 'cacheImagesDisplay' ?
                <Image source={{ uri: `file://${item}` }} style={styles.imageStyle} />
                :
                <Image source={{ uri: item }} style={styles.imageStyle} />
            }
        </View>
    )
}

export default CardA