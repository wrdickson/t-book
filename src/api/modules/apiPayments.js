import axios from 'axios'

const payments = {
  postQuickFolioSale ( obj, token  ) {
    const promise = axios({
      method: 'post',
      url: '/api-book/payments/quick-folio-sale',
      headers: {
        'jwt': token
      },
      data: obj
    })
    return promise

  }


}

export default payments