import React, {Component} from 'react'
import {View, Text, StyleSheet, AsyncStorage, Alert} from 'react-native'

export default class Deposit extends Component {
  static navigationOptions = {
    title: 'Deposit',
  }

  constructor() {
    super()

    this.state = {
      bank: {},
      bankAccount: {},
      currencyCode: '',
    }
  }
  componentDidMount() {
    this.getBankInfo()
    this.getCurrencyCode()
  }

  getBankInfo = async () => {
    const value = await AsyncStorage.getItem('token');
    fetch('https://www.rehive.com/api/3/company/bank/', {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': 'Token ' + value,
        },
      })
      .then((response) => response.json())
      .then((responseJson) => {
        if (responseJson.status === "success") {
          if (responseJson.data[0]) {
            this.setState({
              bank: responseJson.data[0],
              bankAccount: responseJson.data[0].bank_account,
            })
          }
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

  getCurrencyCode = async() => {
    const currencyStr = await AsyncStorage.getItem('currency')
    const currency = JSON.parse(currencyStr)
    this.setState({
      currencyCode: currency.code,
    })
  }

  render() {
    if (!this.state.bank.reference) {
      return (
        <View style={styles.container}>
          <View style={styles.comment}>
            <Text style={styles.commentText}>
              No deposit instructions have been provided.
            </Text>
          </View>
          <View style={styles.bankInfo} />
        </View>
      )
    }
    else {
      return (
        <View style={styles.container}>
          <View style={styles.comment}>
            <Text style={styles.commentText}>
              Fund your account by transferring {this.state.currencyCode} to the unique reference number below.
            </Text>
          </View>
          <View style={styles.reference}>
            <Text style={styles.referenceText}>
              {this.state.bank.reference}
            </Text>
          </View>
          <View style={styles.bankInfo}>
            <View style={styles.infoColumn}>
              <Text style={styles.infoTitle}>
                Bank
              </Text>
              <Text style={styles.infoText}>
                {this.state.bankAccount.bank_name}
              </Text>
            </View>
            <View style={styles.infoColumn}>
              <Text style={styles.infoTitle}>
                Account Holder
              </Text>
              <Text style={styles.infoText}>
                {this.state.bankAccount.name}
              </Text>
            </View>
            <View style={styles.infoColumn}>
              <Text style={styles.infoTitle}>
                Account Number
              </Text>
              <Text style={styles.infoText}>
                {this.state.bankAccount.number}
              </Text>
            </View>
            <View style={styles.infoColumn}>
              <Text style={styles.infoTitle}>
                Account Type
              </Text>
              <Text style={styles.infoText}>
                {this.state.bankAccount.type}
              </Text>
            </View>
            <View style={styles.infoColumn}>
              <Text style={styles.infoTitle}>
                Bank Code
              </Text>
              <Text style={styles.infoText}>
                {this.state.bankAccount.bank_code}
              </Text>
            </View>
          </View>
        </View>
      )
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex:1,
    backgroundColor: 'white',
  },
  comment: {
    height: 120,
    backgroundColor: 'gainsboro',
    alignItems: 'center',
    justifyContent: 'center',
    paddingRight: 30,
    paddingLeft: 30,
  },
  commentText: {
    fontSize: 16,
    textAlign: 'center',
  },
  reference: {
    height: 90,
    backgroundColor: '#38C87F',
    alignItems: 'center',
    justifyContent: 'center',
  },
  referenceText: {
    fontSize: 32,
    textAlign: 'center',
    color: 'white',
  },
  bankInfo: {
    flex:1,
    flexDirection: 'column',
    padding: 20,
  },
  infoColumn: {
    flexDirection: 'row',
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  infoTitle: {
    flex: 1,
    fontSize: 17,
    textAlign: 'left',
    fontWeight: 'bold',
  },
  infoText: {
    flex: 1,
    fontSize: 17,
    textAlign: 'right',
  },
})
