import { View, Text,StyleSheet } from 'react-native'
import React from 'react'

export default function SignUp() {
  return (
    <View style={styles.container}>
      <Text>sign-up</Text>
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 50,
    gap: 10,
  },
})