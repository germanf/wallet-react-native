import React, {Component} from 'react'
import {View, Text, TouchableHighlight, StyleSheet} from 'react-native'

export default class HomeComponent extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>Hello {this.props.name}!</Text>
        <TouchableHighlight
          style={styles.submit}
          onPress={this.props.logout}>
          <Text>
               Log out
          </Text>
        </TouchableHighlight>
      </View>
    )
  }
}

const styles = StyleSheet.create({
   container: {
      justifyContent:'center',
      paddingTop: 50,
   },
   submit: {
      backgroundColor: 'silver',
      margin: 15,
      padding: 10,
      height: 40,
      width: "90%",
      alignItems: 'center',
      justifyContent:'center',
   },
})

