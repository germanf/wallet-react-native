import React, {Component} from 'react'
import {View, Text} from 'react-native'

export default class Transections extends Component {
  static navigationOptions = {
    title: 'Transections',
  }

  render() {
    return (
      <View style={{flex:1}}>
        <Text>
          Transections Page
        </Text>
      </View>
    )
  }
}
