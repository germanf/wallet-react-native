import React, { Component } from 'react'
import { View, ListView, StyleSheet, Alert, AsyncStorage, TouchableHighlight, Text } from 'react-native'
import Account from './../../../components/account'
import SettingsService from './../../../services/settingsService'

export default class BitcoinAddresses extends Component {
  static navigationOptions = {
    title: 'Select Bitcoin Addresses',
  }

  constructor(props) {
    super(props);
    this.state = {
      dataSource: new ListView.DataSource({
        rowHasChanged: (r1, r2) => JSON.stringify(r1) !== JSON.stringify(r2),
      }),
    }
  }
  componentWillMount() {
    this.getData()
  }
  goToEdit = (reference) => {
    this.props.navigation.navigate("EditBitcoinAddress", { reference })
  }

  fetchSuccess = (responseJson) => {
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
    SettingsService.getAllBitcoinAddresses(token, this.fetchSuccess, this.fetchError)
  }

  render() {
    return (
      <View style={styles.container}>
        <ListView
          dataSource={this.state.dataSource}
          renderRow={(rowData) => <Account onPress={this.goToEdit} reference={rowData} name={rowData.address} />}
        />
        <TouchableHighlight
          style={styles.submit}
          onPress={() => this.props.navigation.navigate("AddBitcoinAddress", { parentRoute: 'Settings', nextRoute: 'SettingsBitcoinAddresses' })}>
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
