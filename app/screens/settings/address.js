import React, {Component} from 'react'
import {View, Alert, Text, StyleSheet, KeyboardAvoidingView, ScrollView, TextInput, AsyncStorage, TouchableHighlight} from 'react-native'
import CountryPicker from 'react-native-country-picker-modal'

export default class Address extends Component {
  static navigationOptions = {
    title: 'Address',
  }

  constructor() {
    super()

    this.state = {
      line_1: '',
      line_2: '',
      city: '',
      state_province: '',
      country: '',
      postal_code: '',
    }
  }

  componentDidMount() {
    this.getAddress()
  }

  getAddress = async () => {
    const value = await AsyncStorage.getItem('token')
     fetch('https://rehive.com/api/3/user/address/', {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': 'Token ' + value,
        },
      })
      .then((response) => response.json())
      .then((responseJson) => {
        if (responseJson.status === "success") {
          const address = responseJson.data
          this.setState({
            line_1: address.line_1,
            line_2: address.line_2,
            city: address.city,
            state_province: address.state_province,
            country: address.country,
            postal_code: address.postal_code,
          })
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

  save = async () => {
    const value = await AsyncStorage.getItem('token')
     fetch('https://rehive.com/api/3/user/address/', {
        method: 'PATCH',
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
          AsyncStorage.removeItem('user')
          AsyncStorage.setItem('user', JSON.stringify(responseJson.data))
          this.props.navigation.goBack()
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
      <View style={{flex:1}}>
        <KeyboardAvoidingView style={styles.container} behavior={'padding'}>
          <ScrollView keyboardDismissMode={'interactive'}>
            <View style={styles.inputContainer}>
              <Text style={styles.text}>
                Line 1
              </Text>
              <TextInput
                style={styles.input}
                placeholder=""
                autoCapitalize="none"
                value={this.state.line_1}
                onChangeText={(line_1) => this.setState({line_1})}
              />
            </View>
            <View style={styles.inputContainer}>
              <Text style={styles.text}>
                Line 2
              </Text>
              <TextInput
                style={styles.input}
                placeholder=""
                autoCapitalize="none"
                value={this.state.line_2}
                onChangeText={(line_2) => this.setState({line_2})}
              />
            </View>
            <View style={styles.inputContainer}>
              <Text style={styles.text}>
                City
              </Text>
              <TextInput
                style={styles.input}
                placeholder=""
                autoCapitalize="none"
                value={this.state.city}
                onChangeText={(city) => this.setState({city})}
              />
            </View>
            <View style={styles.inputContainer}>
              <Text style={styles.text}>
                State Province
              </Text>
              <TextInput
                style={styles.input}
                placeholder=""
                autoCapitalize="none"
                value={this.state.state_province}
                onChangeText={(state_province) => this.setState({state_province})}
              />
            </View>
            <View style={styles.pickerContainer}>
              <Text style={[styles.text, {flex:1}]}>
                Country
              </Text>
              <CountryPicker
                onChange={(value) => {
                  this.setState({country: value.cca2});
                }}
                cca2={this.state.country}
                translation="eng"
                styles={{flex:1, justifyContent: 'center'}}
              />
            </View>
            <View style={styles.inputContainer}>
              <Text style={styles.text}>
                Postal Code
              </Text>
              <TextInput
                style={styles.input}
                placeholder=""
                autoCapitalize="none"
                value={this.state.postal_code}
                onChangeText={(postal_code) => this.setState({postal_code})}
              />
            </View>
          </ScrollView>
          <TouchableHighlight
            style={styles.submit}
            onPress={() => this.save()}>
            <Text style={{color:'white'}}>
              Save
            </Text>
          </TouchableHighlight>
        </KeyboardAvoidingView>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex:1,
    flexDirection: 'column',
    backgroundColor: 'white',
  },
  input: {
    height: 60,
    width: "100%",
    padding: 10,
    fontSize: 16,
    borderColor: 'white',
    borderWidth: 1,
  },
  submit: {
    padding: 10,
    marginTop: 20,
    height: 60,
    backgroundColor: '#2070A0',
    width: "100%",
    alignSelf: 'stretch',
    alignItems: 'center',
    justifyContent:'center',
  },
  text: {
    fontSize:20,
    paddingLeft:10,
  },
  inputContainer: {
    flexDirection:'column',
    width:'100%',
    paddingTop: 10,
  },
  pickerContainer: {
    flexDirection:'row',
    width:'100%',
    borderBottomWidth: 1,
    borderBottomColor: 'black',
    alignItems: 'center',
    justifyContent:'center',
  },
})

