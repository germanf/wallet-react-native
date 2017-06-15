import React, { Component } from 'react'
import { View, ListView, StyleSheet, Alert, TouchableHighlight, Text, RefreshControl } from 'react-native'
import Account from './../../components/bankAccount'
import SettingsService from './../../services/settingsService'

export default class BitcoinAddresses extends Component {
  static navigationOptions = {
    title: 'Select Bitcoin Addresses',
  }

  constructor(props) {
    super(props)
    this.state = {
      refreshing: false,
      dataSource: new ListView.DataSource({
        rowHasChanged: (r1, r2) => JSON.stringify(r1) !== JSON.stringify(r2),
      }),
    }
  }
  componentWillMount() {
    this.getData()
  }
  getAmount = (reference) => {
    this.props.navigation.navigate("WithdrawalAmountEntry", { reference })
  }
  getData = async () => {
    this.setState({
      refreshing: true,
    })
    let responseJson = await SettingsService.getAllBitcoinAddresses()

    if (responseJson.status === "success") {
      const ds = new ListView.DataSource({
        rowHasChanged: (r1, r2) =>
          JSON.stringify(r1) !== JSON.stringify(r2),
      })
      const data = responseJson.data
      let ids = data.map((obj, index) => index);
      this.setState({
        refreshing: false,
        dataSource: ds.cloneWithRows(data, ids),
      })
    }
    else {
      this.setState({
        refreshing: false,
      })
      Alert.alert('Error',
        responseJson.message,
        [{ text: 'OK' }])
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <ListView
          refreshControl={<RefreshControl refreshing={this.state.refreshing} onRefresh={this.getData.bind(this)} />}
          dataSource={this.state.dataSource}
          renderRow={(rowData) => <Account onPress={this.getAmount} reference={rowData.code} name={rowData.address} />}
        />
        <TouchableHighlight
          style={styles.submit}
          onPress={() => this.props.navigation.navigate("AddBitcoinAddress", { parentRoute: 'Withdraw', nextRoute: 'BitcoinAddresses' })}>
          <Text style={{ color: 'white', fontSize: 20 }}>
            Add Bitcoin Address
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
