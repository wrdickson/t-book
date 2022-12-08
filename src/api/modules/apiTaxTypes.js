import axios from 'axios'

const taxTypes = {

  getTaxTypes: ( token ) => {
    const request = axios({
      method: 'post',
      headers: {
        'Jwt': token
      },
      data: {
        a: 1
      },
      url: '/api-book/tax-types/get-all/'
    })
    return request
  }

}

export default taxTypes