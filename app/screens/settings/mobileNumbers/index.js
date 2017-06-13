import React, { Component } from 'react'
import { View, StyleSheet, ListView, Alert, AsyncStorage, TouchableHighlight, Text, RefreshControl } from 'react-native'
import { NavigationActions } from 'react-navigation'
import Spinner from 'react-native-loading-spinner-overlay'
import MobileNumber from './mobileNumberComponent'
import SettingsService from './../../../services/settingsService'

export default class Settings extends Component {
  static navigationOptions = {
    title: 'Mobile Numbers',
  }

  constructor(props) {
    super(props);
    this.state = {
      refreshing: false,
      loading: false,
      loadingMessage: "",
      dataSource: new ListView.DataSource({
        rowHasChanged: (r1, r2) => JSON.stringify(r1) !== JSON.stringify(r2),
      }),
    }
  }

  componentWillMount() {
    this.getData()
  }

  fetchSuccessOnGetData = (responseJson) => {
    if (responseJson.status === "success") {
      const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => JSON.stringify(r1) !== JSON.stringify(r2) });
      const data = responseJson.data;
      //console.log(data)
      let ids = data.map((obj, index) => index);
      this.setState({
        dataSource: ds.cloneWithRows(data, ids),
      })
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
      [{ text: 'OK', onPress: () => console.log('OK Pressed!') }])
  }

  getData = async () => {
    const token = await AsyncStorage.getItem('token');
    SettingsService.getAllMobiles(token, this.fetchSuccessOnGetData, this.fetchError)
  }

  reload = () => {
    const resetAction = NavigationActions.reset({
      index: 1,
      actions: [
        NavigationActions.navigate({
          routeName: 'Home',
          params: {},

          // navigate can have a nested navigate action that will be run inside the child router
          action: NavigationActions.navigate({ routeName: 'Settings' }),
        }),
        NavigationActions.navigate({ routeName: 'SettingsMobileNumbers' }),
      ],
    })
    this.props.navigation.dispatch(resetAction)
  }

  fetchSuccessAndReload = (responseJson) => {
    if (responseJson.status === "success") {
      this.reload()
    }
    else {
      Alert.alert('Error',
        responseJson.message,
        [{ text: 'OK' }])
    }
  }

  makePrimary = async (id) => {
    this.setState({
      loading: true,
      loadingMessage: 'Updating...',
    })
    const token = await AsyncStorage.getItem('token')
    const body = { "primary": true }
    SettingsService.makeMobilePrimary(token, id, body, this.fetchSuccessAndReload, this.fetchError)
  }

  fetchSuccessOnResendVerification = (responseJson) => {
    if (responseJson.status === "success") {
      this.setState({ loading: false })
      this.props.navigation.navigate("VerifyMobileNumber")
    }
    else {
      Alert.alert('Error',
        responseJson.message,
        [{ text: 'OK' }])
    }
  }

  verify = async (number) => {
    this.setState({
      loading: true,
      loadingMessage: 'Sending Verification Code...',
    })
    const token = await AsyncStorage.getItem('token');
    const userData = await AsyncStorage.getItem('user')

    const user = JSON.parse(userData)

    const body = {
      identifier: number,
      company_id: user.company,
    }

    SettingsService.resendMobileVerification(token, body, this.fetchSuccessOnResendVerification, this.fetchError)
  }

  delete = async (id) => {
    this.setState({
      loading: true,
      loadingMessage: 'Deleting...',
    })
    const token = await AsyncStorage.getItem('token');
    SettingsService.deleteMobile(token, id, this.fetchSuccessAndReload, this.fetchError)
  }

  render() {
    return (
      <View style={styles.container}>
        <Spinner
          visible={this.state.loading}
          textContent={this.state.loadingMessage}
          textStyle={{ color: '#FFF' }}
        />
        <ListView
          refreshControl={<RefreshControl refreshing={this.state.refreshing} onRefresh={this.getData.bind(this)} />}
          dataSource={this.state.dataSource}
          renderRow={(rowData) => <MobileNumber mobile={rowData} makePrimary={this.makePrimary} verify={this.verify} delete={this.delete} reload={this.reload} />}
        />
        <TouchableHighlight
          style={styles.submit}
          onPress={() => this.props.navigation.navigate("AddMobileNumber")}>
          <Text style={{ color: 'white', fontSize: 20 }}>
            Add Mobile Number
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
  },
  submit: {
    padding: 10,
    height: 70,
    backgroundColor: '#2070A0',
    width: "100%",
    alignSelf: 'stretch',
    alignItems: 'center',
    justifyContent: 'center',
  },
})
