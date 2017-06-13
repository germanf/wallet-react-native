import React, { Component } from 'react'
import { View, Alert, AsyncStorage, StyleSheet, ScrollView, TouchableHighlight, Text, TextInput, KeyboardAvoidingView } from 'react-native'
import { NavigationActions } from 'react-navigation'
import AuthService from './../../services/authService'

export default class Signup extends Component {
  static navigationOptions = {
    title: 'Create New Account',
  }

  constructor() {
    super()
    this.state = {
      first_name: '',
      last_name: '',
      email: '',
      mobile: '',
      company_id: '',
      password1: '',
      password2: '',
    }
  }

  goToHome = () => {
    const resetAction = NavigationActions.reset({
      index: 0,
      actions: [
        NavigationActions.navigate({ routeName: 'Home' }),
      ],
    })
    this.props.navigation.dispatch(resetAction)
  }

  fetchSuccess = (responseJson) => {
    if (responseJson.status === "success") {
      const loginInfo = responseJson.data;
      AsyncStorage.setItem("token", loginInfo.token)
      AsyncStorage.setItem("user", JSON.stringify(loginInfo.user))
      this.goToHome()
    }
    else {
      Alert.alert('Error',
        responseJson.message,
        [{ text: 'OK' }])
    }
  }

  fetchError = (error) => {
    Alert.alert('Error',
      error,
      [{ text: 'OK', onPress: () => console.log('OK Pressed!') }])
  }

  signup = () => {
    var body = JSON.stringify(this.state)
    AuthService.signup(body, this.fetchSuccess, this.fetchError)
  }

  render() {
    return (
      <View style={styles.mainContainer}>
        <KeyboardAvoidingView style={styles.container} behavior={'padding'} keyboardVerticalOffset={70}>
          <ScrollView keyboardDismissMode={'interactive'}>
            <TextInput
              style={styles.input}
              placeholder="First Name"
              autoCapitalize="none"
              onChangeText={(first_name) => this.setState({first_name})}
            />
            <TextInput
              style={styles.input}
              placeholder="Last Name"
              autoCapitalize="none"
              onChangeText={(last_name) => this.setState({last_name})}
            />
            <TextInput
              style={styles.input}
              placeholder="Email"
              autoCapitalize="none"
              keyboardType="email-address"
              onChangeText={(email) => this.setState({email})}
            />
            <TextInput
              style={styles.input}
              placeholder="Mobile Number"
              autoCapitalize="none"
              keyboardType="numeric"
              onChangeText={(mobile) => this.setState({mobile})}
            />
            <TextInput
              style={styles.input}
              placeholder="Company Name"
              autoCapitalize="none"
              onChangeText={(company_id) => this.setState({company_id})}
            />
            <TextInput
              style={styles.input}
              placeholder="Password"
              autoCapitalize="none"
              secureTextEntry
              onChangeText={(password1) => this.setState({password1})}
            />
            <TextInput
              style={styles.input}
              placeholder="Confirm Password"
              autoCapitalize="none"
              secureTextEntry
              onChangeText={(password2) => this.setState({password2})}
            />
          </ScrollView>
          <TouchableHighlight
            style={styles.submit}
            onPress={() => this.signup()}>
            <Text style={{color:'white'}}>
              Sign Up
            </Text>
          </TouchableHighlight>
        </KeyboardAvoidingView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: 'white',
    padding: 15,
  },
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
      marginTop: 10,
      height: 50,
      borderRadius: 8,
      backgroundColor: '#2070A0',
      width: "100%",
      alignSelf: 'stretch',
      alignItems: 'center',
      justifyContent:'center',
   },
})
