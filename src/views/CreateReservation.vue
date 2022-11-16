<template>
  CreateReservation
  <DateRangePicker
    @dateRangePicker:rangeSelected="dRangeSelected">
  </DateRangePicker>
  <RootSpacePicker 
    v-if="availableSpaceIds"
    :availableSpaceIds="availableSpaceIds"
    @rootSpacePicker:spaceSelected="spaceSelected">
  </RootSpacePicker>
  <SearchCustomers
    v-if="selectedSpaceId"
    @searchCustomers:customer-selected="customerSelected">


  </SearchCustomers>
</template>

<script>
  import DateRangePicker from '/src/components/dateRangePicker.vue'
  import RootSpacePicker from '/src/components/rootSpacePicker.vue'
  import SearchCustomers from '/src/components/searchCustomers.vue'
  import { accountStore } from '/src/stores/account.js'
  import api from '/src/api/api.js'
  import dayjs from 'dayjs'

  export default {
    name: 'CreateReservation',
    components: {
      DateRangePicker,
      RootSpacePicker,
      SearchCustomers
    },
    data() {
      return {
        availableSpaceIds: null,
        selectedCustomer: null,
        startDate: null,
        endDate: null,
        selectedSpaceId: null
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
      customerSelected ( e ) {
        console.log( e )
        this.selectedCustomer = e
      },
      dRangeSelected ( range ) {
        this.startDate = range[0]
        this.endDate = range[1]
        api.reservations.checkAvailabilityByDates(this.fStartDate, this.fEndDate, this.token).then( (response) => {
          console.log(response.data)
          this.availableSpaceIds = response.data.availability.availableSpaceIds
        })
      },
      spaceSelected ( spaceId ) {
        console.log(spaceId)
        this.selectedSpaceId = spaceId
      }
    }
  }
</script>

