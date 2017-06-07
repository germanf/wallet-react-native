import React, {Component} from 'react'
import {View, StyleSheet, Image, AsyncStorage, TouchableHighlight} from 'react-native'
import { ImagePicker } from 'expo'

export default class ProfileImage extends Component {
  static navigationOptions = {
    title: 'Profile Image',
  }

  constructor() {
    super()

    this.state = {
      imageURI: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSgmT5tM-IGcFDpqZ87p9zKGaWQuzpvAcDKfOTPYfx5A9zOmbTh8RMMFg',
    }
  }

  componentDidMount() {
    this.getData()
  }

  getData = async () => {
    const value = await AsyncStorage.getItem('user');
    const user = JSON.parse(value)
    if (user.profile !== null) {
      this.setState({imageURI: user.profile})
    }
  }

  pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [4, 3],
    })

    console.log(result)

    if (!result.cancelled) {
      this.props.navigation.navigate("UploadImage", {image: result})
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <TouchableHighlight onPress={() => this.pickImage()}>
          <Image
            style={styles.photo}
            source={{uri: this.state.imageURI}}
          />
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
  photo: {
    width: 200,
    height: 200,
    borderRadius: 100,
  },
})

