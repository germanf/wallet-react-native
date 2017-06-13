import React, {Component} from 'react'
import {View, KeyboardAvoidingView, StyleSheet, TextInput, AsyncStorage, TouchableHighlight, Text, Alert} from 'react-native'
import SettingsService from './../../../services/settingsService'

export default class AmountEntry extends Component {
  static navigationOptions = {
    title: 'Add Mobile Number',
  }

  constructor(props) {
    super(props);
    this.state = {
      number : 0,
      primary: false,
    }
  }

  fetchSuccess = (responseJson) => {
    if (responseJson.status === "success") {
          this.props.navigation.navigate("VerifyMobileNumber")
        }
        else {
          Alert.alert('Error',
            responseJson.message,
            [{text: 'OK'}])
        }
  }

  fetchError = (error) => {
    Alert.alert('Error',
      error,
      [{ text: 'OK', onPress: () => console.log('OK Pressed!') }])
  }

  add = async() => {
    const token = await AsyncStorage.getItem('token')

    SettingsService.addMobile(token, this.state, this.fetchSuccess, this.fetchError)
  }

  render() {
    return (
      <KeyboardAvoidingView style={styles.container} behavior={'padding'} keyboardVerticalOffset={70}>
        <View style={{flex:1}}>
          <TextInput
            style={styles.input}
            placeholder="Enter Number"
            autoCapitalize="none"
            onChangeText={(number) => this.setState({number})}
          />
        </View>
        <TouchableHighlight
          style={styles.submit}
          onPress={this.add}>
          <Text style={{color:'white', fontSize:20}}>
            Save
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
    marginTop: 10,
    borderColor: 'white',
    borderWidth: 1,
  },
})
