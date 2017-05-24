import React, {Component} from 'react'
import {View, Text, StyleSheet, TouchableHighlight} from 'react-native'

export default class Settings extends Component {

  render() {
    return (
      <TouchableHighlight
        style={styles.contact}
        onPress={() => this.props.selected(this.props.rowData.contact)} >
        <View style={styles.container}>
          <Text>
            {this.props.rowData.name}
          </Text>
          <Text>
            {this.props.rowData.contact}
          </Text>
        </View>
      </TouchableHighlight>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex:1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent:'center',
  },
  contact: {
    height: 60,
    alignItems: 'center',
    justifyContent:'center',
    borderBottomWidth: 1,
    borderBottomColor: 'gray',
  },
})






