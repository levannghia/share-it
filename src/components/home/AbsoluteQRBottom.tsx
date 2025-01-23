import { View, Text, TouchableOpacity } from 'react-native'
import React, { FC, useState } from 'react'
import { bottomTabStyles } from '../../styles/bottomTabStyle';
import { navigate } from '../../utils/NavigationUtil';
import Icon from '../global/Icon';
import QRScannerModal from '../modals/QRScannerModal';

const AbsoluteQRBottom: FC = () => {
    const [isVisible, setIsVisible] = useState(false);

    return (
        <>
            <View style={bottomTabStyles.container}>
                <TouchableOpacity onPress={() => navigate('ReceiveFileScreen')}>
                    <Icon name='apps-sharp' iconFamily='Ionicons' color='#333' size={24} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setIsVisible(true)} style={bottomTabStyles.qrCode}>
                    <Icon name='qrcode-scan' iconFamily='MaterialCommunityIcons' color='#fff' size={26} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigate('')}>
                    <Icon name='beer-sharp' iconFamily='Ionicons' color='#333' size={24} />
                </TouchableOpacity>
            </View>
            {isVisible && <QRScannerModal visible={isVisible} onClose={() => setIsVisible(false)}/>}
        </>
    )
}

export default AbsoluteQRBottom