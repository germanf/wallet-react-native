import { StackNavigator } from 'react-navigation'
import Expo from 'expo'
import Home from './drawerNavigator'
import Login from './../screens/auth/login'
import Signup from './../screens/auth/signup'
import ForgetPassword from './../screens/auth/forgetPassword'
import BankAccounts from './../screens/withdraw/bankAccounts'
import BitcoinAddresses from './../screens/withdraw/bitcoinAddresses'
import WithdrawalAmountEntry from './../screens/withdraw/amountEntry'
import SendMoney from './../screens/transfer/amountEntry'
import SendTo from './../screens/transfer/sendTo'
import QRcodeScanner from './../screens/transfer/qrcodeScanner'
import AccountCurrencies from './../screens/accounts/accountCurrencies'
import SettingsProfileImage from './../screens/settings/profileImage/index'
import UploadImage from './../screens/settings/profileImage/uploadImage'
import SettingsPersonalDetails from './../screens/settings/personalDetails'
import SettingsMobileNumbers from './../screens/settings/mobileNumbers/mobileNumbers'
import AddMobileNumber from './../screens/settings/mobileNumbers/addMobileNumber'
import VerifyMobileNumber from './../screens/settings/mobileNumbers/verifyMobile'
import SettingsEmailAddresses from './../screens/settings/emailAddresses/emailAddresses'
import AddEmailAddress from './../screens/settings/emailAddresses/addEmailAddress'
import SettingsGetVerified from './../screens/settings/getVerified'
import SettingsAddress from './../screens/settings/address'
import SettingsBankAccounts from './../screens/settings/bankAccounts/index'
import SettingsBitcoinAddresses from './../screens/settings/bitcoinAddresses/index'
import AddBankAccount from './../screens/settings/bankAccounts/addBankAccount'
import EditBankAccount from './../screens/settings/bankAccounts/editBankAccount'
import AddBitcoinAddress from './../screens/settings/bitcoinAddresses/addBitcoinAddress'
import EditBitcoinAddress from './../screens/settings/bitcoinAddresses/editBitcoinAddress'
import SettingsCards from './../screens/settings/cards'
import SettingsSecurity from './../screens/settings/security'
import SettingsNotifications from './../screens/settings/notifications'

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
  SendMoney: {
    screen: SendMoney,
  },
  SendTo: {
    screen: SendTo,
  },
  QRcodeScanner: {
    screen: QRcodeScanner,
  },
  AccountCurrencies: {
    screen: AccountCurrencies,
  },
  SettingsProfileImage: {
    screen: SettingsProfileImage,
  },
  UploadImage: {
    screen: UploadImage,
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
  AddBankAccount: {
    screen: AddBankAccount,
  },
  EditBankAccount: {
    screen: EditBankAccount,
  },
  AddBitcoinAddress: {
    screen: AddBitcoinAddress,
  },
  EditBitcoinAddress: {
    screen: EditBitcoinAddress,
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

export default StackNavigator(RouteConfigs, {
  navigationOptions: {
    headerStyle: {
      backgroundColor: '#2070A0',
      paddingTop: Expo.Constants.statusBarHeight,
      height: 50 + Expo.Constants.statusBarHeight,
      borderColor: '#2070A0',
      shadowOpacity: 0,
      shadowOffset: {
        height: 0,
      },
      elevation: 0,
    },
    headerTintColor: 'white',
  },
})
