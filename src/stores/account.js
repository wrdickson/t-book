import { defineStore } from 'pinia'

export const accountStore = defineStore({
  id: 'account',
  state: () => ({
    account: {
      id: '0',
      username: 'Guest',
      permission: '0',
      roles: []
    },
    //  super important that this is null
    //  app won't mount until it is set to a user
    //  or to a guest ( where token is 0, not null)
    token: null
  }),
  actions: {
    setAccount ( account ) {
      this.account = account
      localStorage.setItem('account', JSON.stringify(account))
    },
    setAccountToGuest () {
      this.account = {
        id: '0',
        username: 'Guest',
        permission: '0',
        roles: []
      }
      //  note that we set the store token to 0 while
      //  we set localstorage token to null
      this.token = 0
      localStorage.setItem('account', null)
      localStorage.setItem('token', null)
    },
    setToken ( token ) {
      this.token = token
      localStorage.setItem('token', token)
    }
  }
})