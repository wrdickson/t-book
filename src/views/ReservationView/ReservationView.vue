<template>
  <el-dialog
    v-model="showFolioDialog"
    :fullscreen="true"
    :destroy-on-close="true"
  >
    <FolioView
      :folioId="selectedReservation.folio"
      :selectedReservation="selectedReservation"
      :componentKey="componentKey"
    ></FolioView>
  </el-dialog>
  <div v-if="rootSpaces && rootSpace" class="wrapper">
    <div><font-awesome-icon @click="closeReservationView" color="#f56c6c" icon="fa-window-close" size="xl" style="float: right;"/></div><br/>
    <div>{{ selectedReservation.customer_obj.firstName }}&nbsp{{ this.selectedReservation.customer_obj.lastName }}</div>
    <div>
      <span>{{ selectedReservation.checkin }}</span>
      <span> : </span>
      <span>{{ selectedReservation.checkout }}</span>
    </div>
    <div>{{ $t('message.spaceLabel') }}: {{ rootSpace.title }}</div>
    <div>{{ $t('message.people') }}: {{ selectedReservation.people }}</div>
    <div>{{ $t('message.beds') }}: {{ selectedReservation.beds }}</div>
    <div>Res Id : {{ selectedReservation.id }}</div>
    <div>
      <span v-if="selectedReservation.status == 0">
        <el-button type="success" @click="reservationCheckin">{{ $t('message.checkin') }}</el-button>
      </span>
      <span v-if="selectedReservation.status == 1">
        <el-button type="info" @click="reservationCheckout">{{ $t('message.checkout') }}</el-button>
      </span>
      <span>
        <el-button @click="showFolioDialog = true" type="primary">Folio</el-button>
      </span>
    </div>
    <el-collapse>
      <el-collapse-item title="Edit Reservation" name="2">
        <EditReservation
          v-if="rootSpaces && rootSpace"
          
          :componentKey="componentKey"

          :resId="selectedReservation.id"
          :checkin="selectedReservation.checkin"
          :checkout="selectedReservation.checkout"
          :people="selectedReservation.people"
          :beds="selectedReservation.beds"
          :spaceId="selectedReservation.space_id"
          :customer="selectedReservation.customer"
          :customerFirst="selectedReservation.customer_obj.firstName"
          :customerLast="selectedReservation.customer_obj.lastName"
          @edit-reservation:modify-reservation-1="modifyReservation1">
        </EditReservation>
      </el-collapse-item>
      <el-collapse-item title="History" name="1">
        <table class="historyTable">
          <tbody>
            <tr v-for="history in selectedReservation.history">
              <td>{{history.text}}</td>
              <td>{{history.account_name}}</td>
              <td>{{history.date}}</td>
            </tr>
          </tbody>
        </table>
      </el-collapse-item>
    </el-collapse>

 
 </div>
</template>

<script>
import EditReservation from '/src/views/ReservationView/editReservation.vue'
import FolioView from '/src/views/FolioView/FolioView.vue'
import api from '/src/api/api.js'
import _ from 'lodash'
import { accountStore } from '/src/stores/account.js'
import { resViewStore } from '/src/stores/resView.js'
import { rootSpacesStore } from '/src/stores/rootSpaces.js'
import { ElMessage } from 'element-plus'
import useHandleRequestError from '/src/composables/useHandleRequestError.js'
export default {
  setup () {
      //  import composable function for request error handling
      const { handleRequestError } = useHandleRequestError()
      return { handleRequestError }
  },
  name: 'ReservationView',
  props: [ 
    'selectedReservation'
  ],
  components: { EditReservation, FolioView },

  emits: [ 
    'reservation-view:close-view',
    'reservation-view:update-reservations',
    'reservation-view:update-selected-reservation'
  ],
  data () {
    return {
      componentKey: 1,
      rootSpaces: null,
      showHistory: false,
      showFolioDialog: false
    }
  },
  computed: {
    token () {
      return accountStore().token
    },
    rootSpace () {
      const rs = _.find( this.rootSpaces, o => {
        return o.id == this.selectedReservation.space_id
      })
      return rs
    }
  },
  methods: {
    closeReservationView () {
      this.$emit('reservation-view:close-view')
    },
    modifyReservation1 ( args ) {
      console.log('reservationview gets command', args)
      api.reservations.modifyReservation1( args, this.token ).then( response => {
        if( response.data.success = true ) {
          //  tell parent (resView3) to reload reservations
          this.$emit('reservation-view:update-reservations')
          //  tell the parent (resView3) to update selected reservation
          //  this will iterate down the event chain and update here
          //  and on editReservation
          this.$emit('reservation-view:update-selected-reservation', response.data.current_res )
          //  increment the componentKey prop to signal we need to clean up
          this.componentKey += 1
          ElMessage({
            type: 'success',
            message: 'Reservation updated'
          })
        } else {
          ElMessage({
            type: 'warning',
            message: 'There was an error'
          })
        }
      }).catch( error => {
        this.handleRequestError( error )
      })
    },
    reservationCheckin () {
      api.reservations.reservationCheckin ( this.selectedReservation.id, this.token ).then(
        response => {
          if( response.data.checkin == true && response.data.reservation_after_checkin) {
            this.$emit('reservation-view:update-reservations')
            this.$emit('reservation-view:update-selected-reservation', response.data.reservation_after_checkin )
            ElMessage({
              type: 'success',
              message: 'Reservation checked in'
            })
          } else {
            ElMessage({
              type: 'warning',
              message: 'There was an error'
            })
          }
      }).catch( error => {
        this.handleRequestError( error )
      })
    },
    reservationCheckout () {
      api.reservations.reservationCheckout ( this.selectedReservation.id, this.token ).then(
        response => {
          console.log(response)
          if( response.data.checkout == true && response.data.reservation_after_checkout) {
            this.$emit('reservation-view:update-reservations')
            this.$emit('reservation-view:update-selected-reservation', response.data.reservation_after_checkout )
            ElMessage({
              type: 'success',
              message: 'Reservatin checked out'
            })
          }
      }).catch( error => {
        this.handleRequestError( error )
      })
    }
  },
  mounted () {
    //  get rootSpaces . . . 
    if( resViewStore().showHideRootSpaceCopy ) {
      this.rootSpaces = resViewStore().showHideRootSpaceCopy
    } else { 
      this.rootSpaces = rootSpacesStore().rootSpaces
    }
  }
}

</script>

<style>

.historyTable {
  display: block;
  border-collapse: collapse;
  border: 1px solid rgb(139, 139, 139);
  width: 100%;
  height: 160px;
  overflow: scroll;
}

.historyTable td {
  border: 1px solid rgb(139, 139, 139);
}

.wrapper{
  padding-right: 4px;
  padding-left: 4px;
}
</style>