import { View, Text, ScrollView } from 'react-native'
import React, { FC } from 'react'
import { commonStyles } from '../styles/commonStyles'
import HomeHeader from '../components/home/HomeHeader'
import ContainerView from '../components/global/ContainerView'
import SendReceiveButton from '../components/home/SendReceiveButton'
import Options from '../components/home/Options'

const HomeScreen: FC = () => {
    return (
        <ContainerView>
            <View style={commonStyles.baseContainer}>
                <HomeHeader />
                <ScrollView
                    contentContainerStyle={{ paddingBottom: 100, padding: 15 }}
                    showsHorizontalScrollIndicator={false}
                >
                    <SendReceiveButton/>
                    <Options isHome/>
                </ScrollView>
            </View>
        </ContainerView>

    )
}

export default HomeScreen