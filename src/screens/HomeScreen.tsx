import { View, Text } from 'react-native'
import React, { FC } from 'react'
import { commonStyles } from '../styles/commonStyles'
import HomeHeader from '../components/home/HomeHeader'
import ContainerView from '../components/global/ContainerView'

const HomeScreen: FC = () => {
    return (
        <ContainerView>
            <View style={commonStyles.baseContainer}>
                <HomeHeader />
            </View>
        </ContainerView>

    )
}

export default HomeScreen