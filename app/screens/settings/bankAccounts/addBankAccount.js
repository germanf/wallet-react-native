import React, { Component } from 'react'
import { View, Alert, StyleSheet } from 'react-native'
import { NavigationActions } from 'react-navigation'
import AddBankAccountComponent from './bankAccountComponent'
import SettingsService from './../../../services/settingsService'

export default class AddBankAccount extends Component {
  static navigationOptions = {
    title: 'Add New Account',
  }

  constructor() {
    super()
    this.state = {
      name: '',
      number: '',
      type: '',
      bank_name: '',
      branch_code: '',
      swift: '',
      iban: '',
      bic: '',
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
    const params = this.props.navigation.state.params
    const resetAction = NavigationActions.reset({
      index: 1,
      actions: [
        NavigationActions.navigate({
          routeName: 'Home',
          params: {},

          // navigate can have a nested navigate action that will be run inside the child router
          action: NavigationActions.navigate({ routeName: params.parentRoute }),
        }),
        NavigationActions.navigate({ routeName: params.nextRoute }),
      ],
    })
    this.props.navigation.dispatch(resetAction)
  }

  add = async () => {
    let responseJson = await SettingsService.addBankAccount(this.state)

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
        <AddBankAccountComponent
          values={this.state}
          updateName={this.updateName}
          updateNumber={this.updateNumber}
          updateType={this.updateType}
          updateBank={this.updateBank}
          updateBranch={this.updateBranch}
          updateSwift={this.updateSwift}
          updateIBAN={this.updateIBAN}
          updateBIC={this.updateBIC}
          save={this.add}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 15,
  },
})
