import { View, Text } from 'react-native'
import React from 'react'
import { ActivityIndicator, MD2Colors } from 'react-native-paper'

const App = () => {
  return (
    <View>
      <Text>App</Text>
      <ActivityIndicator animating={true} color={MD2Colors.red800} />
    </View>
  )
}

export default App