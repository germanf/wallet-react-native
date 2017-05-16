import React, {Component} from 'react'
import {View, Text} from 'react-native'

export default class Deposit extends Component {
  static navigationOptions = {
    title: 'Deposit',
  }

  render() {
    return (
      <View style={{flex:1}}>
        <Text>
          Deposit Page
        </Text>
      </View>
    )
  }
}
