import BaseService from './baseService'

var transectionService = {
  getHeaders: (token) => {
    var headers = {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': 'Token ' + token,
    }

    return headers
  },

  getAllTransections: (token, successFunc, errorFunc) => {
    var headers = this.getHeaders(token)
    BaseService.get('transactions/', headers, successFunc, errorFunc)
  },

  getNextTransections: (url, token, successFunc, errorFunc) => {
    var headers = this.getHeaders(token)
    BaseService.getWithFullUrl(url, headers, successFunc, errorFunc)
  },
}

export default transectionService
