import React, {Component} from 'react'
import {ScrollView, View, StyleSheet, TouchableHighlight, Text, TextInput} from 'react-native'

export default class SignupComponent extends Component {

  render() {
    return (
      <View style={styles.container}>
        <ScrollView>
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
          <TouchableHighlight
            style={styles.submit}
            onPress={this.props.signup}>
            <Text>
              Sign Up
            </Text>
          </TouchableHighlight>
          <TouchableHighlight
            style={styles.submit}
            onPress={this.props.login}>
            <Text>
                Already Registered
            </Text>
          </TouchableHighlight>
        </ScrollView>
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
