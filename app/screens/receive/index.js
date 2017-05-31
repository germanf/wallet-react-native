import React, {Component} from 'react'
import {View, Text, StyleSheet, Image, Alert, AsyncStorage} from 'react-native'

export default class Receive extends Component {
  static navigationOptions = {
    title: 'Receive',
  }

  constructor() {
    super()

    this.state = {
      imageURI: 'https://chart.googleapis.com/chart?chs=300x300&cht=qr&chl=undefined&choe=UTF-8',
    }
  }

  componentDidMount() {
    this.getData()
  }

  getData = async () => {
    const value = await AsyncStorage.getItem('token');
    fetch('https://rehive.com/api/3/user/', {
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
          let email = responseJson.data.email
          let uri = 'https://chart.googleapis.com/chart?chs=300x300&cht=qr&chl=' + email + '&choe=UTF-8'
          this.setState({
            imageURI: uri,
          })
          console.log(this.state)
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
      <View style={styles.container}>
        <Text style={styles.text}>
          The QR code is your public address for accepting payments.
        </Text>
        <Image
          style={{width: 300, height: 300}}
          source={{uri: this.state.imageURI}}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'white',
    padding: 20,
    alignItems: 'center',
  },
  text: {
    fontSize: 16,
    textAlign: 'center',
  },
})
