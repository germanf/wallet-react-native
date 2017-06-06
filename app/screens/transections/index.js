import React, {Component} from 'react';
import {
  View,
  ListView,
  AsyncStorage,
  Alert,
  RefreshControl,
} from 'react-native'
import InfiniteScrollView from 'react-native-infinite-scroll-view'
import Transection from './transection'


export default class Transections extends Component {
  constructor(props) {
    super(props);
    this.state = {
      refreshing: false,
      nextUrl: null,
      data: [],
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
          const data = responseJson.data.results
          this.setState({
            data,
            dataSource: this.state.dataSource.cloneWithRows(data),
            refreshing: false,
            nextUrl: responseJson.data.next,
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

  loadMoreData = async() => {
    this.setState({refreshing: true});
    const value = await AsyncStorage.getItem('token')
    fetch(this.state.nextUrl, {
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
          const data = this.state.data.concat(responseJson.data.results)
          this.setState({
            data,
            dataSource: this.state.dataSource.cloneWithRows(data),
            refreshing: false,
            nextUrl: responseJson.data.next,
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
          renderScrollComponent={(props) => <InfiniteScrollView {...props} />}
          refreshControl={<RefreshControl refreshing={this.state.refreshing} onRefresh={this.getData.bind(this)} />}
          dataSource={this.state.dataSource}
          renderRow={(rowData) => <Transection data={rowData} />}
          canLoadMore={!!this.state.nextUrl}
          onLoadMoreAsync={this.loadMoreData.bind(this)}
        />
      </View>
    );
  }
}
