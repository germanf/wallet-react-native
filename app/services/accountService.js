import BaseService from './baseService'

var getHeaders = (token) => {
  var headers = {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'Authorization': 'Token ' + token,
  }

  return headers
}

var AccountService = {
  getAllAccounts: (token, successFunc, errorFunc) => {
    var headers = getHeaders(token)
    BaseService.get('accounts/', headers, successFunc, errorFunc)
  },

  getAllAccountCurrencies: (reference, token, successFunc, errorFunc) => {
    var headers = getHeaders(token)
    BaseService.get('accounts/' + reference + '/currencies/', headers, successFunc, errorFunc)
  },

  setActiveCurrency: (reference, code, token, successFunc, errorFunc) => {
    var headers = getHeaders(token)
    var body = JSON.stringify({"active": true})
    BaseService.put('accounts/' + reference + '/currencies/' + code + '/', headers, body, successFunc, errorFunc)
  },
}

export default AccountService
