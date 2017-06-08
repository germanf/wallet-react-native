var baseUrl = 'https://rehive.com/api/3/'

var baseService = {

  get: (endPoint, headers, successFunc, errorFunc) => {
    fetch(baseUrl + endPoint, {
        method: 'GET',
        headers,
      })
      .then((response) => response.json())
      .then((responseJson) => {
        successFunc(responseJson)
      })
      .catch((error) => {
        errorFunc(error)
      })
  },

  getWithFullUrl: (url, headers, successFunc, errorFunc) => {
    fetch(url, {
        method: 'GET',
        headers,
      })
      .then((response) => response.json())
      .then((responseJson) => {
        successFunc(responseJson)
      })
      .catch((error) => {
        errorFunc(error)
      })
  },

  post: (endPoint, headers, body, successFunc, errorFunc) => {
    fetch(baseUrl + endPoint, {
        method: 'POST',
        headers,
        body,
      })
      .then((response) => response.json())
      .then((responseJson) => {
        successFunc(responseJson)
      })
      .catch((error) => {
        errorFunc(error)
      })
  },

  postWithoutBody: (endPoint, headers, successFunc, errorFunc) => {
    fetch(baseUrl + endPoint, {
        method: 'POST',
        headers,
      })
      .then((response) => response.json())
      .then((responseJson) => {
        successFunc(responseJson)
      })
      .catch((error) => {
        errorFunc(error)
      })
  },

  patch: (endPoint, headers, body, successFunc, errorFunc) => {
    fetch(baseUrl + endPoint, {
        method: 'GET',
        headers,
        body,
      })
      .then((response) => response.json())
      .then((responseJson) => {
        successFunc(responseJson)
      })
      .catch((error) => {
        errorFunc(error)
      })
  },
}

export default baseService
