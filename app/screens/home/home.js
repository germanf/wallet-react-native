import React, {Component} from 'react'
import {View, AsyncStorage, Alert} from 'react-native'
import {NavigationActions} from 'react-navigation'
import HomeComponent from './../../components/homeComponent'

export default class Home extends Component {
  static navigationOptions = {
    title: 'Home',
  }
  constructor() {
      super()
      this.state = {
         userInfo: {},
      }

      this.getUserInfo()
   }

  getUserInfo = () => {
    AsyncStorage.getItem('user').then((value) => {
         this.setState({'userInfo': JSON.parse(value)});
      });
  }
  goToLogin = () => {
    const resetAction = NavigationActions.reset({
        index: 0,
        actions: [
          NavigationActions.navigate({ routeName: 'Login'}),
        ],
      })
      this.props.navigation.dispatch(resetAction)
  }
  logout = () => {
    fetch('https://rehive.com/api/3/auth/logout/', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
      })
      .then((response) => response.json())
      .then((responseJson) => {
        if (responseJson.status === "success") {
          AsyncStorage.clear()
          this.goToLogin()
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
      <View style={{flex:1}}>
        <HomeComponent name={this.state.userInfo.first_name + " " + this.state.userInfo.last_name} logout={this.logout} />
      </View>
    )
  }
}
