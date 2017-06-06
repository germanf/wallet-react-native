import React, {Component} from 'react'
import {View, StyleSheet, Image, AsyncStorage, Alert, Text, TouchableHighlight} from 'react-native'
import {NavigationActions} from 'react-navigation'
import Spinner from 'react-native-loading-spinner-overlay'

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
    const resetAction = NavigationActions.reset({
      index: 1,
      actions: [
        NavigationActions.navigate({
          routeName: 'Home',
          params: {},

          // navigate can have a nested navigate action that will be run inside the child router
          action: NavigationActions.navigate({ routeName: 'Settings'}),
        }),
        NavigationActions.navigate({ routeName: 'SettingsProfileImage'}),
      ],
    })
    this.props.navigation.dispatch(resetAction)
  }

  saveImage = async () => {
    this.setState({loading:true})
    console.log(this.state.image)
    const uri = this.state.image.uri
    const parts = uri.split("/")
    const name = parts[parts.length - 1]
    const file = {
      uri,
      name,
      type: 'image/jpg',
    }

    const body = new FormData()
    body.append('profile', file)

    //console.log(body)

    const value = await AsyncStorage.getItem('token')
     fetch('https://rehive.com/api/3/user/', {
        method: 'PATCH',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'multipart/form-data',
          'Authorization': 'Token ' + value,
        },
        body,
      })
      .then((response) => response.json())
      .then((responseJson) => {
        console.log(responseJson)
        if (responseJson.status === "success") {
          AsyncStorage.removeItem('user')
          AsyncStorage.setItem('user', JSON.stringify(responseJson.data))
          this.goBackAndReload()
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
        <Spinner
          visible={this.state.loading}
          textContent={"Uploading..."}
          textStyle={{color: '#FFF'}}
        />
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

