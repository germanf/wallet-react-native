import React from 'react'
import { ScrollView, View, StyleSheet } from 'react-native'
import { DrawerNavigator, DrawerItems } from 'react-navigation'
import Home from './../screens/home/home'
import Deposit from './../screens/deposit/index'
import Settings from './../screens/settings/index'
import Withdraw from './../screens/withdraw/index'
import About from './../screens/about/index'
import Logout from './../screens/auth/logout'
import Accounts from './../screens/accounts/index'
import Receive from './../screens/receive/index'
import Promotions from './../screens/promotions/index'
import DrawerButton from './../components/drawerButton'
import DrawerHeader from './../components/drawerHeaderComponent'

const RouteConfigs = {
  Home: {
    screen: Home,
  },
  Deposit: {
    screen: Deposit,
  },
  Withdraw: {
    screen: Withdraw,
  },
  Receive: {
    screen: Receive,
  },
  Accounts: {
    screen: Accounts,
  },
  Promotions: {
    screen: Promotions,
  },
  Settings: {
    screen: Settings,
  },
  About: {
    screen: About,
  },
  Logout: {
    screen: Logout,
  },
}

const CustomDrawerContentComponent = (props) => (
  <View style={styles.container}>
    <DrawerHeader />
    <ScrollView>
      <DrawerItems
        {...props}
        activeTintColor="white"
        activeBackgroundColor="#207080"
        inactiveTintColor="white"
        inactiveBackgroundColor="transparent"
        labelStyle={{ fontSize: 18, margin: 10, paddingLeft: 5 }}
      />
    </ScrollView>
  </View>
)

export default DrawerNavigator(RouteConfigs, {
  drawerWidth: 300,
  initialRouteName: 'Home',
  navigationOptions: ({ navigation }) => ({
    headerLeft: <DrawerButton navigation={navigation} />,
    headerStyle: {
      backgroundColor: '#2070A0',
    },
    headerTintColor: 'white',
  }),
  contentComponent: CustomDrawerContentComponent,
})

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2070A0',
  },
})