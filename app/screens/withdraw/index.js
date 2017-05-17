import React, {Component} from 'react'
import {View, Text, StyleSheet} from 'react-native'

export default class Withdraw extends Component {
  static navigationOptions = {
    title: 'Withdraw',
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>
          Withdraw Page
        </Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    borderColor: 'black',
    height: 80,
    backgroundColor: 'white',
  },
})
