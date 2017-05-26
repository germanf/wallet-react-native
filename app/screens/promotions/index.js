import React, {Component} from 'react'
import {View, Text} from 'react-native'

export default class Promotions extends Component {
  static navigationOptions = {
    title: 'Promotions',
  }

  render() {
    return (
      <View style={{flex:1}}>
        <Text>
          Promotions Page
        </Text>
      </View>
    )
  }
}
