import React, { Component } from 'react'
import { ScrollView, StyleSheet, TouchableHighlight, Text, TextInput, KeyboardAvoidingView } from 'react-native'

export default class BankAccountComponent extends Component {

  render() {
    return (
      <KeyboardAvoidingView style={styles.container} behavior={'padding'} keyboardVerticalOffset={70}>
        <ScrollView keyboardDismissMode={'interactive'}>
          <TextInput
            style={styles.input}
            placeholder="Account Holder"
            autoCapitalize="none"
            value={this.props.values.name}
            onChangeText={(text) => this.props.updateName(text)}
          />
          <TextInput
            style={styles.input}
            placeholder="Account Number"
            autoCapitalize="none"
            value={this.props.values.number}
            onChangeText={(text) => this.props.updateNumber(text)}
          />
          <TextInput
            style={styles.input}
            placeholder="Account Type"
            autoCapitalize="none"
            value={this.props.values.type}
            onChangeText={(text) => this.props.updateType(text)}
          />
          <TextInput
            style={styles.input}
            placeholder="Bank Name"
            autoCapitalize="none"
            value={this.props.values.bank_name}
            onChangeText={(text) => this.props.updateBank(text)}
          />
          <TextInput
            style={styles.input}
            placeholder="Branch Code"
            autoCapitalize="none"
            value={this.props.values.branch_code}
            onChangeText={(text) => this.props.updateBranch(text)}
          />
          <TextInput
            style={styles.input}
            placeholder="Swift Code"
            autoCapitalize="none"
            value={this.props.values.swift}
            onChangeText={(text) => this.props.updateSwift(text)}
          />
          <TextInput
            style={styles.input}
            placeholder="IBAN Number"
            autoCapitalize="none"
            value={this.props.values.iban}
            onChangeText={(text) => this.props.updateIBAN(text)}
          />
          <TextInput
            style={styles.input}
            placeholder="BIC Number"
            autoCapitalize="none"
            value={this.props.values.bic}
            onChangeText={(text) => this.props.updateBIC(text)}
          />
        </ScrollView>
        <TouchableHighlight
          style={styles.submit}
          onPress={this.props.save}>
          <Text style={{ color: 'white' }}>
            Save
          </Text>
        </TouchableHighlight>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  input: {
    height: 60,
    width: "100%",
    padding: 10,
    marginTop: 10,
    borderColor: 'white',
    borderWidth: 1,
  },
  submit: {
    padding: 10,
    marginTop: 10,
    height: 50,
    borderRadius: 8,
    backgroundColor: '#2070A0',
    width: "100%",
    alignSelf: 'stretch',
    alignItems: 'center',
    justifyContent: 'center',
  },
})
