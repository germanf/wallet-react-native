import React, {Component} from 'react'
import {View, Text, StyleSheet, TouchableHighlight} from 'react-native'
import IconFontAwesome from 'react-native-vector-icons/FontAwesome'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'

export default class Account extends Component {

  render() {
    return (
      <TouchableHighlight
        style={styles.options}
        onPress={() => this.props.onPress(this.props.reference)}>
        <View style={styles.optionsElement}>
          <View style={styles.optionsText}>
            <MaterialIcons
              name="radio-button-unchecked"
              size={50}
            />
            <Text style={{fontSize:22}}>
              {this.props.name}
            </Text>
          </View>
          <View style={styles.optionsIcon}>
            <IconFontAwesome
              name="angle-double-right"
              size={50}
            />
          </View>
        </View>
      </TouchableHighlight>
    )
  }
}

const styles = StyleSheet.create({
  options: {
    padding: 10,
    height: 80,
    width: "100%",
    borderBottomWidth: 1,
    borderBottomColor: "lightgray",
  },
  optionsElement: {
    flex:1,
    flexDirection: 'row',
  },
  optionsText: {
    flex:2,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  optionsIcon: {
    flex:1,
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
})
