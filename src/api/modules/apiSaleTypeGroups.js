import axios from 'axios'

const saleTypeGroups = {

  getSaleTypeGroups: ( token ) => {
    const request = axios({
      method: 'post',
      headers: {
        'Jwt': token
      },
      data: {
        a: 1
      },
      url: '/api-book/sale-type-groups/get-all/'
    })
    return request
  }

}

export default saleTypeGroups