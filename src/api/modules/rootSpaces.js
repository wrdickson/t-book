import axios from 'axios'

const rootSpaces = {

  createRootSpace: ( token, beds, childOf, displayOrder, people, showChildren, spaceType, title ) => {
    const promise = axios({
      method: 'post',
      headers: {
        'Jwt': token
      },
      data: {
        beds: beds,
        childOf: childOf,
        displayOrder: displayOrder,
        people: people,
        showChildren: showChildren,
        spaceType: spaceType,
        title: title
      },
      url: '/api-book/root-spaces-create'
    })
    return promise
  },

  getRootSpaces: ( token ) => {
    const promise = axios({
      method: 'post',
      headers: {
        'Jwt': token
      },
      url: '/api-book/root-spaces'
    })
    return promise
  },

  updateRootSpace( token, updateSpace ) {
    const promise = axios({
      method: 'put',
      headers: {
        'Jwt': token
      },
      dataType: 'json',
      data: {
        updateSpace, updateSpace
      },
      url: '/api-book/root-spaces'
    })
    return promise
  }
}

export default rootSpaces