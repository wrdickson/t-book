import axios from 'axios'

const rootSpaces = {
  getRootSpaces: ( token ) => {
    const promise = axios({
      method: 'post',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Jwt': token
      },
      url: '/api-book/root-spaces'
    })
    return promise
  }
}

export default rootSpaces