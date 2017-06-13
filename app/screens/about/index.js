import React, {Component} from 'react'
import {View, Text, StyleSheet, Image, Alert, AsyncStorage, Linking} from 'react-native'
import UserInfoService from './../../services/userInfoService'

export default class About extends Component {
  static navigationOptions = {
    title: 'About',
  }

  constructor() {
    super()

    this.state = {
      company: {},
    }
  }

  componentDidMount() {
    this.getData()
  }

  fetchSuccess = (responseJson) => {
    if (responseJson.status === "success") {
          this.setState({
            company: responseJson.data,
          })
        }
        else {
          Alert.alert('Error',
            responseJson.message,
            [{text: 'OK'}])
        }
  }

  fetchError = (error) => {
    Alert.alert('Error',
            error,
            [{text: 'OK'}])
  }

  getData = async () => {
    const token = await AsyncStorage.getItem('token');
    UserInfoService.getCompany(token, this.fetchSuccess, this.fetchError)
  }

  openLink = () => {
    Linking.canOpenURL(this.state.company.website).then(supported => {
      if (supported) {
        Linking.openURL(this.state.company.website)
      }
      else {
        Alert.alert('Error',
            'Don\'t know how to open URI: ' + this.state.company.website,
            [{text: 'OK'}])
      }
    })
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.details}>
          <Text style={{fontSize:30}}>
            {this.state.company.name}
          </Text>
          <View style={styles.description}>
            <Text style={{fontSize:20}}>
              {this.state.company.description}
            </Text>
            <Text
              style={{fontSize:20, color:'blue'}}
              onPress={this.openLink}>
              (link)
            </Text>
          </View>
        </View>
        <View style={styles.logo}>
          {this.state.company.logo !== null ?
            <Image
              style={{width: 200, height: 100}}
              source={{uri: this.state.company.logo}}
            /> :
            null
          }
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'white',
  },
  description: {
    flexDirection: 'row',
    marginTop: 5,
  },
  details: {
    height: 150,
    padding: 20,
    alignItems: 'flex-start',
    justifyContent: 'center',
    backgroundColor: 'gainsboro',
  },
  logo: {
    padding: 10,
    paddingTop: 20,
    alignItems: 'center',
  },
})
