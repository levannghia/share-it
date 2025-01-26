import { View, Text, TouchableOpacity } from 'react-native'
import React, { FC } from 'react'
import { optionStyles } from '../../styles/optionsStyles'
import Icon from '../global/Icon'
import { Colors } from '../../utils/Constants'
import CustomText from '../global/CustomText'
import { useTCP } from '../../service/TCPProvider'

const Options: FC<{
    isHome?: boolean,
    onMediaPickedUp?: (media: any) => void,
    onFilePickedUp?: (file: any) => void,
}> = ({ isHome, onFilePickedUp, onMediaPickedUp }) => {

    const {isConnected, startServer} = useTCP()

    const handleUniversalPicker = async (type: string) => {
        startServer(12);
        if(isConnected) {
            console.log("ket noi tc");
        } else {
            console.log("ket noi that bai");
        }
    }

    return (
        <View style={optionStyles.container}>
            <TouchableOpacity style={optionStyles.subContainer} onPress={() => handleUniversalPicker('image')}>
                <Icon iconFamily='Ionicons' name='images' color={Colors.primary} size={20} />
                <CustomText fontFamily='Okra-Medium' style={{marginTop: 4, textAlign: 'center'}}>Photo</CustomText>
            </TouchableOpacity>
            <TouchableOpacity style={optionStyles.subContainer} onPress={() => handleUniversalPicker('file')}>
                <Icon iconFamily='Ionicons' name='musical-notes-sharp' color={Colors.primary} size={20} />
                <CustomText fontFamily='Okra-Medium' style={{marginTop: 4, textAlign: 'center'}}>Audio</CustomText>
            </TouchableOpacity>
            <TouchableOpacity style={optionStyles.subContainer} onPress={() => handleUniversalPicker('file')}>
                <Icon iconFamily='Ionicons' name='folder-open' color={Colors.primary} size={20} />
                <CustomText fontFamily='Okra-Medium' style={{marginTop: 4, textAlign: 'center'}}>Files</CustomText>
            </TouchableOpacity>
            <TouchableOpacity style={optionStyles.subContainer} onPress={() => handleUniversalPicker('file')}>
                <Icon iconFamily='MaterialCommunityIcons' name='contacts' color={Colors.primary} size={20} />
                <CustomText fontFamily='Okra-Medium' style={{marginTop: 4, textAlign: 'center'}}>Contacts</CustomText>
            </TouchableOpacity>
        </View>
    )
}

export default Options