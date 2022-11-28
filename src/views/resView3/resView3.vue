<template>
    <splitpanes
      @resized="leftResize">
      <pane
        :size="leftPaneSize">
        <CreateReservation
          v-if="showCreateReservation"
          @createReservation:reloadReservations="getReservations"
          @createReservation:closeDrawer="showCreateReservationDrawer = false"
        />
        
      </pane>
      <pane>
        <div style="margin-left: 4px;">
          <span>
            <el-button-group>
              <el-button type="warning" @click="viewBack7">-7</el-button>
              <el-button type="warning" @click="viewBack1">-1</el-button>
            </el-button-group>
            <singleDatePicker
              :overrideDate="overRideSingleDatePicker"
              @singleDatePicker:dateSelected="singleDateSelected"
            />
            <el-button-group>
              <el-button type="warning" @click="viewForward1">+1</el-button>
              <el-button type="warning" @click="viewForward7">+7</el-button>
            </el-button-group>&nbsp
            <el-button type="success" @click="showCreateReservation = true">{{ $t('message.createReservation') }}</el-button>
          </span>
          <ResViewTable
            v-if = "rootSpaces"
            @resBlockClick="reservationSelected"
            @resview-toggle-show-children="toggleShowChildren"
            @emptyCellClick="emptyCellClick"
            :tDateArray="tDateArray"
            :tableData="resTableData"
            :trigger="trigger"
            :resSpaceCopy="spaceRecords"
          />
        </div>
      </pane>
     </splitpanes>
</template>

<script>
import singleDatePicker from '/src/views/resView3/singleDatePicker.vue'
import ResViewTable from '/src/views/resView3/resViewTable.vue'
import CreateReservation from '/src/views/CreateReservation.vue'
import api from '/src/api/api.js'
import dayjs from 'dayjs'
import 'dayjs/locale/es'
import isSameOrBefore from 'dayjs'
import isSameOrAfter from 'dayjs'
import _ from 'lodash'
import { accountStore } from '/src/stores/account.js'
import { localeStore } from '/src/stores/locale.js'
import { resViewStore } from '/src/stores/resView.js'
import useHandleRequestError from '/src/composables/useHandleRequestError.js'
import { Splitpanes, Pane } from 'splitpanes'
import 'splitpanes/dist/splitpanes.css'


