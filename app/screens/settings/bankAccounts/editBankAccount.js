import React, { Component } from 'react'
import { View, Alert, StyleSheet } from 'react-native'
import EditBankAccountComponent from './bankAccountComponent'
import SettingsService from './../../../services/settingsService'
import ResetNavigation from './../../../util/resetNavigation'

export default class EditBankAccount extends Component {
  static navigationOptions = {
    title: 'Edit Bank Account',
  }

  constructor(props) {
    super(props)
    const params = this.props.navigation.state.params.reference
    this.state = {
      id: params.id,
      name: params.name,
      number: params.number,
      type: params.type,
      bank_name: params.bank_name,
      branch_code: params.branch_code,
      swift: params.swift,
      iban: params.iban,
      bic: params.bic,
    }
  }

  updateName = (name) => {
    this.setState({ name })
  }
  updateNumber = (number) => {
    this.setState({ number })
  }
  updateType = (type) => {
    this.setState({ type })
  }
  updateBank = (bank_name) => {
    this.setState({ bank_name })
  }
  updateBranch = (branch_code) => {
    this.setState({ branch_code })
  }
  updateSwift = (swift) => {
    this.setState({ swift })
  }
  updateIBAN = (iban) => {
    this.setState({ iban })
  }
  updateBIC = (bic) => {
    this.setState({ bic })
  }
  goToHome = () => {
    ResetNavigation.dispatchUnderDrawer(this.props.navigation, 'Settings', 'SettingsBankAccounts')
  }

  update = async () => {
    let responseJson = await SettingsService.editBankAccount(this.state.id, this.state)

    if (responseJson.status === "success") {
      this.goToHome()
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
        <EditBankAccountComponent
          values={this.state}
          updateName={this.updateName}
          updateNumber={this.updateNumber}
          updateType={this.updateType}
          updateBank={this.updateBank}
          updateBranch={this.updateBranch}
          updateSwift={this.updateSwift}
          updateIBAN={this.updateIBAN}
          updateBIC={this.updateBIC}
          save={this.update}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 15,
  },
})
