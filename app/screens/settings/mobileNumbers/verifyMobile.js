import React, {Component} from 'react'
import {View, KeyboardAvoidingView, StyleSheet, TextInput, TouchableHighlight, Text, Alert, AsyncStorage} from 'react-native'
import {NavigationActions} from 'react-navigation'
export default class AmountEntry extends Component {
  static navigationOptions = {
    title: 'Verify Mobile Number',
  }

  constructor(props) {
    super(props);
    this.state = {
      otp : '',
    }
  }

  reload = () => {
    const resetAction = NavigationActions.reset({
      index: 1,
      actions: [
        NavigationActions.navigate({
          routeName: 'Home',
          params: {},

          // navigate can have a nested navigate action that will be run inside the child router
          action: NavigationActions.navigate({ routeName: 'Settings'}),
        }),
        NavigationActions.navigate({ routeName: 'SettingsMobileNumbers'}),
      ],
    })
    this.props.navigation.dispatch(resetAction)
  }

  verify = async() => {
    const value = await AsyncStorage.getItem('token')

    fetch('https://rehive.com/api/3/auth/mobile/verify/', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': 'Token ' + value,
        },
        body: JSON.stringify(this.state),
      })
      .then((response) => response.json())
      .then((responseJson) => {
        if (responseJson.status === "success") {
          this.reload()
        }
        else {
          console.log(responseJson)
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
      <KeyboardAvoidingView style={styles.container} behavior={'padding'} keyboardVerticalOffset={70}>
        <View style={{flex:1}}>
          <TextInput
            style={styles.input}
            placeholder="Enter OTP"
            autoCapitalize="none"
            keyboardType="numeric"
            onChangeText={(otp) => this.setState({otp})}
          />
        </View>
        <View style={styles.buttons}>
          <TouchableHighlight
            style={[styles.submit, {backgroundColor:'red'}]}
            onPress={() => this.reload()}>
            <Text style={{color:'white', fontSize:20}}>
              Skip
            </Text>
          </TouchableHighlight>
          <TouchableHighlight
            style={styles.submit}
            onPress={this.verify}>
            <Text style={{color:'white', fontSize:20}}>
              Verify
            </Text>
          </TouchableHighlight>
        </View>
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
    flex:1,
    padding: 10,
    backgroundColor: '#2070A0',
    width: "100%",
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
  buttons: {
    height: 70,
    flexDirection: 'row',
    alignSelf: 'stretch',
  },
})
