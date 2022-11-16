import axios from 'axios'

const customers = {
  searchCustomers: (lastName, firstName, token, offset, limit) => {
    const request = axios({
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Jwt': token
      },
      method: 'post',
      data: {
        lastName: lastName,
        firstName: firstName,
        offset: offset,
        limit: limit
      },
      url: '/api-book/customers/search'
    })
    return request
  }
}

export default customers