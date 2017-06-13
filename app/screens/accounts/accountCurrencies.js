import React, { Component } from 'react'
import { View, ListView, StyleSheet, Alert, AsyncStorage, RefreshControl } from 'react-native'
import { NavigationActions } from 'react-navigation'
import AccountService from './../../services/accountService'
import Currency from './currency'

export default class Accounts extends Component {
  static navigationOptions = {
    title: 'Currencies',
  }

  constructor(props) {
    super(props);
    const params = this.props.navigation.state.params
    this.state = {
      refreshing: false,
      reference: params.reference,
      dataSource: new ListView.DataSource({
        rowHasChanged: (r1, r2) => JSON.stringify(r1) !== JSON.stringify(r2),
      }),
    }
  }
  componentDidMount() {
    this.getData()
  }

  fetchSuccessOnGetData = (responseJson) => {
    if (responseJson.status === "success") {
      const data = responseJson.data.results;
      console.log(data)
      this.setState({
        refreshing: false,
        dataSource: this.state.dataSource.cloneWithRows(data),
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

  fetchSuccessOnSetActive = (responseJson) => {
    if (responseJson.status === "success") {
      this.reload()
    }
    else {
      Alert.alert('Error',
        responseJson.message,
        [{
          text: 'OK',
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
    AccountService.getAllAccountCurrencies(this.state.reference, token, this.fetchSuccessOnGetData, this.fetchError)
  }
  reload = () => {
    const resetAction = NavigationActions.reset({
      index: 1,
      actions: [
        NavigationActions.navigate({
          routeName: 'Home',
          params: {},

          // navigate can have a nested navigate action that will be run inside the child router
          action: NavigationActions.navigate({ routeName: 'Accounts' }),
        }),
        NavigationActions.navigate({ routeName: 'AccountCurrencies', params: { reference: this.state.reference } }),
      ],
    })
    this.props.navigation.dispatch(resetAction)
  }
  setActive = async (code) => {
    const token = await AsyncStorage.getItem('token');
    AccountService.setActiveCurrency(this.state.reference, code, token, this.fetchSuccessOnSetActive, this.fetchError)
  }

  render() {
    return (
      <View style={styles.container}>
        <ListView
          refreshControl={<RefreshControl refreshing={this.state.refreshing} onRefresh={this.getData.bind(this)} />}
          dataSource={this.state.dataSource}
          renderRow={(rowData) => <Currency setActive={this.setActive} data={rowData} />}
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
