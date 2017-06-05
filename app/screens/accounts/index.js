import React, {Component} from 'react'
import {View, ListView, StyleSheet, Alert, AsyncStorage, RefreshControl} from 'react-native'
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
    this.props.navigation.navigate("AccountCurrencies", {reference})
  }
  getData = async () => {
    this.setState({
        refreshing: true,
      })
    const value = await AsyncStorage.getItem('token');
    fetch('https://rehive.com/api/3/accounts/', {
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
          const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => JSON.stringify(r1) !== JSON.stringify(r2)});
          const data = responseJson.data.results;
          console.log(data)
          let ids = data.map((obj, index) => index);
          this.setState({
            dataSource: ds.cloneWithRows(data, ids),
            refreshing: false,
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
    flex:1,
    flexDirection: 'column',
    backgroundColor: 'white',
  },
})
