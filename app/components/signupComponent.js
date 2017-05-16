import React, {Component} from 'react'
import {ScrollView, StyleSheet, TouchableHighlight, Text, TextInput, KeyboardAvoidingView} from 'react-native'

export default class SignupComponent extends Component {

  render() {
    return (
      <KeyboardAvoidingView style={styles.container} behavior={'padding'}>
        <ScrollView keyboardDismissMode={'interactive'}>
          <TextInput
            style={styles.input}
            placeholder="First Name"
            autoCapitalize="none"
            onChangeText={this.props.firstnameChanged}
          />
          <TextInput
            style={styles.input}
            placeholder="Last Name"
            autoCapitalize="none"
            onChangeText={this.props.lastnameChanged}
          />
          <TextInput
            style={styles.input}
            placeholder="Email"
            autoCapitalize="none"
            keyboardType="email-address"
            onChangeText={this.props.emailChanged}
          />
          <TextInput
            style={styles.input}
            placeholder="Mobile Number"
            autoCapitalize="none"
            keyboardType="numeric"
            onChangeText={this.props.mobileChanged}
          />
          <TextInput
            style={styles.input}
            placeholder="Company Name"
            autoCapitalize="none"
            onChangeText={this.props.companyChanged}
          />
          <TextInput
            style={styles.input}
            placeholder="Password"
            autoCapitalize="none"
            secureTextEntry
            onChangeText={this.props.passwordChanged}
          />
          <TextInput
            style={styles.input}
            placeholder="Confirm Password"
            autoCapitalize="none"
            secureTextEntry
            onChangeText={this.props.confirmPasswordChanged}
          />
        </ScrollView>
        <TouchableHighlight
          style={styles.submit}
          onPress={this.props.signup}>
          <Text style={{color:'white'}}>
            Sign Up
          </Text>
        </TouchableHighlight>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
   container: {
      flex:1,
      flexDirection: 'column',
   },
   input: {
      height: 60,
      width: "100%",
      padding: 10,
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
      alignSelf: 'stretch',
      alignItems: 'center',
      justifyContent:'center',
   },
})
