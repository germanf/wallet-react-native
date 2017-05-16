import React, {Component} from 'react'
import {View, Alert, AsyncStorage, StyleSheet} from 'react-native'
import {NavigationActions} from 'react-navigation'
import LoginComponent from './../../components/loginComponent'

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
   updateEmail = (text) => {
      this.setState({email: text})
   }
   updateCompany = (text) => {
      this.setState({company: text})
   }
   updatePassword = (text) => {
      this.setState({password: text})
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
   goToSignup = () => {
     this.props.navigation.navigate("Signup")
   }
   goToForgetPassword = () => {
     this.props.navigation.navigate("ForgetPassword")
   }

   login = () => {
     fetch('https://rehive.com/api/3/auth/login/', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          "identifier": this.state.email,
          "company_id": this.state.company,
          "password": this.state.password,
        }),
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
            [{text: 'OK'}])
      })
   }

  render() {
    return (
      <View style={styles.container}>
        <LoginComponent
          emailChanged={this.updateEmail}
          companyChanged={this.updateCompany}
          passwordChanged={this.updatePassword}
          login={this.login}
          signup={this.goToSignup}
          forgetPassword={this.goToForgetPassword}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex:1,
    backgroundColor:'white',
    padding:15,
  },
})
