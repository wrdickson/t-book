import { defineStore } from 'pinia'
import dayjs from 'dayjs'

export const resViewStore = defineStore({
  id: 'resViewStore',
  state: () => ({
    startDate: dayjs().format('YYYY-MM-DD')
  }),
  actions: {
    setStartDate ( startDate ) {
      this.startDate = startDate
    }
  }
})