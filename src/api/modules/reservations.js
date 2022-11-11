import axios from 'axios'

const reservations = {
  getReservationsByRange ( startDate, endDate, token ) {
    const request = axios({
      method: 'post',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Jwt': token
      },
      data: {
        startDate: startDate,
        endDate: endDate
      },
      url: '/api-book/reservations/range/'
    })
    return request
  }
}

export default reservations
