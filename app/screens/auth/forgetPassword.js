import React, {Component} from 'react'
import {View, Alert, StyleSheet, KeyboardAvoidingView, TouchableHighlight, Text, TextInput} from 'react-native'
import AuthService from './../../services/authService'

export default class ForgetPassword extends Component {
  static navigationOptions = {
    title: 'Forget Password',
  }

  constructor() {
      super()
      this.state = {
         email: '',
         company: '',
      }
   }

   goToLogin = () => {
     this.props.navigation.goBack()
   }

   fetchSuccess = (responseJson) => {
     if (responseJson.status === "success") {
          Alert.alert('Success',
            responseJson.message,
            [{text: 'OK', onPress: () => this.goToLogin()}])
        }
        else {
          Alert.alert('Error',
            responseJson.message,
            [{text: 'OK'}])
        }
   }

   fetchError = (error) => {
     Alert.alert('Error',
            error,
            [{text: 'OK'}])
   }
   sendEmail = () => {
     var body = JSON.stringify({
          "identifier": this.state.email,
          "company_id": this.state.company,
        })
     AuthService.forgetPassword(body, this.fetchSuccess, this.fetchError)
   }

  render() {
    return (
      <View style={styles.mainContainer}>
        <KeyboardAvoidingView style={styles.container} behavior={'padding'} keyboardVerticalOffset={70}>
          <TextInput
            style={styles.input}
            placeholder="Email"
            autoCapitalize="none"
            keyboardType="email-address"
            onChangeText={(email) => this.setState({email})}
          />
          <TextInput
            style={styles.input}
            placeholder="Company Name"
            autoCapitalize="none"
            onChangeText={(company) => this.setState({company})}
          />
          <TouchableHighlight
            style={styles.submit}
            onPress={() => this.sendEmail()}>
            <Text style={{ color: 'white' }}>
              Send Reset Email
            </Text>
          </TouchableHighlight>
        </KeyboardAvoidingView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    flex:1,
    backgroundColor:'white',
    padding:15,
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
    paddingLeft: 20,
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
    alignItems: 'center',
    justifyContent: 'center',
  },
})

