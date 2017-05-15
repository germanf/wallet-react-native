import {StackNavigator} from 'react-navigation'
import Home from './screens/home'
import Login from './screens/login'
import Signup from './screens/signup'
import ForgetPassword from './screens/forgetPassword'

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
          backgroundColor: 'dodgerblue',
      },
      headerTintColor: 'white',
    },
});

export default App
