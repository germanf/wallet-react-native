import React, { Component } from 'react'
import { View, KeyboardAvoidingView, StyleSheet, TextInput, TouchableHighlight, AsyncStorage, Text, Alert } from 'react-native'
import TransectionService from './../../services/transectionService'

export default class AmountEntry extends Component {
  static navigationOptions = {
    title: 'Withdraw',
  }

  constructor(props) {
    super(props);
    const params = this.props.navigation.state.params
    this.state = {
      amount: 0,
      reference: params.reference,
    }
  }

  withdraw = () => {
    if (this.state.amount <= 0) {
      Alert.alert(
        'Invalid',
        'Enter valid amount',
        [[{ text: 'OK' }]]
      )
    }
    else {
      Alert.alert(
        'Are you sure?',
        'Withdrawal Amount: ' + this.state.amount,
        [
          { text: 'Yes', onPress: this.withdrawConfirmed },
          { text: 'No', onPress: this.withdrawCenceled, style: 'cancel' },
        ]
      )
    }
  }

  changeAmount = (text) => {
    let amount = parseFloat(text)
    if (isNaN(amount)) {
      this.setState({ amount: 0 })
    }
    else {
      this.setState({ amount })
    }
  }

  withdrawConfirmed = async () => {
    const data = await AsyncStorage.getItem('currency')
    const currency = JSON.parse(data)
    let amount = this.state.amount
    for (let i = 0; i < currency.divisibility; i++) {
      amount = amount * 10
    }

    let responseJson = await TransectionService.withdraw(amount, this.state.reference)
    if (responseJson.status === "success") {
      Alert.alert('Success',
        "TX Code: " + responseJson.data.tx_code,
        [{ text: 'OK', onPress: this.withdrawCenceled }])
    }
    else {
      Alert.alert('Error',
        responseJson.message,
        [{ text: 'OK' }])
    }
  }

  withdrawCenceled = () => {
    this.props.navigation.navigate("Home")
  }

  render() {
    return (
      <KeyboardAvoidingView style={styles.container} behavior={'padding'} keyboardVerticalOffset={70}>
        <View style={{ flex: 1 }}>
          <TextInput
            style={styles.input}
            placeholder="Amount"
            autoCapitalize="none"
            keyboardType="numeric"
            onChangeText={this.changeAmount}
          />
        </View>
        <TouchableHighlight
          style={styles.submit}
          onPress={this.withdraw}>
          <Text style={{ color: 'white', fontSize: 20 }}>
            Withdraw
          </Text>
        </TouchableHighlight>
      </KeyboardAvoidingView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'white',
  },
  submit: {
    padding: 10,
    height: 70,
    backgroundColor: '#2070A0',
    width: "100%",
    alignSelf: 'stretch',
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    height: 60,
    width: "100%",
    padding: 10,
    marginTop: 10,
    borderColor: 'white',
    borderWidth: 1,
  },
})
