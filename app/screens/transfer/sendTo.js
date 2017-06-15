import React, { Component } from 'react'
import { View, KeyboardAvoidingView, StyleSheet, TextInput, AsyncStorage, TouchableHighlight, Text, Alert, ListView, ActivityIndicator } from 'react-native'
import Expo from 'expo'
import TransectionService from './../../services/transectionService'
import Contact from './contact'

export default class AmountEntry extends Component {
  static navigationOptions = {
    title: 'Send To',
  }

  constructor(props) {
    super(props);
    const params = this.props.navigation.state.params
    this.state = {
      ready: false,
      amount: params.amount,
      note: params.note,
      reference: params.reference,
      searchText: params.reference,
      data: [],
      contacts: new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 }),
    }
  }

  componentWillMount() {
    this.showContactsAsync()
  }

  showContactsAsync = async () => {
    // Ask for permission to query contacts.
    const permission = await Expo.Permissions.askAsync(Expo.Permissions.CONTACTS);
    if (permission.status !== 'granted') {
      Alert.alert(
        'Error',
        'Permission denied'
      );
      return;
    }
    const getTotal = await Expo.Contacts.getContactsAsync({
      fields: [
        Expo.Contacts.PHONE_NUMBERS,
        Expo.Contacts.EMAILS,
      ],
      pageSize: 1,
      pageOffset: 0,
    });

    const contacts = await Expo.Contacts.getContactsAsync({
      fields: [
        Expo.Contacts.PHONE_NUMBERS,
        Expo.Contacts.EMAILS,
      ],
      pageSize: getTotal.total,
      pageOffset: 0,
    });

    var data = []
    contacts.data.forEach((node) => {
      if (typeof (node.phoneNumbers) !== "undefined") {
        node.phoneNumbers.forEach((number) => {
          var newData = {
            name: node.name,
            contact: number.number,
          }
          data.push(newData)
        })
      }
      if (typeof (node.emails) !== "undefined") {
        node.emails.forEach((email) => {
          var newData = {
            name: node.name,
            contact: email.email,
          }
          data.push(newData)
        })
      }
    })

    data = data.sort((a, b) => {
      if (a.name < b.name) {
        return -1
      }
      else if (a.name > b.name) {
        return 1
      }
      else {
        return 0
      }
    })
    this.setState({
      ready: true,
      data,
      contacts: this.state.contacts.cloneWithRows(data),
    })
  }

  selectAContact = (contact) => {
    this.setState({ searchText: contact })
  }

  searchTextChanged = (event) => {
    let searchText = event.nativeEvent.text
    this.setState({ searchText })

    if (searchText === '') {
      this.setState({
        contacts: this.state.contacts.cloneWithRows(this.state.data),
      })
      return
    }

    let contacts = this.state.data.filter((node) => {
      let name = node.name.toLowerCase()
      if (name.indexOf(searchText) !== -1) {
        return true
      }
      else if (node.contact.indexOf(searchText) !== -1) {
        return true
      }

      return false
    })

    this.setState({
      contacts: this.state.contacts.cloneWithRows(contacts),
    })
  }


  send = async () => {
    if (this.state.searchText === '') {
      Alert.alert(
        'Error',
        'Enter a reference..',
      )
      return
    }
    else {
      this.setState({ reference: this.state.searchText })
    }

    const data = await AsyncStorage.getItem('currency')
    const currency = JSON.parse(data)
    let amount = this.state.amount
    for (let i = 0; i < currency.divisibility; i++) {
      amount = amount * 10
    }
    Alert.alert(
      'Are you sure?',
      'Send ' + currency.symbol + this.state.amount + ' to ' + this.state.reference,
      [
        { text: 'Yes', onPress: () => this.transferConfirmed(amount) },
        { text: 'No', onPress: this.transferCenceled, style: 'cancel' },
      ]
    )
  }

  transferConfirmed = async (amount) => {
    const token = await AsyncStorage.getItem('token')
    TransectionService.sendMoney(token, amount, this.state.reference, this.state.note, this.fetchSuccess, this.fetchError)
  }

  fetchSuccess = (responseJson) => {
    if (responseJson.status === "success") {
      Alert.alert('Success',
        "TX Code: " + responseJson.data.tx_code,
        [{ text: 'OK', onPress: this.transferCenceled }])
    }
    else {
      Alert.alert('Error',
        responseJson.message,
        [{ text: 'OK' }])
    }
  }

  fetchError = (error) => {
    Alert.alert('Error',
      error,
      [{ text: 'OK' }])
  }

  transferCenceled = () => {
    this.props.navigation.navigate("Home")
  }

  render() {
    if (!this.state.ready) {
      return (
        <KeyboardAvoidingView style={styles.container} behavior={'padding'} keyboardVerticalOffset={70}>
          <View style={{ flex: 1 }}>
            <TextInput
              style={styles.input}
              placeholder="Enter name/email/mobile"
              autoCapitalize="none"
              value={this.state.searchText}
              onChange={this.searchTextChanged.bind(this)}
            />
            <View style={styles.spinner}>
              <Text>
                Loading Contacts
              </Text>
              <ActivityIndicator
                animating
                style={{ height: 80 }}
                size="large"
              />
            </View>
          </View>
          <TouchableHighlight
            style={styles.submit}
            onPress={this.send}>
            <Text style={{ color: 'white', fontSize: 20 }}>
              Send
            </Text>
          </TouchableHighlight>
        </KeyboardAvoidingView>
      )
    }
    return (
      <KeyboardAvoidingView style={styles.container} behavior={'padding'} keyboardVerticalOffset={70} >
        <View style={{ flex: 1 }}>
          <TextInput
            style={styles.input}
            placeholder="Enter name/email/mobile"
            autoCapitalize="none"
            value={this.state.searchText}
            onChange={this.searchTextChanged.bind(this)}
          />
          <View style={{ flex: 1, padding: 10 }}>
            <ListView
              dataSource={this.state.contacts}
              enableEmptySections
              renderRow={(rowData) => <Contact selected={this.selectAContact} rowData={rowData} />}
            />
          </View>
        </View>
        <TouchableHighlight
          style={styles.submit}
          onPress={this.send}>
          <Text style={{ color: 'white', fontSize: 20 }}>
            Send
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
  spinner: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
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
  contact: {
    height: 40,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
})
