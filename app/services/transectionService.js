import BaseService from './baseService'

var transectionService = {
  getAllTransections: () => {
    return BaseService.get('transactions/')
  },

  getNextTransections: (url) => {
    return BaseService.getWithFullUrl(url)
  },

  sendMoney: (amount, reference, note) => {
    var data = {
      amount,
      reference,
      note,
    }
    return BaseService.post('transactions/transfer/', data)
  },

  withdraw: (token, amount, reference, successFunc, errorFunc) => {
    var data = {
      amount,
      reference,
    }
    return BaseService.post('transactions/withdraw/', data)
  },
}

export default transectionService
