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
          style={styles.submit}
          onPress={this.props.login}>
          <Text>
               Login
          </Text>
        </TouchableHighlight>
        <TouchableHighlight
          style={styles.submit}
          onPress={this.props.signup}>
          <Text>
               Register Here
          </Text>
        </TouchableHighlight>
      </View>
    );
  }
}

const styles = StyleSheet.create({
   container: {
      justifyContent:'center',
      paddingTop: 50,
   },
   input: {
      margin: 15,
      height: 40,
      width: "90%",
      borderColor: 'grey',
      borderWidth: 1,
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
