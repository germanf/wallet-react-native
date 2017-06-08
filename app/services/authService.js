import BaseService from './baseService'

var authService = {
  login: (body, successFunc, errorFunc) => {
    var headers = {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    }
    BaseService.post('auth/login/', headers, body, successFunc, errorFunc)
  },

  signup: (body, successFunc, errorFunc) => {
    var headers = {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    }
    BaseService.post('auth/register/', headers, body, successFunc, errorFunc)
  },

  logout: (token, successFunc, errorFunc) => {
    var headers = {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': 'Token ' + token,
    }
    BaseService.postWithoutBody('auth/logout/', headers, successFunc, errorFunc)
  },

  forgetPassword: (body, successFunc, errorFunc) => {
    var headers = {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    }
    BaseService.post('auth/password/reset/', headers, body, successFunc, errorFunc)
  },
}

export default authService
