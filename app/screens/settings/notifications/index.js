import React, { Component } from 'react'
import { View, StyleSheet, ListView, Alert, AsyncStorage, RefreshControl } from 'react-native'
import { NavigationActions } from 'react-navigation'
import Spinner from 'react-native-loading-spinner-overlay'
import Notification from './notification'
import SettingsService from './../../../services/settingsService'

export default class Settings extends Component {
  static navigationOptions = {
    title: 'Notifications',
  }

  constructor(props) {
    super(props);
    this.state = {
      refreshing: false,
      loading: false,
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
    SettingsService.getAllNotifications(token, this.fetchSuccessOnGetData, this.fetchError)
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
        NavigationActions.navigate({ routeName: 'SettingsNotifications' }),
      ],
    })
    this.props.navigation.dispatch(resetAction)
  }

  fetchSuccessOnEnableNotification = (responseJson) => {
    if (responseJson.status === "success") {
      this.reload()
    }
    else {
      Alert.alert('Error',
        responseJson.message,
        [{ text: 'OK' }])
    }
  }

  enableEmail = async (id, previous) => {
    this.setState({ loading: true })

    const token = await AsyncStorage.getItem('token')
    const body = {
      email_enabled: !previous,
    }
    SettingsService.changeStateOfEmailNotification(token, id, body, this.fetchSuccessOnEnableNotification, this.fetchError)
  }

  enableSMS = async (id, previous) => {
    this.setState({ loading: true })

    const token = await AsyncStorage.getItem('token')
    const body = {
      sms_enabled: !previous,
    }
    SettingsService.changeStateOfMobileNotification(token, id, body, this.fetchSuccessOnEnableNotification, this.fetchError)
  }

  render() {
    return (
      <View style={styles.container}>
        <Spinner
          visible={this.state.loading}
          textContent={"Updating..."}
          textStyle={{ color: '#FFF' }}
        />
        <ListView
          refreshControl={<RefreshControl refreshing={this.state.refreshing} onRefresh={this.getData.bind(this)} />}
          dataSource={this.state.dataSource}
          renderRow={(rowData) => <Notification data={rowData} enableEmail={this.enableEmail} enableSMS={this.enableSMS} />}
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
