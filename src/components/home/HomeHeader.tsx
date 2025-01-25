import { View, Text, Image, StatusBar } from 'react-native'
import React, { FC, useState } from 'react'
import { homeHeaderStyles } from '../../styles/homeHeaderStyles'
import { commonStyles } from '../../styles/commonStyles'
import { TouchableOpacity } from 'react-native'
import Icon from '../global/Icon'
import { Colors, screenHeight, screenWidth, svgPath } from '../../utils/Constants'
import Svg, {Path, Defs, LinearGradient, Stop} from 'react-native-svg'
import QRGenerateModal from '../modals/QRGenerateModal'

const HomeHeader: FC = () => {
    const [isVisible, setIsVisible] = useState(false)
    return (
        <View style={homeHeaderStyles.mainContainer}>
            <StatusBar backgroundColor={Colors.primary} barStyle={'light-content'}/>
            <View style={[commonStyles.flexRowBetween, homeHeaderStyles.container]}>
                <TouchableOpacity>
                    <Icon iconFamily='Ionicons' name='menu' size={22} color='#fff' />
                </TouchableOpacity>
                <Image source={require('../../assets/images/logo_t.png')} style={homeHeaderStyles.logo} />
                <TouchableOpacity onPress={() => setIsVisible(true)}>
                    <Image source={require('../../assets/images/profile.jpg')} style={homeHeaderStyles.profile} />
                </TouchableOpacity>
            </View>
            <Svg
                height={screenHeight * 0.18}
                width={screenWidth}
                viewBox='0 0 1440 220'
                style={homeHeaderStyles.curve}
            >
                <Defs>
                    <LinearGradient
                        id="grad"
                        x1="0"
                        y1="0"
                        x2="0"
                        y2="1"
                    >
                        <Stop offset="0%" stopColor="#007AFF" stopOpacity="1"/>
                        <Stop offset="100%" stopColor="#80BFFF" stopOpacity="1"/>
                    </LinearGradient>
                </Defs>
                <Path fill="#80BFFF" d={svgPath}/>
                <Path fill="url(#grad)" d={svgPath}/>
            </Svg>
            {isVisible && (
                <QRGenerateModal visible={isVisible} onClose={() => setIsVisible(false)}/>
            )}
        </View>
    )
}

export default HomeHeader