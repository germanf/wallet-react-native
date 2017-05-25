import React, {Component} from 'react'
import {View, Alert, Text, StyleSheet, KeyboardAvoidingView, ScrollView, TextInput, AsyncStorage, TouchableHighlight} from 'react-native'

export default class Settings extends Component {
  static navigationOptions = {
    title: 'Personal Details',
  }

  constructor() {
    super()

    this.state = {
      first_name: '',
      last_name: '',
      id_number: '',
    }
  }

  componentDidMount() {
    this.getUser()
  }

  getUser = async () => {
    const value = await AsyncStorage.getItem('user')

    const user = JSON.parse(value)

    Alert.alert(
      "User",
      value
    )

    this.setState({
      first_name: user.first_name,
      last_name: user.last_name,
      id_number: user.id_number,
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
          </ScrollView>
          <TouchableHighlight
            style={styles.submit}
            onPress={null}>
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
})

