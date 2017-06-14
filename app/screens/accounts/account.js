import React, {Component} from 'react'
import {View, Text, StyleSheet, TouchableHighlight} from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'

export default class Account extends Component {

  render() {
    return (
      <TouchableHighlight
        style={styles.options}
        onPress={() => this.props.getCurrencies(this.props.reference)}>
        <View style={styles.optionsElement}>
          <View style={styles.icon}>
            <MaterialIcons
              name="radio-button-unchecked"
              size={50}
            />
          </View>
          <View style={styles.type}>
            <Text style={{fontSize:25}}>
              {this.props.name}
            </Text>
            <Text style={{fontSize:13}}>
              {this.props.reference}
            </Text>
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
    alignItems: 'flex-start',
    justifyContent:'center',
  },
  optionsElement: {
    flex:1,
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent:'center',
  },
  icon: {
    flex:1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  type: {
    flex:4,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
})
