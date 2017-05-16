import React, {Component} from 'react'
import {View, Text} from 'react-native'

export default class Withdraw extends Component {
  static navigationOptions = {
    title: 'Withdraw',
  }

  render() {
    return (
      <View style={{flex:1}}>
        <Text>
          Withdraw Page
        </Text>
      </View>
    )
  }
}
