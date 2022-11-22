<template>
  <el-row>
    <el-col>
      <h1>{{ $t('message.createReservation') }}</h1>
      <hr/>
      <div>
        <span >
          <span v-if="selectedCustomer">{{ $t('message.customer') }}:&nbsp<b>{{ selectedCustomer.firstName }}&nbsp{{selectedCustomer.lastName}}</b></span>
        
          <el-button 
            v-if="selectedCustomer"
            type="warning"
            size="small"
            style="float: right;"
            @click="selectedCustomer = null; showSearchCustomers = null; showCreateCustomer = null"
            >
              {{ $t('message.reset') }}
          </el-button>
        </span>
      </div>
      <div>
        <span v-if="!selectedCustomer">
          <el-button
            size="small"
            type="primary"
            @click="showSearchCustomers = true; showCreateCustomer = false">
            {{ $t('message.searchCustomers') }}
          </el-button>
          <el-button
            size="small"
            type="primary"
            @click="showCreateCustomer = true; showSearchCustomers = false">
             {{ $t('message.createCustomer') }}
          </el-button> 
        </span>
      </div>
      <SearchCustomers
        v-if="showSearchCustomers && !selectedCustomer"
        @searchCustomers:customerSelected="customerSelected">
      </SearchCustomers>
      <CreateCustomer
        v-if="showCreateCustomer && !selectedCustomer"
      >
      </CreateCustomer>
      <hr/>
      <ResPeoplePicker  @resPeoplePicker:peopleQtyChosen="peopleQtyChosen"></ResPeoplePicker>
      <ResBedsPicker  @resBedsPicker:bedQtyChosen="bedQtyChosen"></ResBedsPicker>
      <DateRangePicker
        @dateRangePicker:rangeSelected="dRangeSelected"
        @dateRangePicker:clearDates="dRangeClearDates">
      </DateRangePicker>
      <RootSpacePicker 
        v-if="availableSpaceIds"
        :availableSpaceIds="availableSpaceIds"
        @rootSpacePicker:spaceSelected="spaceSelected">
      </RootSpacePicker>
      <hr/>
      <el-form-item
        v-if="startDate && endDate && selectedCustomer && selectedSpaceId && selectedPeople && selectedBeds"
      >
        <el-button type="primary" size="small" @click="createReservation">{{ $t('message.createReservation') }}</el-button>
        <el-button type="primary" size = "small" @click="checkConflicts">{{ $t('message.availability') }}</el-button>
      </el-form-item>
    </el-col>
  </el-row>
</template>

<script>
  import DateRangePicker from '/src/components/dateRangePicker.vue'
  import RootSpacePicker from '/src/components/rootSpacePicker.vue'
  import SearchCustomers from '/src/components/searchCustomers.vue'
  import CreateCustomer from '/src/components/createCustomer.vue'
  import ResBedsPicker from '/src/components/resBedsPicker.vue'
  import ResPeoplePicker from '/src/components/resPeoplePicker.vue'
  import handleError from '/src/composables/handleRequestError.js'
  import { accountStore } from '/src/stores/account.js'
  import api from '/src/api/api.js'
  import dayjs from 'dayjs'

  export default {
    name: 'CreateReservation',
    components: {
      DateRangePicker,
      RootSpacePicker,
      SearchCustomers,
      CreateCustomer,
      ResBedsPicker,
      ResPeoplePicker
    },
    data() {
      return {
        availableSpaceIds: null,
        selectedCustomer: null,
        showCreateCustomer: false,
        showSearchCustomers: false,
        startDate: null,
        endDate: null,
        selectedSpaceId: null,
        selectedPeople: null,
        selectedBeds: null
      }
    },
    computed: {
      labelCustomer () {
        return this.$t('message.customer')
      },
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
      bedQtyChosen ( beds ) {
        console.log('gotem beds on create res', beds)
        this.selectedBeds = beds
      },
      checkConflicts () {
        api.reservations.checkConflicts( this.fStartDate, this.fEndDate, this.selectedSpaceId, this.token ).then( response => {
          //console.log('checkConflicts():', response.data )
          console.log(response)
        }).catch ( error  => {
          handleError(error)
        })
      },
      createReservation () {
        console.log('checkin: ', this.fStartDate)
        console.log('checkout: ', this.fEndDate )
        console.log('people: ', this.selectedPeople)
        console.log('beds: ', this.selectedBeds )
        console.log('spaceId', this.selectedSpaceId )
        console.log('customer: ', this.selectedCustomer )
        api.reservations.createReservation( this.token, 
                                            this.fStartDate, 
                                            this.fEndDate, 
                                            this.selectedCustomer, 
                                            this.selectedSpaceId, 
                                            this.selectedPeople, 
                                            this.selectedBeds ).then( response => {
          console.log(response)
        })

      },
      customerSelected ( e ) {
        console.log( e )
        this.selectedCustomer = e
      },
      dRangeClearDates () {
        this.startDate = null
        this.endDate = null
        this.availableSpaceIds = null
      },
      dRangeSelected ( range ) {
        this.startDate = range[0]
        this.endDate = range[1]
        api.reservations.checkAvailabilityByDates(this.fStartDate, this.fEndDate, this.token).then( (response) => {
          console.log(response.data)
          this.availableSpaceIds = response.data.availability.availableSpaceIds
        })
      },
      peopleQtyChosen ( people ) {
        console.log('people chosen: ', people )
        this.selectedPeople = people
      },
      spaceSelected ( spaceId ) {
        console.log(spaceId)
        this.selectedSpaceId = spaceId
      }
    }
  }
</script>

