import React, {Component} from 'react'
import {View, KeyboardAvoidingView, StyleSheet, TextInput, AsyncStorage, TouchableHighlight, Text, Alert} from 'react-native'

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

  add = async() => {
    const value = await AsyncStorage.getItem('token')

    fetch('https://www.rehive.com/api/3/user/mobiles/', {
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
          this.props.navigation.navigate("VerifyMobileNumber")
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

  render() {
    return (
      <KeyboardAvoidingView style={styles.container} behavior={'padding'}>
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
    marginTop: 20,
    borderColor: 'white',
    borderWidth: 1,
  },
})
