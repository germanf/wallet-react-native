import React, {Component} from 'react'
import {View, Alert, AsyncStorage, StyleSheet} from 'react-native'
import {NavigationActions} from 'react-navigation'
import AddBankAccountComponent from './../../components/addBitcoinAddress'

export default class AddBankAccount extends Component {
  static navigationOptions = {
    title: 'Add New Account',
  }

  constructor() {
      super()
      this.state = {
        address: '',
      }
   }

   updateAddress = (address) => {
      this.setState({address})
   }
   goToHome = () => {
    const resetAction = NavigationActions.reset({
      index: 1,
      actions: [
        NavigationActions.navigate({
          routeName: 'Home',
          params: {},

          // navigate can have a nested navigate action that will be run inside the child router
          action: NavigationActions.navigate({ routeName: 'Withdraw'}),
        }),
        NavigationActions.navigate({ routeName: 'BitcoinAddresses'}),
      ],
    })
    this.props.navigation.dispatch(resetAction)
   }
   add = async() => {
     //console.log(this.state)
     const value = await AsyncStorage.getItem('token')
     fetch('https://rehive.com/api/3/user/bitcoin_accounts/', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': 'Token ' + value,
        },
        body: JSON.stringify(this.state),
      })
      .then((response) => response.json())
      .then((responseJson) => {
        if (responseJson.status === "success") {
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
      <View style={styles.container}>
        <AddBankAccountComponent
          updateAddress={this.updateAddress}
          add={this.add}
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
