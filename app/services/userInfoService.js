import BaseService from './baseService'

var UserInfoService = {
  getCompany: () => {
    return BaseService.get('company/')
  },

  getDepositInfo: () => {
    return BaseService.get('company/bank/')
  },

  getActiveAccount: () => {
    return BaseService.get('accounts/?active=true')
  },
}

export default UserInfoService
