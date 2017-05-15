import React, {Component} from 'react'
import {View, StyleSheet, TouchableHighlight, Text, TextInput} from 'react-native'

export default class LoginComponent extends Component {

  render() {
    return (
      <View style={styles.container}>
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
        <TextInput
          style={styles.input}
          placeholder="Password"
          autoCapitalize="none"
          secureTextEntry
          onChangeText={this.props.passwordChanged}
        />
        <TouchableHighlight
          style={styles.login}
          onPress={this.props.login}>
          <Text style={{color:'white'}}>
               Login
          </Text>
        </TouchableHighlight>
        <TouchableHighlight
          style={styles.forgetPassword}
          onPress={this.props.forgetPassword}>
          <Text style={{color:'blue'}}>
               Forgot Password?
          </Text>
        </TouchableHighlight>
        <TouchableHighlight
          style={styles.register}
          onPress={this.props.signup}>
          <Text style={{color:'blue'}}>
               Create New Account
          </Text>
        </TouchableHighlight>
      </View>
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
      marginTop: 20,
      borderColor: 'white',
      borderWidth: 1,
   },
   login: {
      padding: 10,
      marginTop: 20,
      height: 50,
      backgroundColor: 'dodgerblue',
      width: "100%",
      borderRadius: 8,
      alignItems: 'center',
      justifyContent:'center',
   },
   register: {
      padding: 10,
      marginTop: 20,
      height: 40,
      backgroundColor: 'white',
      width: "60%",
      borderRadius: 8,
      borderWidth: 1,
      borderColor: 'blue',
      alignItems: 'center',
      justifyContent:'center',
   },
   forgetPassword: {
      padding: 10,
      height: 50,
      backgroundColor: 'white',
      width: "100%",
      borderColor : 'blue',
      alignItems: 'center',
      justifyContent:'center',
   },
})
