<template>
  <div v-if="folioDataLoaded" class="folio-display-wrapper">
    <div style="font-size: 1.5em">Sale Items</div>
    <el-table
      size="small"
      :data="allSaleItems"
      max-height="250"
      style="width: 100%"
      show-summary
      stripe
    >
      <el-table-column prop="sale_datetime" width="143" label="Date"></el-table-column>
      <el-table-column prop="invoice" width="70" label="Invoice"></el-table-column>
      <el-table-column prop="description" label="Description"></el-table-column>
      <el-table-column prop="sale_quantity" width="70" label="Qty"></el-table-column>
      <el-table-column prop="sale_price" width="70" label="Price"></el-table-column>
      <el-table-column prop="sale_subtotal" width="70" label="Subtotal"></el-table-column>
      <el-table-column prop="sale_tax" width="70" label="Tax"></el-table-column>
      <el-table-column prop="sale_total" width="70" label="Total"></el-table-column>
    </el-table>
    <hr/>
    <div style="font-size: 1.5em">Payments</div>
    <el-table
      size="small"
      :data="allSalePayments"
      max-height="250"
      style="width: 100%"
      show-summary
      stripe
    >
      <el-table-column prop="datetime_posted" width="143" label="Date"></el-table-column>
      <el-table-column prop="invoice" width="70" label="Invoice"></el-table-column>
      <el-table-column prop="subtotal" width="70" label="Subtotal"></el-table-column>
      <el-table-column prop="tax" width="70" label="Tax"></el-table-column>
      <el-table-column prop="total" width="70" label="Total"></el-table-column>
      <el-table-column prop="payment_type" width="100" label="Type"></el-table-column>
    </el-table>
  </div>
</template>

<script>
  import api from '/src/api/api.js'
  import _ from 'lodash'
  import { accountStore } from '/src/stores/account.js'
  export default {
    name: 'FolioDisplay',
    props: [ 'selectedReservation', 'folioViewerReloadKey'],
    data () {
      return {
        folioDataLoaded: false,
        folioData: []
      }
    },
    computed: {
      allSaleItems () {
        let allSaleItems = []
        _.each(this.folioData.invoices, invoice => {
          _.each(invoice.sale_items, saleItem => {
            allSaleItems.push(saleItem)
          })
        })
        return allSaleItems
      },
      allSalePayments () {
        let allSalePayments = []
        _.each(this.folioData.invoices, invoice => {
          _.each(invoice.payments, payment => {
            allSalePayments.push(payment)
          })
        })
        return allSalePayments
      },
      token () {
        return accountStore().token
      }
    },
    methods: {
      getFolio1 () {
        api.folios.getFolio1( this.token, this.selectedReservation.folio ).then( response => {
        console.log(response.data)
        console.log(JSON.stringify(response.data))
        // set as a non reactive property
        this.folioData = response.data.folio_to_array
        this.folioDataLoaded = true
      })
      }
    },
    created () {
      console.log('folioDisplay created')
      this.getFolio1()
    },
    watch: {
      folioViewerReloadKey ( newVal ) {
        console.log('foliodispaly gets reload key')
        this.folioData = []
        this.folioDataLoaded = false
        this.getFolio1()
      }
    }
  }
</script>