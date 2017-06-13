import React, { Component } from 'react'
import { View, ListView, StyleSheet, Alert, AsyncStorage, RefreshControl } from 'react-native'
import AccountService from './../../services/accountService'
import Account from './account'

export default class Accounts extends Component {
  static navigationOptions = {
    title: 'Accounts',
  }

  constructor(props) {
    super(props);
    this.state = {
      refreshing: false,
      dataSource: new ListView.DataSource({
        rowHasChanged: (r1, r2) => JSON.stringify(r1) !== JSON.stringify(r2),
      }),
    }
  }
  componentDidMount() {
    this.getData()
  }
  getCurrencies = (reference) => {
    this.props.navigation.navigate("AccountCurrencies", { reference })
  }
  fetchSuccess = (responseJson) => {
    if (responseJson.status === "success") {
      const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => JSON.stringify(r1) !== JSON.stringify(r2) });
      const data = responseJson.data.results;
      console.log(data)
      let ids = data.map((obj, index) => index);
      this.setState({
        dataSource: ds.cloneWithRows(data, ids),
        refreshing: false,
      })
    }
    else {
      Alert.alert('Error',
        responseJson.message,
        [{
          text: 'OK',
          onPress: () => this.props.navigation.navigate('Home'),
        }])
    }
  }

  fetchError = (error) => {
    Alert.alert('Error',
          error,
          [{ text: 'OK' }])
  }
  getData = async () => {
    this.setState({
      refreshing: true,
    })
    const token = await AsyncStorage.getItem('token');
    AccountService.getAllAccounts(token, this.fetchSuccess, this.fetchError)
  }

  render() {
    return (
      <View style={styles.container}>
        <ListView
          refreshControl={<RefreshControl refreshing={this.state.refreshing} onRefresh={this.getData.bind(this)} />}
          dataSource={this.state.dataSource}
          renderRow={(rowData) => <Account getCurrencies={this.getCurrencies} reference={rowData.reference} name={rowData.name} />}
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
})
