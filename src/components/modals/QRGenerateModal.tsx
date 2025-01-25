import { View, Modal, TouchableOpacity, ActivityIndicator, Image } from 'react-native'
import React, { FC, useEffect, useMemo, useState } from 'react'
import { modalStyles } from '../../styles/modalStyles';
import Icon from '../global/Icon';
import CustomText from '../global/CustomText';
import {Camera, CodeScanner, useCameraDevice} from 'react-native-vision-camera';
import Animated, { Easing, useAnimatedStyle, useSharedValue, withRepeat, withTiming } from 'react-native-reanimated';
import LinearGradient from 'react-native-linear-gradient'
import QRCode from 'react-native-qrcode-svg';
import { multiColor } from '../../utils/Constants';
import DeviceInfo from 'react-native-device-info';

interface ModalProps {
    visible: boolean,
    onClose: () => void;
}

const QRGenerateModal: FC<ModalProps> = ({ visible, onClose }) => {
    const [loading, setLoading] = useState(true);
    const [qrValue, setQRValue] = useState('saaaaaa');
    const shimmerTranslateX = useSharedValue(-300);

    const shimmerStyle = useAnimatedStyle(() => ({
        transform: [{translateX: shimmerTranslateX.value}],
    }))

    const setupServer = async () => {
        const deviceName  = await DeviceInfo.getDeviceName();
        setLoading(false);
        console.log(deviceName);
        
    }

    useEffect(() => {
        shimmerTranslateX.value = withRepeat(
            withTiming(300, {duration: 1500, easing: Easing.linear}),
            -1,
            false
        )

        if(visible) {
            setLoading(true);
            setupServer()
        }
    }, [visible])


    return (
        <Modal
            animationType='slide'
            visible={visible}
            presentationStyle='formSheet'
            onRequestClose={onClose}
            onDismiss={onClose}
        >
            <View style={modalStyles.modalContainer}>
                <View style={modalStyles.qrContainer}>
                    {loading || qrValue == null || qrValue == "" ? (
                        <View style={modalStyles.skeleton}>
                            <Animated.View style={[modalStyles.shimmerOverlay, shimmerStyle]}>
                                <LinearGradient
                                    colors={['#f3f3f3', '#fff', '#f3f3f3']}
                                    start={{x: 0, y: 0}}
                                    end={{x: 0, y: 0}}
                                    style={modalStyles.shimmerGradient}
                                />
                            </Animated.View>
                        </View>
                    ) : (
                        <QRCode
                            value={qrValue}
                            size={250}
                            logo={require('../../assets/images/profile2.jpg')}
                            logoBackgroundColor='#fff'
                            logoMargin={2}
                            logoBorderRadius={10}
                            logoSize={60}
                            linearGradient={multiColor}
                            enableLinearGradient
                        />
                    )}
                </View>
                <View style={modalStyles.info}>
                    <CustomText style={modalStyles.infoText1}>
                        Ensure you're on the sam wifi network.
                    </CustomText>
                    <CustomText style={modalStyles.infoText2}>
                        Ask the sender to scan this QR code to connect and transfer files.
                    </CustomText>
                </View>
                <ActivityIndicator size={'small'} color={'#000'} style={{ alignSelf: 'center' }} />
                <TouchableOpacity onPress={() => onClose()} style={modalStyles.closeButton}>
                    <Icon name='close' iconFamily='Ionicons' size={24} color='#000' />
                </TouchableOpacity>
            </View>

        </Modal>
    )
}

export default QRGenerateModal