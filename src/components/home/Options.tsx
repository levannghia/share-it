import { View, Text, TouchableOpacity } from 'react-native'
import React, { FC } from 'react'
import { optionStyles } from '../../styles/optionsStyles'
import Icon from '../global/Icon'
import { Colors } from '../../utils/Constants'

const Options: FC<{
    isHome?: boolean,
    onMediaPickedUp?: (media: any) => void,
    onFilePickedUp?: (file: any) => void,
}> = ({ isHome, onFilePickedUp, onMediaPickedUp }) => {

    const handleUniversalPicker = async (type: string) => {

    }

    return (
        <View style={optionStyles.container}>
            <TouchableOpacity style={optionStyles.subContainer} onPress={() => handleUniversalPicker('image')}>
                <Icon iconFamily='Ionicons' name='images' color={Colors.primary} size={20} />
            </TouchableOpacity>
        </View>
    )
}

export default Options