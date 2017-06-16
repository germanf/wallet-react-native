import React, { Component } from 'react';
import {
  View,
  ListView,
  RefreshControl,
} from 'react-native'
import InfiniteScrollView from 'react-native-infinite-scroll-view'
import Transection from './../../components/transection'
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

  setDataInListView = (responseJson) => {
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
      this.props.logout()
    }
  }

  getData = async () => {
    this.setState({
      refreshing: true,
      data: [],
    })
    let responseJson = await TransectionService.getAllTransections()
    this.setDataInListView(responseJson)
  }

  loadMoreData = async () => {
    if (this.state.refreshing !== true) {
      this.setState({
        refreshing: true,
      })
      let responseJson = await TransectionService.getNextTransections(this.state.nextUrl)
      this.setDataInListView(responseJson)
    }
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
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
