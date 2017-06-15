import React, { Component } from 'react'
import { View } from 'react-native'
import PickerDropDown from 'react-native-picker-dropdown'

export default class Picker extends Component {
  static Item = PickerDropDown.Picker.Item

  render() {
    const { children, style } = this.props
    return (
      <View
        style={[{
          backgroundColor: 'white',
          margin: 10,
          marginTop: 0,
        }, style]}>
        <PickerDropDown.Picker
          {...this.props}
          style={[{
            alignSelf: 'stretch',
            color: 'black',
            height: 32,
          }, style]}>
          {children}
        </PickerDropDown.Picker>
      </View>
    )
  }
}
