import React, { Component } from 'react'
import { View, Text, StyleSheet } from 'react-native'

export default class Settings extends Component {
  static navigationOptions = {
    title: 'Cards',
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>
          Cards
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
