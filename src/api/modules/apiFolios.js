import axios from 'axios'

const folios = {
  getFolio1: ( token, folioId ) => {
    const promise = axios({
      method: 'post',
      headers: {
        jwt: token
      },
      data: {
        folio_id: folioId
      },
      url: '/api-book/folios/get-folio-1'
    })
    return promise
  }
}

export default folios
