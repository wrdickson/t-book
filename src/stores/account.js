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
      this.token = null
      localStorage.setItem('account', null)
      localStorage.setItem('token', null)
    },
    setToken ( token ) {
      this.token = token
      localStorage.setItem('token', token)
    }
  }
})