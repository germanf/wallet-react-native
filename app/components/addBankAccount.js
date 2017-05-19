import React, {Component} from 'react'
import {ScrollView, StyleSheet, TouchableHighlight, Text, TextInput, KeyboardAvoidingView} from 'react-native'

export default class SignupComponent extends Component {

  render() {
    return (
      <KeyboardAvoidingView style={styles.container} behavior={'padding'}>
        <ScrollView keyboardDismissMode={'interactive'}>
          <TextInput
            style={styles.input}
            placeholder="Account Holder"
            autoCapitalize="none"
            onChangeText={this.props.updateName}
          />
          <TextInput
            style={styles.input}
            placeholder="Account Number"
            autoCapitalize="none"
            onChangeText={this.props.updateNumber}
          />
          <TextInput
            style={styles.input}
            placeholder="Account Type"
            autoCapitalize="none"
            onChangeText={this.props.updateType}
          />
          <TextInput
            style={styles.input}
            placeholder="Bank Name"
            autoCapitalize="none"
            onChangeText={this.props.updateBank}
          />
          <TextInput
            style={styles.input}
            placeholder="Branch Code"
            autoCapitalize="none"
            onChangeText={this.props.updateBranch}
          />
          <TextInput
            style={styles.input}
            placeholder="Swift Code"
            autoCapitalize="none"
            onChangeText={this.props.updateSwift}
          />
          <TextInput
            style={styles.input}
            placeholder="IBAN Number"
            autoCapitalize="none"
            onChangeText={this.props.updateIBAN}
          />
          <TextInput
            style={styles.input}
            placeholder="BIC Number"
            autoCapitalize="none"
            onChangeText={this.props.updateBIC}
          />
        </ScrollView>
        <TouchableHighlight
          style={styles.submit}
          onPress={this.props.add}>
          <Text style={{color:'white'}}>
            Add
          </Text>
        </TouchableHighlight>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
   container: {
      flex:1,
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
      marginTop: 20,
      height: 50,
      borderRadius: 8,
      backgroundColor: '#2070A0',
      width: "100%",
      alignSelf: 'stretch',
      alignItems: 'center',
      justifyContent:'center',
   },
})
