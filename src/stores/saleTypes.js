import { defineStore } from 'pinia'

export const saleTypesStore = defineStore({
  id: 'saleTypesStore',
  state: () => ({
    saleTypes: null
  }),
  actions: {
    setSaleTypes ( saleTypes ) {
      this.saleTypes = saleTypes
    }
  }

})