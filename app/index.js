import {StackNavigator} from 'react-navigation'
import Home from './screens/home/index'
import Login from './screens/auth/login'
import Signup from './screens/auth/signup'
import ForgetPassword from './screens/auth/forgetPassword'
import BankAccounts from './screens/withdraw/bankAccounts'
import BitcoinAddresses from './screens/withdraw/bitcoinAddresses'
import WithdrawalAmountEntry from './screens/withdraw/amountEntry'
import AddBankAccount from './screens/withdraw/addBankAccount'
import AddBitcoinAddress from './screens/withdraw/addBitcoinAddress'
import SendMoney from './screens/transfer/amountEntry'
import SendTo from './screens/transfer/sendTo'
import AccountCurrencies from './screens/accounts/accountCurrencies'
import SettingsProfileImage from './screens/settings/profileImage'
import SettingsPersonalDetails from './screens/settings/personalDetails'
import SettingsMobileNumbers from './screens/settings/mobileNumbers/index'
import AddMobileNumber from './screens/settings/mobileNumbers/addMobileNumber'
import VerifyMobileNumber from './screens/settings/mobileNumbers/verifyMobile'
import SettingsEmailAddresses from './screens/settings/emailAddresses/index'
import AddEmailAddress from './screens/settings/emailAddresses/addEmailAddress'
import SettingsGetVerified from './screens/settings/getVerified'
import SettingsAddress from './screens/settings/address'
import SettingsBankAccounts from './screens/settings/bankAccounts'
import SettingsBitcoinAddresses from './screens/settings/bitcoinAddresses'
import SettingsCards from './screens/settings/cards'
import SettingsSecurity from './screens/settings/security'
import SettingsNotifications from './screens/settings/notifications'

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
  AddBitcoinAddress: {
    screen: AddBitcoinAddress,
  },
  SendMoney: {
    screen: SendMoney,
  },
  SendTo: {
    screen: SendTo,
  },
  AccountCurrencies: {
    screen: AccountCurrencies,
  },
  SettingsProfileImage: {
    screen: SettingsProfileImage,
  },
  SettingsPersonalDetails: {
    screen: SettingsPersonalDetails,
  },
  SettingsMobileNumbers: {
    screen: SettingsMobileNumbers,
  },
  AddMobileNumber: {
    screen: AddMobileNumber,
  },
  VerifyMobileNumber: {
    screen: VerifyMobileNumber,
  },
  SettingsEmailAddresses: {
    screen: SettingsEmailAddresses,
  },
  AddEmailAddress: {
    screen: AddEmailAddress,
  },
  SettingsGetVerified: {
    screen: SettingsGetVerified,
  },
  SettingsAddress: {
    screen: SettingsAddress,
  },
  SettingsBankAccounts: {
    screen: SettingsBankAccounts,
  },
  SettingsBitcoinAddresses: {
    screen: SettingsBitcoinAddresses,
  },
  SettingsCards: {
    screen: SettingsCards,
  },
  SettingsSecurity: {
    screen: SettingsSecurity,
  },
  SettingsNotifications: {
    screen: SettingsNotifications,
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
