import React, {Component} from 'react'
import {View, Text} from 'react-native'

export default class Receive extends Component {
  static navigationOptions = {
    title: 'Receive',
  }

  render() {
    return (
      <View style={{flex:1}}>
        <Text>
          Receive Page
        </Text>
      </View>
    )
  }
}
