import axios from 'axios'

const reservations = {
  checkAvailabilityByDates: (start, end, token) => {
    const promise = axios({
      method: 'post',
      headers: {
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

  checkAvailabilityByDatesIgnoreRes: (resId, start, end, token) => {
    const promise = axios({
      method: 'post',
      headers: {
        'Jwt': token
      },
      data: {
        'res_id': resId,
        'start_date': start,
        'end_date': end
      },
      url: '/api-book/reservations/range-ignore-res'
    })
    return promise
  },

  checkConflicts ( start, end, spaceId, token ) {
    const promise = axios({
      method: 'post',
      headers: {
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

  
  /**
    *@param token string
    *@param spaceId int
    *@param checkin date/string
    *@param checkout date/string
    *@param customer int
    *@param people int
    *@param beds int
  */
  createReservation ( token, checkin, checkout, customer, spaceId, people, beds ) {
    const promise = axios({
      headers: {
        Jwt: token
      },
      data: {
        checkin: checkin,
        checkout: checkout,
        customer: customer,
        space_id: spaceId,
        people: people,
        beds: beds
      },
      method: 'post',
      url: '/api-book/reservations/'
    })
    return promise
  },

  getReservationsByRange ( startDate, endDate, token ) {
    const request = axios({
      method: 'post',
      headers: {
        'Jwt': token
      },
      data: {
        startDate: startDate,
        endDate: endDate
      },
      url: '/api-book/reservations/range/'
    })
    return request
  },

  modifyReservation1 ( resObj, token ) {
    const request = axios({
      method: 'post',
      headers: {
        'Jwt': token
      },
      data: {
        res_obj: resObj
      },
      url: '/api-book/reservations/update/'
    })
    return request
  },

  reservationCheckin ( resId, token ) {
    const request = axios({
      method: 'post',
      headers: {
        'Jwt': token
      },
      data: {
        res_id: resId
      },
      url: '/api-book/reservations/checkin/'
    })
    return request
  },

  reservationCheckout ( resId, token ) {
    const request = axios({
      method: 'post',
      headers: {
        'Jwt': token
      },
      data: {
        res_id: resId
      },
      url: '/api-book/reservations/checkout/'
    })
    return request
  }
}

export default reservations
