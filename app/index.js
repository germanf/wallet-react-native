import {StackNavigator} from 'react-navigation'
import Home from './screens/home/index'
import Login from './screens/auth/login'
import Signup from './screens/auth/signup'
import ForgetPassword from './screens/auth/forgetPassword'

const RouteConfigs = {
  Login: {
    screen: Login,
  },
  Signup: {
    screen: Signup,
  },
  ForgetPassword: {
    screen: ForgetPassword,
  },
  Home: {
    screen: Home,
  },
}

const App = StackNavigator(RouteConfigs, {
    navigationOptions : {
      headerStyle: {
          backgroundColor: '#2070A0',
      },
      headerTintColor: 'white',
    },
});

export default App
