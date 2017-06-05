import React, {Component} from 'react'
import {View, Text, StyleSheet, TouchableHighlight} from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome';

export default class Options extends Component {

  render() {
    return (
      <TouchableHighlight
        style={styles.options}
        onPress={() => this.props.goTo(this.props.gotoAddress)}>
        <View style={styles.optionsElement}>
          <Text style={styles.optionsText}>
            {this.props.name}
          </Text>
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
    padding: 10,
    height: 60,
    width: "100%",
    borderBottomWidth: 1,
    borderBottomColor: "lightgray",
    alignItems: 'center',
    justifyContent:'center',
  },
  optionsElement: {
    flex:1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent:'flex-start',
  },
  optionsText: {
    flex:1,
    fontSize:20,
  },
  optionsIcon: {
    flex:1,
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
})
