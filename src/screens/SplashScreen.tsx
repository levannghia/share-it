import { View, Image } from 'react-native'
import React, { FC, useEffect } from 'react'
import { commonStyles } from '../styles/commonStyles'
import { navigate } from '../utils/NavigationUtil'

const SplashScreen: FC = () => {
    const navigationHome = () => {
        navigate('HomeScreen');
    }

    useEffect(() => {
        const timeoutId = setTimeout(navigationHome, 1200)
        return () => clearTimeout(timeoutId);
    }, [])

    return (
        <View style={commonStyles.container}>
            <Image source={require('../assets/images/logo_text.png')} style={commonStyles.img} />
        </View>
    )
}

export default SplashScreen