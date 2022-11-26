import axios from 'axios'

const account = {
  
  login: (username, password) => {
    const request = axios({
      method: 'post',
      data: {
        username: username,
        password: password
      },
      url: '/api-book/login'
    })
    return request
  },
  createAccount: ( obj, token ) => {
    const request = axios({
      method: 'post',
      headers: {
        'Jwt': token
      },
      data: {
        newAccountObj: obj
      },
      url: '/api-ezbook/accounts/'
    })
    return request
  },
  authorizeToken: (token) => {
    const request = axios({
      method: 'post',
      headers: { 
        'Jwt': token
      },
      url: '/api-book/authorize-token/'
    })
    return request
  }
}
export default account
