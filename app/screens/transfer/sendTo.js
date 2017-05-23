import React, {Component} from 'react'
import {View, KeyboardAvoidingView, StyleSheet, TextInput, AsyncStorage, TouchableHighlight, Text, Alert} from 'react-native'

export default class AmountEntry extends Component {
  static navigationOptions = {
    title: 'Withdraw',
  }

  constructor(props) {
    super(props);
    const params = this.props.navigation.state.params
    this.state = {
      amount : params.amount,
      note : params.note,
      reference: "",
    }
  }

  send = async () => {
    const data = await AsyncStorage.getItem('currency')
    const currency = JSON.parse(data)
    let amount = this.state.amount
    for (let i = 0; i < currency.divisibility; i++) {
      amount = amount * 10
    }
    Alert.alert(
        'Are you sure?',
        'Send ' + currency.symbol + this.state.amount + ' to ' + this.state.reference,
        [
          {text: 'Yes', onPress: () => this.transferConfirmed(amount)},
          {text: 'No', onPress: this.transferCenceled, style: 'cancel'},
        ]
    )
  }

  transferConfirmed = async(amount) => {
    const value = await AsyncStorage.getItem('token')
    fetch('https://rehive.com/api/3/transactions/transfer/', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Token ' + value,
      },
      body: JSON.stringify({
        amount,
        reference: this.state.reference,
        note: this.state.note,
      }),
    })
    .then((response) => response.json())
    .then((responseJson) => {
      if (responseJson.status === "success") {
        Alert.alert('Success',
          "TX Code: " + responseJson.data.tx_code,
          [{text: 'OK', onPress: this.transferCenceled}])
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

  transferCenceled = () => {
    this.props.navigation.navigate("Home")
  }

  render() {
    return (
      <KeyboardAvoidingView style={styles.container} behavior={'padding'}>
        <View style={{flex:1}}>
          <TextInput
            style={styles.input}
            placeholder="Enter name/email/mobile"
            autoCapitalize="none"
            onChangeText={(text) => this.setState({reference: text})}
          />
        </View>
        <TouchableHighlight
          style={styles.submit}
          onPress={this.send}>
          <Text style={{color:'white', fontSize:20}}>
            Send
          </Text>
        </TouchableHighlight>
      </KeyboardAvoidingView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex:1,
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
    justifyContent:'center',
  },
  input: {
    height: 60,
    width: "100%",
    padding: 10,
    marginTop: 20,
    borderColor: 'white',
    borderWidth: 1,
  },
})
