import { defineStore } from 'pinia'

export const paymentTypesStore = defineStore({
  id: 'paymentTypesStore',
  state: () => ({
    activePaymentTypes: null
  }),
  actions: {
    setActivePaymentTypes ( activePaymentTypes ) {
      this.activePaymentTypes = activePaymentTypes
    }
  }

})