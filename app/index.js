import {StackNavigator} from 'react-navigation'
import Home from './screens/home/index'
import Login from './screens/auth/login'
import Signup from './screens/auth/signup'
import ForgetPassword from './screens/auth/forgetPassword'
import BankAccounts from './screens/withdraw/bankAccounts'
import BitcoinAddresses from './screens/withdraw/bitcoinAddresses'
import WithdrawalAmountEntry from './screens/withdraw/amountEntry'
import AddBankAccount from './screens/settings/addBankAccount'

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
  BankAccounts: {
    screen: BankAccounts,
  },
  BitcoinAddresses: {
    screen: BitcoinAddresses,
  },
  WithdrawalAmountEntry: {
    screen: WithdrawalAmountEntry,
  },
  AddBankAccount: {
    screen: AddBankAccount,
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
