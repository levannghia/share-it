import {Platform, SafeAreaView, StyleSheet } from 'react-native'
import React, { FC, PropsWithChildren } from 'react'
import { statusBarHeight } from '../../utils/Constants'

const ContainerView: FC<PropsWithChildren> = ({children}) => {
  return (
    <SafeAreaView style={styles.container}>
      {children}
    </SafeAreaView>
  )
}

export default ContainerView

const styles = StyleSheet.create({
    container: {
      flex: 1,
      paddingTop: Platform.OS == 'android' ? statusBarHeight : 0,
    }
})