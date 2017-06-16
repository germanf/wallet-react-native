import React, { Component } from 'react'
import { View, StyleSheet, Image, AsyncStorage, Alert, Text, TouchableHighlight } from 'react-native'
import Spinner from 'react-native-loading-spinner-overlay'
import UserInfoService from './../../../services/userInfoService'
import ResetNavigation from './../../../util/resetNavigation'

export default class UploadImage extends Component {
  static navigationOptions = {
    title: 'Upload Image',
  }

  constructor(props) {
    super(props)
    const params = this.props.navigation.state.params
    this.state = {
      image: params.image,
      loading: false,
    }
  }

  goBackAndReload = () => {
    ResetNavigation.dispatchUnderDrawer(this.props.navigation, "Settings", 'SettingsProfileImage')
  }

  saveImage = async () => {
    this.setState({ loading: true })
    const uri = this.state.image.uri
    const parts = uri.split("/")
    const name = parts[parts.length - 1]
    const file = {
      uri,
      name,
      type: 'image/jpg',
    }

    let responseJson = await UserInfoService.uploadProfileImage(file)
    if (responseJson.status === "success") {
      AsyncStorage.removeItem('user')
      AsyncStorage.setItem('user', JSON.stringify(responseJson.data))
      this.goBackAndReload()
    }
    else {
      Alert.alert('Error',
        responseJson.message,
        [{ text: 'OK' }])
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <Spinner
          visible={this.state.loading}
          textContent={"Uploading..."}
          textStyle={{ color: '#FFF' }}
        />
        <TouchableHighlight
          style={{ flex: 1 }}
          onPress={null}>
          <Image
            style={{ height: 300, width: 300, borderRadius: 150 }}
            source={{ uri: this.state.image.uri }}
          />
        </TouchableHighlight>
        <TouchableHighlight
          style={styles.submit}
          onPress={() => this.saveImage()}>
          <Text style={{ color: 'white', fontSize: 20 }}>
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
    marginTop: 10,
    flexDirection: 'column',
    backgroundColor: 'white',
    alignItems: 'center',
  },
  submit: {
    marginTop: 10,
    height: 60,
    backgroundColor: '#2070A0',
    width: "100%",
    alignSelf: 'stretch',
    alignItems: 'center',
    justifyContent: 'center',
  },
})

