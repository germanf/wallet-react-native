import React, { Component } from 'react';
import {
  View,
  ListView,
  AsyncStorage,
  Alert,
  RefreshControl,
} from 'react-native'
import InfiniteScrollView from 'react-native-infinite-scroll-view'
import Transection from './transection'
import TransectionService from './../../services/transectionService'


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

  errorOnFetch = (error) => {
    Alert.alert('Error',
      error,
      [{ text: 'OK' }])
  }

  onGetDataSuccess = (responseJson) => {
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
      this.setState({
        refreshing: false,
      })
      Alert.alert('Error',
        responseJson.message,
        [{ text: 'OK', onPress: () => this.props.logout() }])
    }
  }

  getData = async () => {
    this.setState({
      refreshing: true,
      data: [],
    })
    const token = await AsyncStorage.getItem('token')
    TransectionService.getAllTransections(token, this.onGetDataSuccess, this.errorOnFetch)
  }

  loadMoreData = async () => {
    if (this.state.refreshing !== true) {
      this.setState({ refreshing: true })
      const token = await AsyncStorage.getItem('token')
      TransectionService.getNextTransections(this.state.nextUrl, token, this.onGetDataSuccess, this.errorOnFetch)
    }
  }

  render() {
    return (
      <View style={{ flex: 1, paddingTop: 10 }}>
        <ListView
          renderScrollComponent={(props) => <InfiniteScrollView {...props} />}
          refreshControl={<RefreshControl refreshing={this.state.refreshing} onRefresh={this.getData.bind(this)} />}
          dataSource={this.state.dataSource}
          renderRow={(rowData) => <Transection data={rowData} />}
          canLoadMore={!!this.state.nextUrl}
          onLoadMoreAsync={this.loadMoreData.bind(this)}
          enableEmptySections
        />
      </View>
    );
  }
}
