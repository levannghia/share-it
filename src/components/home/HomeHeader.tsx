import { View, Text, Image, StatusBar } from 'react-native'
import React, { FC } from 'react'
import { homeHeaderStyles } from '../../styles/homeHeaderStyles'
import { commonStyles } from '../../styles/commonStyles'
import { TouchableOpacity } from 'react-native'
import Icon from '../global/Icon'
import { Colors } from '../../utils/Constants'

const HomeHeader: FC = () => {
    return (
        <View style={homeHeaderStyles.mainContainer}>
            <StatusBar backgroundColor={Colors.primary} barStyle={'light-content'}/>
            <View style={[commonStyles.flexRowBetween, homeHeaderStyles.container]}>
                <TouchableOpacity>
                    <Icon iconFamily='Ionicons' name='menu' size={22} color='#fff' />
                </TouchableOpacity>
                <Image source={require('../../assets/images/logo_t.png')} style={homeHeaderStyles.logo} />
                <TouchableOpacity>
                    <Image source={require('../../assets/images/profile.jpg')} style={homeHeaderStyles.profile} />
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default HomeHeader