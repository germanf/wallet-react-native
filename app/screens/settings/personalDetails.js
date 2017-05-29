import React, {Component} from 'react'
import {View, Picker, Alert, Text, StyleSheet, KeyboardAvoidingView, ScrollView, TextInput, AsyncStorage, TouchableHighlight} from 'react-native'
import CountryPicker from 'react-native-country-picker-modal'

export default class Settings extends Component {
  static navigationOptions = {
    title: 'Personal Details',
  }

  constructor() {
    super()

    this.state = {
      nationality: '',
      first_name: '',
      last_name: '',
      id_number: '',
      skype_name: '',
      mobile_number: '',
      language: '',
    }
  }

  componentDidMount() {
    this.getUser()
  }

  getUser = async () => {
    const value = await AsyncStorage.getItem('user')

    const user = JSON.parse(value)

    // Alert.alert(
    //   "User",
    //   value
    // )

    this.setState({
      first_name: user.first_name,
      last_name: user.last_name,
      id_number: user.id_number,
      nationality: user.nationality,
      skype_name: user.skype_name,
      mobile_number: user.mobile_number,
      language: user.language,
    })
  }

  save = async () => {
    const value = await AsyncStorage.getItem('token')
     fetch('https://rehive.com/api/3/user/', {
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
                First Name
              </Text>
              <TextInput
                style={styles.input}
                placeholder=""
                autoCapitalize="none"
                value={this.state.first_name}
                onChangeText={(text) => this.setState({first_name: text})}
              />
            </View>
            <View style={styles.inputContainer}>
              <Text style={styles.text}>
                Last Name
              </Text>
              <TextInput
                style={styles.input}
                placeholder=""
                autoCapitalize="none"
                value={this.state.last_name}
                onChangeText={(text) => this.setState({last_name: text})}
              />
            </View>
            <View style={styles.inputContainer}>
              <Text style={styles.text}>
                Identity Number
              </Text>
              <TextInput
                style={styles.input}
                placeholder=""
                autoCapitalize="none"
                value={this.state.id_number}
                onChangeText={(text) => this.setState({id_number: text})}
              />
            </View>
            <View style={styles.pickerContainer}>
              <Text style={[styles.text, {flex:1}]}>
                Country
              </Text>
              <CountryPicker
                onChange={(value) => {
                  this.setState({nationality: value.cca2});
                }}
                cca2={this.state.nationality}
                translation="eng"
                styles={{flex:1, justifyContent: 'center'}}
              />
            </View>
            <View style={[styles.pickerContainer, {height:58}]}>
              <Text style={[styles.text, {flex:2}]}>
                Language
              </Text>
              <Picker
                selectedValue={this.state.language}
                style={{flex:1, justifyContent:'center'}}
                onValueChange={(lang) => {
                  this.setState({language: lang})
                }}>
                <Picker.Item label="English" value="en" />
                <Picker.Item label="Africans" value="af" />
              </Picker>
            </View>
            <View style={styles.inputContainer}>
              <Text style={styles.text}>
                Skype Name
              </Text>
              <TextInput
                style={styles.input}
                placeholder=""
                autoCapitalize="none"
                value={this.state.skype_name}
                onChangeText={(text) => this.setState({skype_name: text})}
              />
            </View>
            <View style={styles.inputContainer}>
              <Text style={styles.text}>
                Mobile Number
              </Text>
              <TextInput
                style={styles.input}
                placeholder=""
                autoCapitalize="none"
                value={this.state.mobile_number}
                onChangeText={(text) => this.setState({mobile_number: text})}
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

