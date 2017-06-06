import React, {Component} from 'react'
import {View, ListView, StyleSheet, Alert,  AsyncStorage, RefreshControl} from 'react-native'
import {NavigationActions} from 'react-navigation'
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
  componentWillMount() {
    this.getData()
  }
  getData = async () => {
    this.setState({
        refreshing: true,
      })
    const value = await AsyncStorage.getItem('token');
    fetch('https://rehive.com/api/3/accounts/' + this.state.reference + '/currencies/', {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': 'Token ' + value,
        },
      })
      .then((response) => response.json())
      .then((responseJson) => {
        if (responseJson.status === "success") {
          const data = responseJson.data.results;
          console.log(data)
          this.setState({
            refreshing: false,
            dataSource: this.state.dataSource.cloneWithRows(data),
          })
        }
        else {
          this.props.logout()
        }
      })
      .catch((error) => {
        Alert.alert('Error',
            error,
            [{text: 'OK'}])
      })
  }
  reload = () => {
    const resetAction = NavigationActions.reset({
      index: 1,
      actions: [
        NavigationActions.navigate({
          routeName: 'Home',
          params: {},

          // navigate can have a nested navigate action that will be run inside the child router
          action: NavigationActions.navigate({ routeName: 'Accounts'}),
        }),
        NavigationActions.navigate({ routeName: 'AccountCurrencies', params: {reference: this.state.reference}}),
      ],
    })
    this.props.navigation.dispatch(resetAction)
   }
  setActive = async(code) => {
    const value = await AsyncStorage.getItem('token');
    console.log(this.state.reference)
    fetch('https://rehive.com/api/3/accounts/' + this.state.reference + '/currencies/' + code + '/', {
        method: 'PUT',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': 'Token ' + value,
        },
        body: JSON.stringify({
        active: true,
      }),
      })
      .then((response) => response.json())
      .then((responseJson) => {
        if (responseJson.status === "success") {
          this.reload()
        }
      })
      .catch((error) => {
        Alert.alert('Error',
            error,
            [{text: 'OK'}])
      })
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
    flex:1,
    flexDirection: 'column',
    backgroundColor: 'white',
  },
})
