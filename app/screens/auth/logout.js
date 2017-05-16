import React, {Component} from 'react'
import {View, AsyncStorage, Alert, Text} from 'react-native'
import {NavigationActions} from 'react-navigation'

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

  logout = async () => {
    const value = await AsyncStorage.getItem('token');
    fetch('https://rehive.com/api/3/auth/logout/', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': 'Token ' + value,
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
        this.props.navigation.goBack()
      })
   }

  render() {
    return (
      <View style={{flex:1, justifyContent:'center', alignItems:'center', backgroundColor:'white'}}>
        <Text style={{fontSize:30}}>Logging Out</Text>
      </View>
    )
  }
}
