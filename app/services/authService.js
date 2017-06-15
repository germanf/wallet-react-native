import BaseService from './baseService'

var authService = {
  login: (data) => {
     return BaseService.post('auth/login/', data)
  },

  signup: (data) => {
    return BaseService.post('auth/register/', data)
  },

  logout: () => {
    return BaseService.postWithoutBody('auth/logout/')
  },

  forgetPassword: (data) => {
    return BaseService.post('auth/password/reset/', data)
  },
}

export default authService
