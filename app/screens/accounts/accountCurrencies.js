import React, { Component } from 'react'
import { View, ListView, StyleSheet, Alert, RefreshControl } from 'react-native'
import InfiniteScrollView from 'react-native-infinite-scroll-view'
import AccountService from './../../services/accountService'
import ResetNavigation from './../../util/resetNavigation'
import Currency from './../../components/currency'

export default class Accounts extends Component {
  static navigationOptions = {
    title: 'Currencies',
  }

  constructor(props) {
    super(props);
    const params = this.props.navigation.state.params
    this.state = {
      reference: params.reference,
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
      Alert.alert(
        "Error",
        responseJson.message,
        "Ok"
      )
    }
  }

  getData = async () => {
    this.setState({
      refreshing: true,
      data: [],
    })
    let responseJson = await AccountService.getAllAccountCurrencies(this.state.reference)
    this.setDataInListView(responseJson)
  }

  loadMoreData = async () => {
    if (this.state.refreshing !== true) {
      this.setState({
        refreshing: true,
      })
      let responseJson = await AccountService.getMoreAccountCurrencies(this.state.nextUrl)
      this.setDataInListView(responseJson)
    }
  }

  reload = () => {
    ResetNavigation.dispatchUnderDrawerWithParams(this.props.navigation, 'Accounts', 'AccountCurrencies', { reference: this.state.reference })
  }

  setActive = async (code) => {
    let responseJson = await AccountService.setActiveCurrency(this.state.reference, code)
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

  render() {
    return (
      <View style={styles.container}>
        <ListView
          renderScrollComponent={(props) => <InfiniteScrollView {...props} />}
          refreshControl={<RefreshControl refreshing={this.state.refreshing} onRefresh={this.getData.bind(this)} />}
          dataSource={this.state.dataSource}
          renderRow={(rowData) => <Currency setActive={this.setActive} data={rowData} />}
          canLoadMore={!!this.state.nextUrl}
          onLoadMoreAsync={this.loadMoreData.bind(this)}
          enableEmptySections
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
