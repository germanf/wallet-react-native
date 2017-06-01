import React, {Component} from 'react'
import {View, StyleSheet, Image, AsyncStorage, Alert, Text, TouchableHighlight} from 'react-native'

export default class UploadImage extends Component {
  static navigationOptions = {
    title: 'Upload Image',
  }

  constructor(props) {
    super(props)
    const params = this.props.navigation.state.params
    this.state = {
      image: params.image,
    }
  }

  saveImage = async () => {
    const file = {
      uri: this.state.image.uri,
      type: 'image/jpg',
    }

    const body = new FormData()
    body.append('profile', file)

    const value = await AsyncStorage.getItem('token')
     fetch('https://rehive.com/api/3/user/', {
        method: 'PATCH',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': 'Token ' + value,
        },
        body: JSON.stringify(body),
      })
      .then((response) => response.json())
      .then((responseJson) => {
        console.log(responseJson)
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
  };

  render() {
    return (
      <View style={styles.container}>
        <TouchableHighlight onPress={null}>
          <Image
            style={{height: this.state.image.height, width: this.state.image.width}}
            source={{uri: this.state.image.uri}}
          />
        </TouchableHighlight>
        <TouchableHighlight
          style={styles.submit}
          onPress={() => this.saveImage()}>
          <Text style={{color:'white'}}>
            Upload
          </Text>
        </TouchableHighlight>
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
  submit: {
      padding: 10,
      marginTop: 20,
      height: 50,
      borderRadius: 8,
      backgroundColor: '#2070A0',
      width: "100%",
      alignSelf: 'stretch',
      alignItems: 'center',
      justifyContent:'center',
   },
})

