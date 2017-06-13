import BaseService from './baseService'

var getHeaders = (token) => {
  var headers = {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'Authorization': 'Token ' + token,
  }

  return headers
}

var transectionService = {
  getAllTransections: (token, successFunc, errorFunc) => {
    var headers = getHeaders(token)
    BaseService.get('transactions/', headers, successFunc, errorFunc)
  },

  getNextTransections: (url, token, successFunc, errorFunc) => {
    var headers = getHeaders(token)
    BaseService.getWithFullUrl(url, headers, successFunc, errorFunc)
  },

  sendMoney: (token, amount, reference, note, successFunc, errorFunc) => {
    var headers = getHeaders(token)
    var body = JSON.stringify({
      amount,
      reference,
      note,
    })
    BaseService.post('transactions/transfer/', headers, body, successFunc, errorFunc)
  },

  withdraw: (token, amount, reference, successFunc, errorFunc) => {
    var headers = getHeaders(token)
    var body = JSON.stringify({
      amount,
      reference,
    })
    BaseService.post('transactions/withdraw/', headers, body, successFunc, errorFunc)
  },
}

export default transectionService
