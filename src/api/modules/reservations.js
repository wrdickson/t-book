import axios from 'axios'

const reservations = {
  checkAvailabilityByDates: (start, end, token) => {
    const promise = axios({
      method: 'post',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Jwt': token
      },
      data: {
        'startDate': start,
        'endDate': end
      },
      url: '/api-book/reservations/availability'
    })
    return promise
  },

  checkConflicts ( start, end, spaceId, token ) {
    const promise = axios({
      method: 'post',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Jwt': token
      },
      data: {
        'startDate': start,
        'endDate': end,
        'spaceId': spaceId
      },
      url: '/api-book/reservations/conflicts'
    })
    return promise
  },
  /*
  *@param spaceId int
  *@param checkin date/string
  *@param checkout date/string
  *@param customer int
  *@param people int
  *@param beds int
  */

  createReservation ( checkin, checkout, customer, spaceId, people, beds) {

  },

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
