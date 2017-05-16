import React, {Component} from 'react'
import {KeyboardAvoidingView, StyleSheet, TouchableHighlight, Text, TextInput} from 'react-native'

export default class ForgetPasswordComponent extends Component {

  render() {
    return (
      <KeyboardAvoidingView style={styles.container} behavior={'padding'}>
        <TextInput
          style={styles.input}
          placeholder="Email"
          autoCapitalize="none"
          keyboardType="email-address"
          onChangeText={this.props.emailChanged}
        />
        <TextInput
          style={styles.input}
          placeholder="Company Name"
          autoCapitalize="none"
          onChangeText={this.props.companyChanged}
        />
        <TouchableHighlight
          style={styles.submit}
          onPress={this.props.sendEmail}>
          <Text style={{color:'white'}}>
               Send Reset Email
          </Text>
        </TouchableHighlight>
      </KeyboardAvoidingView>
    )
  }
}

const styles = StyleSheet.create({
   container: {
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
   },
   input: {
      height: 60,
      width: "100%",
      padding: 10,
      paddingLeft: 20,
      marginTop: 20,
      borderColor: 'white',
      borderWidth: 1,
   },
   submit: {
      padding: 10,
      marginTop: 20,
      height: 50,
      borderRadius: 8,
      backgroundColor: '#2070A0',
      width: "100%",
      alignItems: 'center',
      justifyContent:'center',
   },
})
