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

  getAddress: () => {
    return BaseService.get('user/address/')
  },

  updateAddress: (data) => {
    return BaseService.patch('user/address/', data)
  },

  updateUserDetails: (data) => {
    return BaseService.patch('user/', data)
  },

  uploadProfileImage: (file) => {
    let formData = new FormData()
    formData.append('profile', file)
    return BaseService.fileUpload('user/', formData)
  },
}

export default UserInfoService
