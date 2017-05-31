import React, {Component} from 'react'
import {ScrollView, StyleSheet, TouchableHighlight, Text, TextInput, KeyboardAvoidingView} from 'react-native'

export default class BitcoinAddressComponent extends Component {

  render() {
    return (
      <KeyboardAvoidingView style={styles.container} behavior={'padding'}>
        <ScrollView keyboardDismissMode={'interactive'}>
          <TextInput
            style={styles.input}
            placeholder="Bitcoin Address"
            autoCapitalize="none"
            value={this.props.values.address}
            onChangeText={this.props.updateAddress}
          />
        </ScrollView>
        <TouchableHighlight
          style={styles.submit}
          onPress={this.props.onPress}>
          <Text style={{color:'white'}}>
            Save
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
