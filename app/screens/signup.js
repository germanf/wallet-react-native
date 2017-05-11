import React, {Component} from 'react'
import {View, Alert, AsyncStorage} from 'react-native'
import {NavigationActions} from 'react-navigation'
import LoginComponent from './../components/signupComponent'

export default class Signup extends Component {
  static navigationOptions = {
    title: 'Register',
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

   updateFirstName = (text) => {
      this.setState({first_name: text})
   }
   updateLastname = (text) => {
      this.setState({last_name: text})
   }
   updateEmail = (text) => {
      this.setState({email: text})
   }
   updateMobile = (text) => {
      this.setState({mobile: text})
   }
   updateCompany = (text) => {
      this.setState({company_id: text})
   }
   updatePassword = (text) => {
      this.setState({password1: text})
   }
   updateConfirmPassword = (text) => {
      this.setState({password2: text})
   }
   goToHome = () => {
     const resetAction = NavigationActions.reset({
      index: 0,
      actions: [
        NavigationActions.navigate({ routeName: 'Home'}),
      ],
    })
    this.props.navigation.dispatch(resetAction)
   }
   goToLogin = () => {
     this.props.navigation.navigate("Login")
   }
   signup = () => {
     //console.log(this.state)
     fetch('https://rehive.com/api/3/auth/register/', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(this.state),
      })
      .then((response) => response.json())
      .then((responseJson) => {
        if (responseJson.status === "success") {
          const loginInfo = responseJson.data;
          AsyncStorage.setItem("token", loginInfo.token)
          AsyncStorage.setItem("user", JSON.stringify(loginInfo.user))
          this.goToHome()
        }
        else {
          Alert.alert('Error',
            responseJson.message,
            [{text: 'OK'}])
        }
      })
      .catch((error) => {
        Alert.alert('Error',
            error,
            [{text: 'OK', onPress: () => console.log('OK Pressed!')}])
      })
   }

  render() {
    return (
      <View>
        <LoginComponent
          firstnameChanged={this.updateFirstName}
          lastnameChanged={this.updateLastname}
          emailChanged={this.updateEmail}
          mobileChanged={this.updateMobile}
          companyChanged={this.updateCompany}
          passwordChanged={this.updatePassword}
          confirmPasswordChanged={this.updateConfirmPassword}
          signup={this.signup}
          login={this.goToLogin}
        />
      </View>
    );
  }
}
