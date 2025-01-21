import { View, Text, Platform, StatusBar } from 'react-native'
import React, { useEffect } from 'react'
import { ActivityIndicator, MD2Colors } from 'react-native-paper'
import Navigation from './src/navigation/Navigation'
import { requestPhotoPermission } from './src/utils/Constants'
import { checkFilePermissions } from './src/utils/libraryHelpers'

const App = () => {

  useEffect(() => {
    requestPhotoPermission();
    checkFilePermissions(Platform.OS);
  }, [])

  return (
    <>
      <StatusBar translucent barStyle={'dark-content'} backgroundColor={'transparent'} />
      <Navigation />
    </>
  )
}

export default App