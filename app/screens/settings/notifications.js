import React, { Component } from 'react'
import { View, StyleSheet, ListView, Alert, RefreshControl } from 'react-native'
import Spinner from 'react-native-loading-spinner-overlay'
import Notification from './../../components/notification'
import SettingsService from './../../services/settingsService'
import ResetNavigation from './../../util/resetNavigation'

export default class Settings extends Component {
  static navigationOptions = {
    title: 'Notifications',
  }

  constructor(props) {
    super(props)
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

  getData = async () => {
    let responseJson = await SettingsService.getAllNotifications()
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

  reload = () => {
    ResetNavigation.dispatchUnderDrawer(this.props.navigation, 'Settings', 'SettingsNotifications')
  }

  enableEmail = async (id, previous) => {
    this.setState({ loading: true })

    const body = {
      email_enabled: !previous,
    }

    let responseJson = await SettingsService.changeStateOfNotification(id, body)

    if (responseJson.status === "success") {
      this.reload()
    }
    else {
      Alert.alert('Error',
        responseJson.message,
        [{ text: 'OK' }])
    }
  }

  enableSMS = async (id, previous) => {
    this.setState({ loading: true })

    const body = {
      sms_enabled: !previous,
    }
    let responseJson = await SettingsService.changeStateOfMobileNotification(id, body)

    if (responseJson.status === "success") {
      this.reload()
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
