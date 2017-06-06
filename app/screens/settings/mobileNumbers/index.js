import React, {Component} from 'react'
import {View, StyleSheet, ListView, Alert, AsyncStorage, TouchableHighlight, Text, RefreshControl} from 'react-native'
import {NavigationActions} from 'react-navigation'
import Spinner from 'react-native-loading-spinner-overlay'
import MobileNumber from './mobileNumberComponent'

export default class Settings extends Component {
  static navigationOptions = {
    title: 'Mobile Numbers',
  }

  constructor(props) {
    super(props);
    this.state = {
      refreshing: false,
      loading: false,
      loadingMessage: "",
      dataSource: new ListView.DataSource({
        rowHasChanged: (r1, r2) => JSON.stringify(r1) !== JSON.stringify(r2),
      }),
    }
  }

  componentWillMount() {
    this.getData()
  }

  getData = async () => {
    this.setState({refreshing: true})
    const value = await AsyncStorage.getItem('token');
    fetch('https://www.rehive.com/api/3/user/mobiles/', {
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
          const data = responseJson.data;
          console.log(data)
          let ids = data.map((obj, index) => index);
          this.setState({
            refreshing: false,
            dataSource: ds.cloneWithRows(data, ids),
          })
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
          action: NavigationActions.navigate({ routeName: 'Settings'}),
        }),
        NavigationActions.navigate({ routeName: 'SettingsMobileNumbers'}),
      ],
    })
    this.props.navigation.dispatch(resetAction)
  }

  makePrimary = async (id) => {
    this.setState({
      loading:true,
      loadingMessage: 'Updating...',
    })
    const value = await AsyncStorage.getItem('token');
    fetch('https://rehive.com/api/3/user/mobiles/' + id + '/', {
        method: 'PATCH',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': 'Token ' + value,
        },
        body: JSON.stringify({
          primary: true,
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

  verify = async(number) => {
    this.setState({
      loading:true,
      loadingMessage: 'Sending Verification Code...',
    })
    const value = await AsyncStorage.getItem('token');
    const userData = await AsyncStorage.getItem('user')

    const user = JSON.parse(userData)

    fetch('https://www.rehive.com/api/3/auth/mobile/verify/resend/', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': 'Token ' + value,
        },
        body: JSON.stringify({
          identifier: number,
          company_id: user.company,
      }),
      })
      .then((response) => response.json())
      .then((responseJson) => {
        if (responseJson.status === "success") {
          this.setState({loading: false})
          this.props.navigation.navigate("VerifyMobileNumber")
        }
      })
      .catch((error) => {
        Alert.alert('Error',
            error,
            [{text: 'OK'}])
      })
  }

  delete = async(id) => {
    this.setState({
      loading:true,
      loadingMessage: 'Deleting...',
    })
    const value = await AsyncStorage.getItem('token');
    fetch('https://rehive.com/api/3/user/mobiles/' + id + '/', {
        method: 'DELETE',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': 'Token ' + value,
        },
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
        <Spinner
          visible={this.state.loading}
          textContent={this.state.loadingMessage}
          textStyle={{color: '#FFF'}}
        />
        <ListView
          refreshControl={<RefreshControl refreshing={this.state.refreshing} onRefresh={this.getData.bind(this)} />}
          dataSource={this.state.dataSource}
          renderRow={(rowData) => <MobileNumber mobile={rowData} makePrimary={this.makePrimary} verify={this.verify} delete={this.delete} reload={this.reload} />}
        />
        <TouchableHighlight
          style={styles.submit}
          onPress={() => this.props.navigation.navigate("AddMobileNumber")}>
          <Text style={{color:'white', fontSize:20}}>
            Add Mobile Number
          </Text>
        </TouchableHighlight>
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
  submit: {
    padding: 10,
    height: 70,
    backgroundColor: '#2070A0',
    width: "100%",
    alignSelf: 'stretch',
    alignItems: 'center',
    justifyContent:'center',
  },
})
