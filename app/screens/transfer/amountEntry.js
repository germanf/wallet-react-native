import React, { Component } from 'react'
import { View, KeyboardAvoidingView, StyleSheet, TextInput, TouchableHighlight, Text, Alert } from 'react-native'

export default class AmountEntry extends Component {
  static navigationOptions = {
    title: 'Amount',
  }

  constructor(props) {
    super(props);
    this.state = {
      amount: 0,
      note: '',
    }
  }

  goToSendTo = () => {
    if (this.state.amount <= 0) {
      Alert.alert(
        'Invalid',
        'Enter valid amount',
        [[{ text: 'OK' }]]
      )
    }
    else {
      this.props.navigation.navigate("SendTo", { amount: this.state.amount, note: this.state.note, reference: '' })
    }
  }

  goToBarcodeScanner = () => {
    if (this.state.amount <= 0) {
      Alert.alert(
        'Invalid',
        'Enter valid amount',
        [[{ text: 'OK' }]]
      )
    }
    else {
      this.props.navigation.navigate("QRcodeScanner", { amount: this.state.amount, note: this.state.note })
    }
  }

  amountChanged = (text) => {
    let amount = parseFloat(text)
    if (isNaN(amount)) {
      this.setState({ amount: 0 })
    }
    else {
      this.setState({ amount })
    }
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
            onChangeText={this.amountChanged}
          />
          <TextInput
            style={styles.input}
            placeholder="Note"
            autoCapitalize="none"
            onChangeText={(note) => this.setState({ note })}
          />
        </View>
        <TouchableHighlight
          style={styles.submit}
          onPress={this.goToSendTo}>
          <Text style={{ color: 'white', fontSize: 20 }}>
            Next
          </Text>
        </TouchableHighlight>
        <TouchableHighlight
          style={[styles.submit, { marginTop: 5 }]}
          onPress={this.goToBarcodeScanner}>
          <Text style={{ color: 'white', fontSize: 20 }}>
            Scan QR code
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
    marginTop: 20,
    borderColor: 'white',
    borderWidth: 1,
  },
})
