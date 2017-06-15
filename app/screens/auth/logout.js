import React, { Component } from 'react'
import { View, AsyncStorage, Text } from 'react-native'
import { NavigationActions } from 'react-navigation'

export default class Home extends Component {

  componentWillMount() {
    this.logout()
  }

  logout = async () => {
    AsyncStorage.clear()
    const resetAction = NavigationActions.reset({
      index: 0,
      actions: [
        NavigationActions.navigate({ routeName: 'Login' }),
      ],
    })
    this.props.navigation.dispatch(resetAction)
  }

  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'white' }}>
        <Text style={{ fontSize: 30 }}>Logging Out</Text>
      </View>
    )
  }
}
