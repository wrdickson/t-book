import axios from 'axios'

const engine = {
  aaa: ( jwt ) => {
    const promise = axios({
      headers: {
        jwt: jwt
      },
      method: 'post',
      url: '/api-ezbook/aaa/'
    })
    return promise
  },
  addReservation: (user, reservation) => {
    const promise = axios({
      data: {
        user: user,
        reservation: reservation
      },
      method: 'post',
      url: '/api-ezbook/reservations/'
    })
    return promise
  },
  addReservationNote: (user, reservationId, note) => {
    const promise = axios({
      data: {
        user: user,
        note: note
      },
      method: 'post',
      url: '/api-ezbook/reservationNotes/' + reservationId
    })
    return promise
  },
  checkAvailability: (resId, user, isNewReservation, start, end, spaceId, people, beds) => {
    const promise = axios({
      data: {
        res_id: resId,
        user: user,
        is_new_res: isNewReservation,
        start: start,
        end: end,
        space_id: spaceId,
        people: people,
        beds: beds
      },
      method: 'post',
      url: '/api-ezbook/checkAvailability/'
    })
    return promise
  },

  checkAvailabilityByDates: (start, end) => {
    const promise = axios({
      method: 'get',
      url: '/api-ezbook/availability/' + start + '/' + end
    })
    return promise
  },

  checkAvailabilityByDatesNoRes: (start, end, resId) => {
    const promise = axios({
      method: 'get',
      url: '/api-ezbook/availabilitynores/' + start + '/' + end + '/' + resId
    })
    return promise
  },

  checkinReservation: (user, resId) => {
    const promise = axios({
      data: {
        user: user,
        resId: resId
      },
      method: 'put',
      url: '/api-ezbook/reservation/checkin/' + resId
    })
    return promise
  },
  checkoutReservation: (user, resId) => {
    const promise = axios({
      data: {
        user: user,
        resId: resId
      },
      method: 'put',
      url: '/api-ezbook/reservation/checkout/' + resId
    })
    return promise
  },
  createAccount: ( obj, jwt ) => {
    const promise = axios({
      headers: {
        jwt: jwt
      },
      data: {
        newAccountObj: obj
      },
      method: 'post',
      url: '/api-ezbook/account/'
    })
    return promise
  },
  createCustomer: (customerObj, jwt) => {
    const promise = axios({
      headers: {
        jwt: jwt
      },
      data: {
        customerObject: customerObj
      },
      method: 'post',
      url: '/api-ezbook/customers/'
    })
    return promise
  },
  createReservation: ( newResObj, jwt ) => {

  },
  createSpace: (spaceData, jwt) => {
    const promise = axios({
      headers: {
        jwt: jwt  
      },
      data: {
        newRootSpace: spaceData
      },
      method: 'post',
      url: '/api-ezbook/spaces/'
    })
    return promise
  },
  deleteSpace: (spaceId, jwt) => {
    const promise = axios({
      headers: {
        jwt: jwt  
      },
      data: {
        spaceId: spaceId
      },
      method: 'delete',
      url: '/api-ezbook/spaces/' + spaceId
    })
    return promise
  },
  
  getAllAccounts ( jwt ) {
    const request = axios({
      headers: {
        jwt: jwt
      },
      method: 'post',
      url: 'api-ezbook/accounts/'
    })
    return request
  },
  getAllCustomers ( jwt ) {
    const request = axios({
      headers: {
        jwt: jwt  
      },
      method: 'post',
      url: '/api-ezbook/allCustomers/'
    })
    return request
  },
  getFolio: (user, folioId) => {
    const request = axios({
      data: {
        user: user
      },
      method: 'post',
      url: '/api-ezbook/folios/' + folioId
    })
    return request
  },
  getReservation: (id) => {
    const request = axios({
      method: 'get',
      url: '/api-ezbook/reservations/' + id
    })
    return request
  },
  getReservations: () => {
    const request = axios({
      method: 'get',
      url: '/api-ezbook/reservations/'
    })
    return request
  },

  getReservationsByRange: ( startDate, endDate, jwt ) => {
    console.log('s', startDate, 'e', endDate)
    const request = axios({
      headers: {
        jwt: jwt
      },
      data: {
        startDate: startDate,
        endDate: endDate
      },
      dataType: 'json',
      method: 'post',
      url: '/api-ezbook/reservations-range/'
    })
    return request
  },

  getRootSpaces: ( jwt ) => {
    const request = axios({
      headers: {
        jwt: jwt  
      },
      method: 'get',
      url: '/api-ezbook/root-spaces/'
    })
    return request
  }, 

  getSpaceData: () => {
    return axios.all([axios.get('/api/spaces/'), axios.get('api/types/')])
      .then(axios.spread(function (spaces, types) {
        return {
          spaces: spaces,
          types: types
        }
      }))
  },
  getSelectGroups: () => {
    return axios({
      method: 'get',
      url: '/api-ezbook/selectGroups/'
    })
  },
  getSpaceTypes: () => {
    return axios({
      method: 'get',
      url: '/api-ezbook/types/'
    })
  },
  getTaxTypes: () => {
    return axios({
      method: 'get',
      url: '/api-ezbook/tax-types/'
    })
  },
  searchCustomers: (lastName, firstName, jwt) => {
    const request = axios({
      headers: {
        jwt: jwt
      },
      method: 'post',
      data: {
        lastName: lastName,
        firstName: firstName
      },
      url: '/api-ezbook/search-customers/'
    })
    return request
  },
  updateAccountInfo: (accountObj, jwt) => {
    const request = axios({
      headers: {
        jwt: jwt
      },
      method: 'put',
      data: {
        accountObj: accountObj
      },
      url: '/api-ezbook/accounts/' + accountObj.id
    })
    return request
  },
  updateAccountPassword: ( accountId, newPassword, jwt ) => {
    const request = axios({
      headers: {
        jwt: jwt
      },
      data: {
        newP: newPassword
      },
      method: 'put',
      url: '/api-ezbook/account-pwd/' + accountId
    })
    return request
  },
  updateCustomer: (args) => {
    const request = axios({
      url: '/api-ezbook/customers/' + args.id,
      data: args,
      method: 'post'
    })
    return request
  },
  updateReservation: (jwt, id, checkin, checkout, spaceId, people, beds, folio, status, customer) => {
    const request = axios({
      url: '/api-ezbook/reservations/' + id,
      headers: {
        jwt: jwt
      },
      data: {
        id: id,
        checkin: checkin,
        checkout: checkout,
        space_id: spaceId,
        people: people,
        beds: beds,
        folio: folio,
        status: status,
        customer: customer

      },
      method: 'put'
    })
    return request
  },
  updateSpace: ( space, jwt ) => {
    const request = axios({
      url: '/api-ezbook/root-spaces/' + space.id,
      method: 'put',
      headers: {
        jwt: jwt
      },
      data: {
        updateRootSpace: space
      }

    })
    return request
  }
}
export default engine
