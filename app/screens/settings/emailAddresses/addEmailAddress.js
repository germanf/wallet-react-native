import React, { Component } from 'react'
import { View, KeyboardAvoidingView, StyleSheet, TextInput, TouchableHighlight, Text, Alert } from 'react-native'
import SettingsService from './../../../services/settingsService'
import ResetNavigation from './../../../util/resetNavigation'

export default class AmountEntry extends Component {
  static navigationOptions = {
    title: 'Add Email Address',
  }

  constructor(props) {
    super(props);
    this.state = {
      email: '',
      primary: false,
    }
  }

  reload = () => {
    ResetNavigation.dispatchUnderDrawer(this.props.navigation, 'Settings', 'SettingsEmailAddresses')
  }

  add = async () => {
    let responseJson = await SettingsService.addEmail(this.state)

    if (responseJson.status === "success") {
      this.reload()
    }
    else {
      Alert.alert('Error',
        responseJson.message,
        [{ text: 'OK' }])
    }
  }

  render() {
    return (
      <KeyboardAvoidingView style={styles.container} behavior={'padding'} keyboardVerticalOffset={70}>
        <View style={{ flex: 1 }}>
          <TextInput
            style={styles.input}
            placeholder="Enter Email Address"
            autoCapitalize="none"
            onChangeText={(email) => this.setState({ email })}
          />
        </View>
        <TouchableHighlight
          style={styles.submit}
          onPress={this.add}>
          <Text style={{ color: 'white', fontSize: 20 }}>
            Save
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