export default {
  setup () {
      //  import composable function for request error handling
      const { handleRequestError } = useHandleRequestError()
      return { handleRequestError }
  },
  name: 'resView3',
  components: {
    singleDatePicker,
    ResViewTable,
    CreateReservation,
    Splitpanes,
    Pane
  },
  data () {
    return {
      leftPaneSize: 25,
      overRideSingleDatePicker: '',
      reservationDialog: false,
      reservations: [],
      rootSpaces: null,
      selectedReservation: null,
      showCreateReservation: false,
      trigger: 1,
      windowWidth: 0
    }
  },
  computed: {
    locale () {
      return localeStore().selectedLocale
    },
    token() {
      return accountStore().token
    },
    rDrawerWidth () {
      if(this.windowWidth < 768){
        return '100%'
      }
      if(this.windowWidth > 768 && this.windowWidth < 1200 ) {
        return '500px'
      }
      if(this.windowWidth >= 1200 ) {
        return '35%'
      }
    },
    resViewEndDate () {
      return dayjs(this.resViewStartDate).add(31, 'days').format('YYYY-MM-DD')
    },
    resViewStartDate () {
      return resViewStore().startDate
    },
    resTableData () {

      let presentedResStart
      let pResStart
      let iSpan
      let ciInRange
      let coInRange
      let iKey
      let sKey

      let spaceRecords

      //  we have to clear out all the properties on the root spaces
      //  that represent a res block for presentation.
      //  These property keys all start with "D"
      //  for example 'D20220827isfirst'
      _.each(this.rootSpaces, ( rootSpace ) => {
        const keys =  Object.keys(rootSpace)
        _.each(keys, (key) => {
          if ( key.substring(0,1) == "D" ) {
            delete rootSpace[key]
          }
        })
      })

      spaceRecords = this.rootSpaces
      //  iterate through the reservations and add data to the appropriate array item
      _.each(this.reservations, (iReservation) => {
        //  ignore reservations where checkout == resViewStartDate
        if( iReservation.checkout == this.resViewStartDate ){
          //do nothing
        } else {
          let iRecord = _.find(spaceRecords, (o) => {
            //get the reservation
            return o.id == iReservation.space_id
          })
          if(iRecord){ 
            //  first present the reservation

            if( dayjs(iReservation.checkout).isAfter(dayjs(this.resViewEndDate)) ){
              coInRange = false
            } else {
              coInRange = true
            }

            //  check in is before start date, checkout is after start date
            //  presentedResStart is the first day that should be represented
            if ( dayjs(iReservation.checkin).isBefore(dayjs(this.resViewStartDate)) ){
                ciInRange = false
                presentedResStart = dayjs(this.resViewStartDate).format('YYYYMMDD')
                pResStart = dayjs(this.resViewStartDate).format('YYYY-MM-DD')
                iSpan = iSpan = dayjs(iReservation.checkout).diff(dayjs(this.resViewStartDate), 'd')
              } else {
                ciInRange = true
                presentedResStart = dayjs(iReservation.checkin).format('YYYYMMDD')
                pResStart = dayjs(iReservation.checkin).format('YYYY-MM-DD')
                iSpan = dayjs(iReservation.checkout).diff(dayjs(iReservation.checkin), 'd')
              }

            //  calculate the difference between presentedResStart and checkout
            let iDiff = dayjs(iReservation.checkout).diff(dayjs(pResStart), 'd')
            for( let i = 0; i < iDiff; i++){
                  //generate the day
                  let iDate = dayjs(presentedResStart).add(i, 'd').format('YYYYMMDD')
                  //  determine if this is the first day of the presentation
                  if( i == 0 ) {
                    iKey = 'D' + iDate + 'isfirst'
                    iRecord[iKey] = true
                  }

                  //  determine if this is the last day of the presentation
                  if( dayjs(this.resViewEndDate).isSame(iDate) ) {
                    iKey = 'D' + iDate + 'islast'
                    iRecord[iKey] = true
                  }

                  //  is block indicator
                  iKey = 'D' + iDate + 'blocked'
                  iRecord[iKey] = false
                  //  isStartTruncated flag
                  iKey = 'D' + iDate + 'starttruncated'
                  iRecord[iKey] = !ciInRange
                  //  isEndTruncated flat
                  iKey = 'D' + iDate + 'endtruncated'
                  iRecord[iKey] = !coInRange
                  //  resid
                  iKey = 'D' + iDate + 'resid'
                  iRecord[iKey] = iReservation.id
                  //  start
                  iKey = 'D' + iDate + 'start'
                  iRecord[iKey] = iReservation.checkin
                  //  end
                  iKey = 'D' + iDate + 'end'
                  iRecord[iKey] = iReservation.checkout
                  //  customer
                  iKey = 'D' +  iDate + 'customer'
                  iRecord[iKey] = iReservation.customer_obj.lastName
            }
          }

          //  now create 'empty block' records for children of reservations
          if(iRecord.children.length > 0){
            _.forEach(iRecord.children, (childId) => {
              let qRecord = _.find(spaceRecords, (o) => {
                return o.id == childId
              })
              if(qRecord) {
                //  calculate the difference between presentedResStart and checkout
                let iDiff = dayjs(iReservation.checkout).diff(dayjs(pResStart), 'd')
                //  iterate through the needed number of days
                for( let i = 0; i < iDiff; i++){
                  // console.log('i', i)
                  //generate the day
                  let iDate = dayjs(presentedResStart).add(i, 'd').format('YYYYMMDD')
                  // console.log( iDate )
                  sKey = 'D' + iDate + 'blocked'
                  //  also check for a reservation
                  let iiKey = 'D' + iDate + 'resid'
                  // console.log('sKey', sKey)
                  if( !qRecord[sKey]){
                    // console.log('no block for this. sKey: ', qRecord)
                    
                    let sKey = 'D' + iDate + 'blocked'
                    qRecord[sKey] = true
                    //  span
                    sKey = 'D' +  iDate + 'span'
                    qRecord[sKey] = 1
                    //  resIdRef
                    sKey = 'D' +  iDate + 'resIdRef'
                    qRecord[sKey] = iReservation.id
                  }
                }
              }
            })
          }

          //  now create 'empty block' records for parents of reservations
          if(iRecord.parents.length > 0){
            _.forEach(iRecord.parents, (parentId) => {
              let qRecord = _.find(spaceRecords, (o) => {
                return o.id == parentId
              })
              if(qRecord) {
                //  iterate through the 'days'
                //  calculate the difference between presentedResStart and checkout
                let iDiff = dayjs(iReservation.checkout).diff(dayjs(pResStart), 'd')
                // console.log('iDiff', iDiff)
                //iterate through the 'days'
                for( let i = 0; i < iDiff; i++){
                  // console.log('i', i)
                  //generate the day
                  let iDate = dayjs(presentedResStart).add(i, 'd').format('YYYYMMDD')
                  // console.log( iDate )
                  let sKey = 'D' + iDate + 'blocked'
                  //console.log('sKey', sKey)
                  if( !qRecord[sKey] ){
                    // console.log('no block for this')
                    let sKey = 'D' + iDate + 'blocked'
                    qRecord[sKey] = true
                    //  span
                    sKey = 'D' +  iDate + 'span'
                    qRecord[sKey] = 1
                    //  resIdRef
                    sKey = 'D' +  iDate + 'resIdRef'
                    qRecord[sKey] = iReservation.id
                  }
                }
              }
            })
          }
        }
      })
      
      return spaceRecords
    },
    tDateArray () {
      //  set a reactive locale to day.js for table header formatting
      dayjs.locale(this.locale.name)
      //  this constructs the column elements for the table
      //  we want 31 columns, starting from start date
      const dArr = []
      for( let i = 0; i < 32; i++ ) {
        let iObj = {
          //  formatted without dashes
          dayString: 'D' +  dayjs(this.resViewStartDate).add(i, 'day').format('YYYYMMDD'),
          //  formatted with dashes
          dayLabel: dayjs(this.resViewStartDate).add(i, 'day').format('ddd MMM D')
        }
        dArr.push(iObj)
      }
      return dArr
    }
  },
  methods: {
    clearReservations () {
      this.presentData = false
    },
    emptyCellClick ( obj ) {
      console.log('empty cell selected', obj)
    },
    getReservations () {
      console.log('getReservations() on resView3')
      api.reservations.getReservationsByRange( this.resViewStartDate, this.resViewEndDate, this.token)
      .then( (response) => {
        console.log('res by range', response.data.reservations)
        this.reservations = response.data.reservations
      }).catch( error => {
          console.log('error', error)
          this.handleRequestError(error)
          this.reservations = []
      })
    },
    leftResize ( e ) {
      console.log(e)
    },
    reservationSelected ( resId ) {
      this.selectedReservation = _.find(this.reservations, function(o){
        return o.id == resId
      })
      console.log('sel res', this.selectedReservation)
    },
    rowClassName ( obj) {
    },
    singleDateSelected ( nDate ) {
      //  format it
      let fDateSelected = dayjs(nDate).format('YYYY-MM-DD')
      //  send it to the store
      //  this will react locally
      resViewStore().startDate = fDateSelected
      //  get reservations from db
      //  this will update the view
      this.getReservations()
    },
    toggleShowChildren( spaceId ) {
      //  note that this IS going to change the store
      //  we're breaking one way data flow in this situation
      //  that's how we get persistence on show/hide children
      let k = _.find(this.rootSpaces, (o) => {
        return o.id == spaceId
      })
      let hideChildren = (k) => {
        k.showChildren = false
        if(k.children) {
            _.each(k.children,( childId ) => {
              let m = _.find(this.spaceRecords, (o) => {
                return o.id == childId
              })
              if(m) {
                hideChildren(m)
              }
            })
        }
      }
      let showChildren = (k) => {
        k.showChildren = true
        if(k.children) {
            _.each(k.children,( childId ) => {
              let m = _.find(this.spaceRecords, (o) => {
                return o.id == childId
              })
              if(m) {
                showChildren(m)
              }
            })
        }
      }
      let toggleChildren = (k) => {
        if(k.showChildren == true){
          k.showChildren = false
          if(k.children) {
            _.each(k.children,( childId ) => {
              let m = _.find(this.spaceRecords, (o) => {
                return o.id == childId
              })
              if(m) {
                hideChildren(m)
              }
            })
          }
        } else {
          k.showChildren = true
        }
      }
      toggleChildren(k)
      //  now update the store so that show/hide children remains current
      //  TODO
      resViewStore().setShowHideRootSpaceCopy(this.rootSpaces)
    },
    toggleCreateReservationDrawer () {
      this.showCreateReservationDrawer = !this.showCreateReservationDrawer
    },
    viewBack1 () {
      const newDate = dayjs(resViewStore().startDate).subtract( 1, 'days').format('YYYY-MM-DD')
      this.overRideSingleDatePicker = newDate
    },
    viewBack7 () {
      const newDate = dayjs(resViewStore().startDate).subtract( 7, 'days').format('YYYY-MM-DD')
      this.overRideSingleDatePicker = newDate
    },
    viewForward1 () {
      const newDate = dayjs(resViewStore().startDate).add( 1, 'days').format('YYYY-MM-DD')
      this.overRideSingleDatePicker = newDate
    },
    viewForward7 () {
      const newDate = dayjs(resViewStore().startDate).add( 7, 'days').format('YYYY-MM-DD')
      this.overRideSingleDatePicker = newDate
    }
  },
  created () {
    dayjs.extend(isSameOrBefore)
    dayjs.extend(isSameOrAfter)
    this.spaceRecords =  {}
  },
  mounted () {
    /**
     *  Get window width and handle changes
     */
    this.windowWidth = window.innerWidth
    window.addEventListener('resize', (event) => {
      this.windowWidth = window.innerWidth
    }, true);


    //  do we have a showHideRootSpaceCopy in store?
    //  get space records
    if( resViewStore().showHideRootSpaceCopy ) {
      this.rootSpaces = resViewStore().showHideRootSpaceCopy
    } else { 
      api.rootSpaces.getRootSpaces( this.token ).then( response => {
        this.rootSpaces = response.data.root_spaces_children_parents
      })
    }
    this.getReservations()
  }
}
</script>

<style>
  .row-hidden {
    display: none !important;
  }



  .splitpanes--vertical > .splitpanes__splitter {
  min-width: 10px;
  background:  #3375b9
}

.splitpanes--horizontal > .splitpanes__splitter {
  min-height: 10px;
  background: rgb(10, 66, 18);
}
</style>