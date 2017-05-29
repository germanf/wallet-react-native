import React, {Component} from 'react'
import {View, KeyboardAvoidingView, StyleSheet, TextInput, AsyncStorage, TouchableHighlight, Text, Alert} from 'react-native'
import {NavigationActions} from 'react-navigation'
export default class AmountEntry extends Component {
  static navigationOptions = {
    title: 'Add Email Address',
  }

  constructor(props) {
    super(props);
    this.state = {
      email : '',
      primary: false,
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
        NavigationActions.navigate({ routeName: 'SettingsEmailAddresses'}),
      ],
    })
    this.props.navigation.dispatch(resetAction)
  }

  add = async() => {
    const value = await AsyncStorage.getItem('token')

    fetch('https://www.rehive.com/api/3/user/emails/', {
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
        console.log(responseJson)
        if (responseJson.status === "success") {
          this.reload()
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
      <KeyboardAvoidingView style={styles.container} behavior={'padding'}>
        <View style={{flex:1}}>
          <TextInput
            style={styles.input}
            placeholder="Enter Email Address"
            autoCapitalize="none"
            onChangeText={(email) => this.setState({email})}
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
    marginTop: 20,
    borderColor: 'white',
    borderWidth: 1,
  },
})
