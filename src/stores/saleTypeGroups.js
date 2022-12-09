import { defineStore } from 'pinia'

export const saleTypeGroupsStore = defineStore({
  id: 'saleTypeGroupsStore',
  state: () => ({
    saleTypeGroups: null
  }),
  actions: {
    setSaleTypeGroups ( saleTypeGroups ) {
      this.saleTypeGroups = saleTypeGroups
    }
  }

})
