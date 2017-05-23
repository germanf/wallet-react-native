import React from 'react'
import {ScrollView, View, StyleSheet} from 'react-native'
import {DrawerNavigator, DrawerItems} from 'react-navigation'
import Home from './home'
import Deposit from './../deposit/index'
import Settings from './../settings/index'
import Withdraw from './../withdraw/index'
import About from './../about/index'
import Logout from './../auth/logout'
import Accounts from './../accounts/index'
import DrawerHeader from './../../components/drawerHeaderComponent'
import DrawerButton from './../../components/DrawerButton'

const RouteConfigs = {
  Home: {
    screen: Home,
  },
  Deposit: {
    screen: Deposit,
  },
  Settings: {
    screen: Settings,
  },
  Withdraw: {
    screen: Withdraw,
  },
  Accounts: {
    screen: Accounts,
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
        labelStyle={{fontSize:18}}
      />
    </ScrollView>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2070A0',
  },
});

const App = DrawerNavigator(RouteConfigs, {
  drawerWidth: 280,
  navigationOptions : ({navigation}) => ({
    headerLeft: <DrawerButton navigation={navigation} />,
    headerStyle: {
      backgroundColor: '#2070A0',
    },
    headerTintColor: 'white',
  }),
  contentComponent: CustomDrawerContentComponent,
})

export default App
