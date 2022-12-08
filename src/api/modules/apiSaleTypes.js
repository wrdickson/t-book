import axios from 'axios'

const saleTypes = {

  getSaleTypes: ( token ) => {
    const request = axios({
      method: 'post',
      headers: {
        'Jwt': token
      },
      data: {
        a: 1
      },
      url: '/api-book/sale-types/get-all/'
    })
    return request
  }

}

export default saleTypes