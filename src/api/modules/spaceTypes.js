import axios from 'axios'

const spaceTypes = {
  getSpaceTypes: (  ) => {
    const promise = axios({
      method: 'get',
      url: '/api-book/space-types'
    })
    return promise
  }
}

export default spaceTypes