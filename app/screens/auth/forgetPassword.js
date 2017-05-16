import React, {Component} from 'react'
import {View, Alert, AsyncStorage, StyleSheet} from 'react-native'
import {NavigationActions} from 'react-navigation'
import ForgetPasswordComponent from './../../components/forgetPasswordComponent'

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

   checkLoggedIn = async () => {
     try {
        const value = await AsyncStorage.getItem('token');
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
   goToLogin = () => {
     this.props.navigation.dispatch(NavigationActions.back())
   }
   sendEmail = () => {
     fetch('https://rehive.com/api/3/auth/password/reset/', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          "identifier": this.state.email,
          "company_id": this.state.company,
        }),
      })
      .then((response) => response.json())
      .then((responseJson) => {
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
        <ForgetPasswordComponent
          emailChanged={this.updateEmail}
          companyChanged={this.updateCompany}
          sendEmail={this.sendEmail}
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
