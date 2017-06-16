import React, { Component } from 'react'
import { View, Text, StyleSheet } from 'react-native'

export default class Settings extends Component {
  static navigationOptions = {
    title: 'Security',
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>
          Security
        </Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
})
