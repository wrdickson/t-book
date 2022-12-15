<template>
  <div v-if="testMode">
    <div>sil: {{saleItemsLength}}</div>
    <div>t: {{saleTotal}}</div>
  </div>
  <hr>
  <div style="display: flex;">
    <span>Total: {{saleTotal}}</span>
    <el-select style="margin-left: auto;" v-model="selectedPaymentType">
      <template v-for="paymentType in activePaymentTypes">
        <el-option :value="paymentType.id" :label="paymentType.payment_title"></el-option>
      </template>
    </el-select>
    <el-button v-if="selectedPaymentType" @click="paymentTypeSelected" type="success" style="margin-left: auto;">CompleteSale</el-button>
    <el-button v-else="selectedPaymentType" disabled type="success" style="margin-left: auto;">CompleteSale</el-button>
  </div>

  
</template>

<script>
  import { paymentTypesStore } from '/src/stores/paymentTypes.js'
  import _ from 'lodash'
  export default {
    name: 'CompleteSale',
    props: [ 'saleItems' ],
    emits: ['compelete-sale:payment-type-selected' ],
    data () {
      return {
        selectedPaymentType: null,
        testMode: false
      }
    },
    computed: {
      activePaymentTypes () {
        return paymentTypesStore().activePaymentTypes
      },
      saleItemsLength () {
        return this.saleItems.length
      },
      saleTotal () {
        let saleTotal = 0
        _.each( this.saleItems, saleItem => {
          saleTotal += Number(saleItem.saleTotal)
        })
        return Number(saleTotal).toFixed(2)
      }
    },
    methods: {
      paymentTypeSelected( ) {
        console.log('p', this.selectedPaymentType)
        this.$emit('compelete-sale:payment-type-selected', this.selectedPaymentType)
      }
    }
  }
</script>