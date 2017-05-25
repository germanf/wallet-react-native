import React, {Component} from 'react'
import {View, Text} from 'react-native'

export default class Settings extends Component {
  static navigationOptions = {
    title: 'Settings',
  }

  render() {
    return (
      <View style={{flex:1}}>
        <Text>
          Settings
        </Text>
      </View>
    )
  }
}
