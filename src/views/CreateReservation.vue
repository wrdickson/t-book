<template>
  CreateReservation
  <DateRangePicker @dateRangePicker:rangeSelected="dRangeSelected"></DateRangePicker>
  <RootSpacePicker 
    v-if="availableSpaceIds"
    :availableSpaceIds="availableSpaceIds">
  </RootSpacePicker>
</template>

<script>
  import DateRangePicker from '/src/components/dateRangePicker.vue'
  import RootSpacePicker from '/src/components/rootSpacePicker.vue'
  import { accountStore } from '/src/stores/account.js'
  import api from '/src/api/api.js'
  import dayjs from 'dayjs'

  export default {
    name: 'CreateReservation',
    components: {
      DateRangePicker,
      RootSpacePicker
    },
    data() {
      return {
        availableSpaceIds: null,
        startDate: null,
        endDate: null
      }
    },
    computed: {
      fStartDate () {
        if(this.startDate) {
          return dayjs(this.startDate).format('YYYY-MM-DD')
        } else {
          return null
        }
      },
      fEndDate () {
        if(this.endDate) {
          return dayjs(this.endDate).format('YYYY-MM-DD')
        } else {
          return null
        }
      },
      token () {
        return accountStore().token
      }
    },
    methods: {
      dRangeSelected ( range ) {
      this.startDate = range[0]
      this.endDate = range[1]
      api.reservations.checkAvailabilityByDates(this.fStartDate, this.fEndDate, this.token).then( (response) => {
        console.log(response.data)
        this.availableSpaceIds = response.data.availability.availableSpaceIds
      })
    }
    }
  }
</script>

