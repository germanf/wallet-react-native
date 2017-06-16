import React, { Component } from 'react'
import { View, StyleSheet, ScrollView } from 'react-native'
import Option from './../../components/settingsOption';

export default class Settings extends Component {
  static navigationOptions = {
    title: 'Settings',
  }

  goTo = (path) => {
    this.props.navigation.navigate(path)
  }

  render() {
    return (
      <View style={styles.container}>
        <ScrollView>
          <Option name="Profile Image" gotoAddress="SettingsProfileImage" goTo={this.goTo} />
          <Option name="Personal Details" gotoAddress="SettingsPersonalDetails" goTo={this.goTo} />
          <Option name="Mobile Numbers" gotoAddress="SettingsMobileNumbers" goTo={this.goTo} />
          <Option name="Email Addresses" gotoAddress="SettingsEmailAddresses" goTo={this.goTo} />
          <Option name="Get Verified" gotoAddress="SettingsGetVerified" goTo={this.goTo} />
          <Option name="Address" gotoAddress="SettingsAddress" goTo={this.goTo} />
          <Option name="Bank Accounts" gotoAddress="SettingsBankAccounts" goTo={this.goTo} />
          <Option name="Bitcoin Addresses" gotoAddress="SettingsBitcoinAddresses" goTo={this.goTo} />
          <Option name="Cards" gotoAddress="SettingsCards" goTo={this.goTo} />
          <Option name="Security" gotoAddress="SettingsSecurity" goTo={this.goTo} />
          <Option name="Notifications" gotoAddress="SettingsNotifications" goTo={this.goTo} />
        </ScrollView>
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
})
