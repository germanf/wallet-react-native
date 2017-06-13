import BaseService from './baseService'

var getHeaders = (token) => {
  var headers = {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'Authorization': 'Token ' + token,
  }

  return headers
}

var settingsService = {
  getAllBankAccounts: (token, successFunc, errorFunc) => {
    var headers = getHeaders(token)
    BaseService.get('user/bank_accounts/', headers, successFunc, errorFunc)
  },

  addBankAccount: (token, info, successFunc, errorFunc) => {
    var headers = getHeaders(token)
    var body = JSON.stringify(info)
    BaseService.post('user/bank_accounts/', headers, body, successFunc, errorFunc)
  },

  editBankAccount: (token, id, info, successFunc, errorFunc) => {
    var headers = getHeaders(token)
    var body = JSON.stringify(info)
    BaseService.patch('user/bank_accounts/' + id + '/', headers, body, successFunc, errorFunc)
  },

  getAllBitcoinAddresses: (token, successFunc, errorFunc) => {
    var headers = getHeaders(token)
    BaseService.get('user/bitcoin_accounts/', headers, successFunc, errorFunc)
  },

  addBitcoinAddresses: (token, info, successFunc, errorFunc) => {
    var headers = getHeaders(token)
    var body = JSON.stringify(info)
    BaseService.post('user/bitcoin_accounts/', headers, body, successFunc, errorFunc)
  },

  editBitcoinAddresses: (token, id, info, successFunc, errorFunc) => {
    var headers = getHeaders(token)
    var body = JSON.stringify(info)
    BaseService.patch('user/bitcoin_accounts/' + id + '/', headers, body, successFunc, errorFunc)
  },

  getAllMobiles: (token, successFunc, errorFunc) => {
    var headers = getHeaders(token)
    BaseService.get('user/mobiles/', headers, successFunc, errorFunc)
  },

  addMobile: (token, info, successFunc, errorFunc) => {
    var headers = getHeaders(token)
    var body = JSON.stringify(info)
    BaseService.post('user/mobiles/', headers, body, successFunc, errorFunc)
  },

  makeMobilePrimary: (token, id, info, successFunc, errorFunc) => {
    var headers = getHeaders(token)
    var body = JSON.stringify(info)
    BaseService.patch('user/mobiles/' + id + '/', headers, body, successFunc, errorFunc)
  },

  verifyMobile: (token, info, successFunc, errorFunc) => {
    var headers = getHeaders(token)
    var body = JSON.stringify(info)
    BaseService.post('auth/mobile/verify/', headers, body, successFunc, errorFunc)
  },

  resendMobileVerification: (token, info, successFunc, errorFunc) => {
    var headers = getHeaders(token)
    var body = JSON.stringify(info)
    BaseService.post('auth/mobile/verify/resend/', headers, body, successFunc, errorFunc)
  },

  deleteMobile: (token, id, successFunc, errorFunc) => {
    var headers = getHeaders(token)
    BaseService.delete('user/mobiles/' + id + '/', headers, successFunc, errorFunc)
  },

  getAllEmails: (token, successFunc, errorFunc) => {
    var headers = getHeaders(token)
    BaseService.get('user/emails/', headers, successFunc, errorFunc)
  },

  addEmail: (token, info, successFunc, errorFunc) => {
    var headers = getHeaders(token)
    var body = JSON.stringify(info)
    BaseService.post('user/emails/', headers, body, successFunc, errorFunc)
  },

  makeEmailPrimary: (token, id, info, successFunc, errorFunc) => {
    var headers = getHeaders(token)
    var body = JSON.stringify(info)
    BaseService.patch('user/emails/' + id + '/', headers, body, successFunc, errorFunc)
  },

  resendEmailVerification: (token, info, successFunc, errorFunc) => {
    var headers = getHeaders(token)
    var body = JSON.stringify(info)
    BaseService.post('auth/email/verify/resend/', headers, body, successFunc, errorFunc)
  },

  deleteEmail: (token, id, successFunc, errorFunc) => {
    var headers = getHeaders(token)
    BaseService.delete('user/emails/' + id + '/', headers, successFunc, errorFunc)
  },

  getAllNotifications: (token, successFunc, errorFunc) => {
    var headers = getHeaders(token)
    BaseService.get('user/notifications/', headers, successFunc, errorFunc)
  },

  changeStateOfEmailNotification: (token, id, info, successFunc, errorFunc) => {
    var headers = getHeaders(token)
    var body = JSON.stringify(info)
    BaseService.patch('user/notifications/' + id + '/', headers, body, successFunc, errorFunc)
  },

  changeStateOfMobileNotification: (token, id, info, successFunc, errorFunc) => {
    var headers = getHeaders(token)
    var body = JSON.stringify(info)
    BaseService.patch('user/notifications/' + id + '/', headers, body, successFunc, errorFunc)
  },
}

export default settingsService
