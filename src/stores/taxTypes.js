import { defineStore } from 'pinia'

export const taxTypesStore = defineStore({
  id: 'taxTypesStore',
  state: () => ({
    taxTypes: null
  }),
  actions: {
    setTaxTypes ( taxTypes ) {
      this.taxTypes = taxTypes
    }
  }

})