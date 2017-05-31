import React, {Component} from 'react'
import {View, Text, StyleSheet, TouchableHighlight} from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome';

export default class Account extends Component {

  render() {
    return (
      <TouchableHighlight
        style={styles.options}
        onPress={() => this.props.onPress(this.props.reference)}>
        <View style={styles.optionsElement}>
          <View style={styles.optionsText}>
            <Icon
              name="bank"
              size={35}
            />
            <Text style={{fontSize:22}}>
              {this.props.name}
            </Text>
          </View>
          <View style={styles.optionsIcon}>
            <Icon
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
    padding: 20,
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
