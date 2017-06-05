import React, {Component} from 'react';
import {
  View,
  ListView,
  AsyncStorage,
  Alert,
  RefreshControl,
} from 'react-native';
import Transection from './transection'
//import InfiniteScrollView from 'react-native-infinite-scroll-view';

export default class Transections extends Component {
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
  getData = async () => {
    this.setState({refreshing: true});
    const value = await AsyncStorage.getItem('token')
    fetch('https://www.rehive.com/api/3/transactions/', {
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
          //console.log(data)
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
      <View style={{flex: 1, paddingTop: 10}}>
        <ListView
          refreshControl={<RefreshControl refreshing={this.state.refreshing} onRefresh={this.getData.bind(this)} />}
          dataSource={this.state.dataSource}
          renderRow={(rowData) => <Transection data={rowData} />}
        />
      </View>
    );
  }
}
