import React, {Component} from 'react'
import {View, StyleSheet, Text, AsyncStorage, Alert} from 'react-native'

export default class CurrentBalance extends Component {
  static navigationOptions = {
    title: 'Home',
  }
  constructor() {
      super()
      this.state = {
         balance: 0,
         symbol: '',
      }
   }

   componentDidMount() {
     this.getBalanceInfo()
   }

  setBalance = (balance, divisibility) => {
    for (let i = 0; i < divisibility; i++) {
      balance = balance / 10
    }

    return balance
  }

  getBalanceInfo = async () => {
    const token = await AsyncStorage.getItem('token')
    fetch('https://rehive.com/api/3/accounts/?active=true', {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': 'Token ' + token,
        },
      })
      .then((response) => response.json())
      .then((responseJson) => {
        if (responseJson.status === "success") {
          const account = responseJson.data.results[0].balances[0]
          AsyncStorage.setItem('currency', JSON.stringify(account.currency))
          this.setState({symbol: account.currency.symbol})
          this.setState({balance: this.setBalance(account.balance, account.currency.divisibility)})
        }
        else {
          this.props.logout()
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
        <View style={{flexDirection: 'row'}}>
          <Text style={{fontSize:30, color:'white'}}>
            {this.state.symbol}
          </Text>
          <Text style={{paddingLeft:5, fontSize:40, color:'white'}}>
            {this.state.balance.toFixed(4).replace(/0{0,2}$/, "")}
          </Text>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex:1,
    backgroundColor:'#2070A0',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingTop: 20,
  },
})

