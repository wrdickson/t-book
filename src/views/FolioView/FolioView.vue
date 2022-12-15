<template>
  <div>
    <el-row>
      <el-col :span="12">
        <div>{{ selectedReservation.customer_obj.firstName }}&nbsp{{ this.selectedReservation.customer_obj.lastName }}</div>
        <div>
          <span>{{ selectedReservation.checkin }}</span>
          <span> : </span>
          <span>{{ selectedReservation.checkout }}</span>
        </div>
        <div v-if="rootSpace">{{ $t('message.spaceLabel') }}: {{ rootSpace.title }}</div>
        <div>{{ $t('message.people') }}: {{ selectedReservation.people }}</div>
        <div>{{ $t('message.beds') }}: {{ selectedReservation.beds }}</div>
        <hr/>
          <el-button type="danger" size="small" @click="resetSale">Reset Sale</el-button>
          <SaleGroupSelect
            @sale-group-select:group-selected="groupSelected"
          />
          <SaleTypeSelect
            v-if="selectedGroup"
            :selectedGroup="selectedGroup"
            @sale-type-picker:sale-type-selected="saleTypeSelected"

          />
        <hr/>

        <ProcessSaleType
          :saleType="selectedSaleType"
          :processSaleTypeResetKey="processSaleTypeResetKey"
          @process-sale-type:add-sale-item="addSaleItem"
        />
        <SaleItems
          v-if="saleItems.length > 0"
          :saleItems="saleItems"
          @sale-items:remove-at-index="removeItemAtIndex"
        />
        <CompleteSale
          v-if="saleItems.length > 0"
          :saleItems="saleItems"
          @compelete-sale:payment-type-selected="handlePaymentTypeSelected"
        />
      </el-col>
      <el-col :span="12">
        <FolioViewer
          :folioViewerReloadKey="folioViewerReloadKey"
          :selectedReservation="selectedReservation"
        />
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import { accountStore } from '/src/stores/account.js'
  import { rootSpacesStore } from '/src/stores/rootSpaces.js'
  import { resViewStore } from '/src/stores/resView.js'
  import { ElMessage } from 'element-plus'
  import ProcessSaleType from '/src/views/FolioView/processSaleType.vue'
  import SaleItems from '/src/views/FolioView/saleItems.vue'
  import CompleteSale from '/src/views/FolioView/completeSale.vue'
  import FolioViewer from '/src/views/FolioView/folioDisplay.vue'
  import SaleGroupSelect from '/src/views/FolioView/saleGroupSelect.vue'
  import SaleTypeSelect from '/src/views/FolioView/saleTypeSelect.vue'
  import api from '/src/api/api.js'
  import _ from 'lodash'
  export default {
    name: 'FolioView',
    props: [ 'folioId', 'selectedReservation', 'componentKey' ],
    components: {
      ProcessSaleType, SaleItems, CompleteSale, FolioViewer, SaleGroupSelect, SaleTypeSelect
    },
    data () {
      return {
        folioViewerReloadKey: 1,
        processSaleTypeResetKey: 1,
        rootSpaces: [],
        saleItems: [],
        selectedPaymentType: null,
        selectedGroup: null,
        selectedSaleType: null,
      }
    },
    computed: {
      rootSpace () {
        const rs = _.find( this.rootSpaces, o => {
          return o.id == this.selectedReservation.space_id
        })
        return rs
      },
      saleSubtotal () {
        let saleSubtotal = 0
        _.each( this.saleItems, saleItem => {
          saleSubtotal += Number(saleItem.saleSubtotal)
        })
        return saleSubtotal
      },
      saleTaxTotal () {
        let saleTaxTotal = 0
        _.each( this.saleItems, saleItem =>{
          saleTaxTotal += Number(saleItem.saleTax)
        })
        return saleTaxTotal
      },
      saleTotal () {
        let saleTotal = 0
        _.each( this.saleItems, saleItem => {
          saleTotal += Number(saleItem.saleTotal)
        })
        return Number(saleTotal).toFixed(2)
      },
      token () {
        return accountStore().token
      }
    },
    methods: {
      //  triggered from processSaleType child component
      addSaleItem ( saleItem ) {
        console.log('addSaleItem: ', saleItem)
        //  somehow saleItem.taxTypes is an object . . .  
        //  we need an array . . . wtf, but well . . . 
        saleItem.taxTypes = Object.values(saleItem.taxTypes)
        this.saleItems.push(saleItem)
        //  clear out the processSaleType component
        this.processSaleTypeResetKey += 1
        this.saleTypePickerResetKey += 1
        //  clear out processSaleType
        this.selectedSaleType = null
        //  clear out sale type select
        this.selectedGroup = null
      },
      groupSelected ( i ) {
        console.log('setting i', JSON.parse(JSON.stringify(i)))
        this.selectedGroup = JSON.parse(JSON.stringify(i))
        //  also reset selected sale type
        this.selectedSaleType = null
      },
      //  this is complete sale . . . 
      handlePaymentTypeSelected ( paymentType ) {
        this.selectedPaymentType = paymentType
        //  post the sale if the conditions are correcyt
        if(this.saleItems && this.saleItems.length > 0 ) {
          console.log('here')
          const resId = this.selectedReservation.id
          const resCustomer = this.selectedReservation.customer
          const resFolio = this.selectedReservation.folioId
          //  generate a non reactive sale items array
          const saleObj = {
            resId: this.selectedReservation.id,
            resCustomer: this.selectedReservation.customer,
            resFolio: this.selectedReservation.folio,
            saleItems: this.saleItems,
            paymentType: paymentType,
            saleTotal: this.saleTotal,
            saleSubtotal: this.saleSubtotal,
            saleTax: this.saleTaxTotal,
            soldBy: accountStore().account.id
          }
          console.log(saleObj)
          console.log(JSON.stringify(saleObj))
          //  send it up . . .
          api.payments.postQuickFolioSale ( saleObj, this.token ).then( response => {
            console.log('quick sale', response.data)
            //  this needs to be more robust to deal with failures
            if(response.data.payment_id && response.data.sale_items_created && response.data.invoiceId) {
              ElMessage({
                type: 'success',
                message: 'Transaction completed'
              })
              //  reset
              this.resetSale()
              //  tell folioViewer to reload
              this.folioViewerReloadKey += 1
            }
          })

        }
        
      },
      removeItemAtIndex( i ) {
        console.log('rAI', i)
        this.saleItems.splice( i, 1 )
        //  clean up presentation
        this.selectedGroup = null
      },
      resetSale () {
        this.selectedGroup = null
        this.selectedSaleType = null
        this.saleItems = []
      },
      saleTypeSelected ( i ) {
        i = JSON.parse(JSON.stringify(i))
        this.selectedSaleType = i
        console.log(i)
      }
    },
    mounted () {
      //  get rootSpaces . . . 
      if( resViewStore().showHideRootSpaceCopy ) {
        this.rootSpaces = resViewStore().showHideRootSpaceCopy
      } else { 
        this.rootSpaces = rootSpacesStore().rootSpaces
      }
    },
    watch: {
      folioId ( newVal ) {
        this.selectedSaleType = null
      }
    }
}
</script>

<style>
  .folio-view-hr {
    border-top: 7px;
    border-bottom: 7px;
  }
</style>
