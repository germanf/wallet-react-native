import BaseService from './baseService'

var settingsService = {
  getAllBankAccounts: () => {
    return BaseService.get('user/bank_accounts/')
  },

  addBankAccount: (data) => {
    return BaseService.post('user/bank_accounts/', data)
  },

  editBankAccount: (id, data) => {
    return BaseService.patch('user/bank_accounts/' + id + '/', data)
  },

  getAllBitcoinAddresses: () => {
    return BaseService.get('user/bitcoin_accounts/')
  },

  addBitcoinAddresses: (data) => {
    return BaseService.post('user/bitcoin_accounts/', data)
  },

  editBitcoinAddresses: (id, data) => {
    return BaseService.patch('user/bitcoin_accounts/' + id + '/', data)
  },

  getAllMobiles: () => {
    return BaseService.get('user/mobiles/')
  },

  addMobile: (data) => {
    return BaseService.post('user/mobiles/', data)
  },

  makeMobilePrimary: (id, data) => {
    return BaseService.patch('user/mobiles/' + id + '/', data)
  },

  verifyMobile: (data) => {
    return BaseService.post('auth/mobile/verify/', data)
  },

  resendMobileVerification: (data) => {
    return BaseService.post('auth/mobile/verify/resend/', data)
  },

  deleteMobile: (id) => {
    return BaseService.delete('user/mobiles/' + id + '/')
  },

  getAllEmails: () => {
    return BaseService.get('user/emails/')
  },

  addEmail: (data) => {
    return BaseService.post('user/emails/', data)
  },

  makeEmailPrimary: (id, data) => {
    return BaseService.patch('user/emails/' + id + '/', data)
  },

  resendEmailVerification: (data) => {
    return BaseService.post('auth/email/verify/resend/', data)
  },

  deleteEmail: (id) => {
    return BaseService.delete('user/emails/' + id + '/')
  },

  getAllNotifications: () => {
    return BaseService.get('user/notifications/')
  },

  changeStateOfNotification: (id, data) => {
    return BaseService.patch('user/notifications/' + id + '/', data)
  },
}

export default settingsService
