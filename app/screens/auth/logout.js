import React, {Component} from 'react'
import {View, AsyncStorage, Alert, Text} from 'react-native'
import {NavigationActions} from 'react-navigation'
import AuthService from './../../services/authService'

export default class Home extends Component {

  constructor() {
      super()

      this.logout()
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

  fetchSuccess = (responseJson) => {
    if (responseJson.status === "success") {
      AsyncStorage.clear()
      this.goToLogin()
    }
    else {
      Alert.alert('Error',
        responseJson.message,
        [{text: 'OK', onPress: () => this.props.navigation.goBack()}])
    }
  }

  fetchError = (error) => {
    Alert.alert('Error',
        error,
        [{text: 'OK', onPress: () => this.props.navigation.goBack()}]
      )
  }

  logout = async () => {
    const token = await AsyncStorage.getItem('token');
    AuthService.logout(token, this.fetchSuccess, this.fetchError)
   }

  render() {
    return (
      <View style={{flex:1, justifyContent:'center', alignItems:'center', backgroundColor:'white'}}>
        <Text style={{fontSize:30}}>Logging Out</Text>
      </View>
    )
  }
}
