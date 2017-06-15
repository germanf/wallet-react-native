import React, {Component} from 'react'
import {View, Text, StyleSheet, TouchableHighlight} from 'react-native'

export default class Notification extends Component {

  render() {
    return (
      <TouchableHighlight
        style={styles.options} >
        <View style={styles.optionsElement}>
          <Text style={{fontSize:22}}>
            {this.props.data.description}
          </Text>
          <View style={styles.buttons}>
            <TouchableHighlight
              style={[styles.button, {backgroundColor: this.props.data.email_enabled === true ? '#2070A0' : 'greenyellow'}]}
              onPress={() => this.props.enableEmail(this.props.data.id, this.props.data.email_enabled)} >
              <Text style={{color:'white', fontSize:20}}>
                Email
              </Text>
            </TouchableHighlight>
            <TouchableHighlight
              style={[styles.button, {backgroundColor: this.props.data.sms_enabled === true ? '#2070A0' : 'greenyellow'}]}
              onPress={() => this.props.enableSMS(this.props.data.id, this.props.data.sms_enabled)} >
              <Text style={{color:'white', fontSize:20}}>
                SMS
              </Text>
            </TouchableHighlight>
          </View>
        </View>
      </TouchableHighlight>
    )
  }
}

const styles = StyleSheet.create({
  options: {
    padding: 10,
    height: 120,
    width: "100%",
    borderBottomWidth: 1,
    borderBottomColor: "lightgray",
    alignItems: 'flex-start',
    justifyContent:'center',
  },
  optionsElement: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent:'center',
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 10,
  },
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
    marginRight: 6,
    padding: 10,
  },
})
