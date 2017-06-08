import React, { Component } from 'react'
import { View, Alert, AsyncStorage, KeyboardAvoidingView, StyleSheet, TouchableHighlight, Text, TextInput } from 'react-native'
import { NavigationActions } from 'react-navigation'
import AuthService from './../../services/authService'

export default class Login extends Component {
  static navigationOptions = {
    title: 'Login',
  }

  constructor() {
    super()
    this.checkLoggedIn()
    this.state = {
      email: '',
      company: '',
      password: '',
    }
  }

  checkLoggedIn = async () => {
    try {
      const value = await AsyncStorage.getItem('token')
      if (value != null) {
        this.goToHome()
      }
      return value
    } catch (error) {
      //return null
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

  errorOnFetch = (error) => {
    Alert.alert('Error',
      error,
      [{ text: 'OK' }])
  }

  loginAttempt = (responseJson) => {
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

  login = () => {
    var body = JSON.stringify({
      "identifier": this.state.email,
      "company_id": this.state.company,
      "password": this.state.password,
    })
    AuthService.login(body, this.loginAttempt, this.errorOnFetch)
  }

  render() {
    return (
      <View style={styles.mainContainer}>
        <KeyboardAvoidingView style={styles.container} behavior={'padding'}>
          <TextInput
            style={styles.input}
            placeholder="Email"
            autoCapitalize="none"
            keyboardType="email-address"
            value={this.state.email}
            onChangeText={(email) => this.setState({ email })}
          />
          <TextInput
            style={styles.input}
            placeholder="Company Name"
            value={this.state.company}
            onChangeText={(company) => this.setState({ company })}
          />
          <TextInput
            style={styles.input}
            placeholder="Password"
            autoCapitalize="none"
            secureTextEntry
            value={this.state.password}
            onChangeText={(password) => this.setState({ password })}
          />
          <TouchableHighlight
            style={styles.login}
            onPress={this.login}>
            <Text style={{ color: 'white' }}>
              Login
            </Text>
          </TouchableHighlight>
          <TouchableHighlight
            style={styles.forgetPassword}
            onPress={() => this.props.navigation.navigate("ForgetPassword")}>
            <Text style={{ color: '#2070A0' }}>
              Forgot Password?
            </Text>
          </TouchableHighlight>
          <TouchableHighlight
            style={styles.register}
            onPress={() => this.props.navigation.navigate("Signup")}>
            <Text style={{ color: '#2070A0' }}>
              Create New Account
            </Text>
          </TouchableHighlight>
        </KeyboardAvoidingView>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: 'white',
    padding: 15,
  },
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
    backgroundColor: '#2070A0',
    width: "100%",
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  register: {
    padding: 10,
    marginTop: 20,
    height: 40,
    backgroundColor: 'white',
    width: "60%",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#2070A0',
    alignItems: 'center',
    justifyContent: 'center',
  },
  forgetPassword: {
    padding: 10,
    height: 50,
    backgroundColor: 'white',
    width: "100%",
    borderColor: 'blue',
    alignItems: 'center',
    justifyContent: 'center',
  },
})
