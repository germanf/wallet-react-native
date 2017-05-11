import {StackNavigator } from 'react-navigation'
import Home from './screens/home'
import Login from './screens/login'
import Signup from './screens/signup'

const RouteConfigs = {
  Login: {
    screen: Login,
  },
  Signup: {
    screen: Signup,
  },
  Home: {
    screen: Home,
  },
}

const App = StackNavigator(RouteConfigs);

export default App
