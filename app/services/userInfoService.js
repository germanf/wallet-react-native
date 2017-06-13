import BaseService from './baseService'

var getHeaders = (token) => {
  var headers = {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'Authorization': 'Token ' + token,
  }

  return headers
}

var UserInfoService = {
  getCompany: (token, successFunc, errorFunc) => {
    var headers = getHeaders(token)
    BaseService.get('company/', headers, successFunc, errorFunc)
  },

  getDepositInfo: (token, successFunc, errorFunc) => {
    var headers = getHeaders(token)
    BaseService.get('company/bank/', headers, successFunc, errorFunc)
  },
}

export default UserInfoService
