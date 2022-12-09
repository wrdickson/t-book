<template>
  <div>
    <el-row>
      <el-col :span="24">
        <SaleTypePicker
          @sale-type-picker:sale-type-selected="handleSaleTypeSelected"
        />
        <hr>
        <ProcessSaleType
          :saleType="selectedSaleType"
          @process-sale-type:add-sale-item="addSaleItem"
        />
        <hr>
        <SaleItems
          :saleItems="saleItems"
          @sale-items:remove-at-index="removeItemAtIndex"
        />
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import { accountStore } from '/src/stores/account.js'
  import SaleTypePicker from '/src/views/FolioView/saleTypePicker.vue'
  import ProcessSaleType from '/src/views/FolioView/processSaleType.vue'
  import SaleItems from '/src/views/FolioView/saleItems.vue'
  import api from '/src/api/api.js'
  import _ from 'lodash'
  export default {
    name: 'FolioView',
    props: [ 'folioId', 'selectedReservation', 'componentKey' ],
    components: {
      SaleTypePicker, ProcessSaleType, SaleItems
    },
    data () {
      return {
        saleItems: [],
        selectedSaleType: null,
      }
    },
    computed: {
      token () {
        return accountStore().token
      }
    },
    methods: {
      //  triggered from processSaleType child component
      addSaleItem ( saleItem ) {
        console.log('addSaleItem: ', saleItem)
        this.saleItems.push(saleItem)
      },
      handleRemoveItem ( scope ) {
        console.log( scope.$index )
        this.activeSaleItems.splice( scope.$index, 1 )
      },
      handleSaleTypeSelected ( saleType ) {
        console.log('sale type selected on FolioView:', saleType)
        this.selectedSaleType = saleType
      },
      removeItemAtIndex( i ) {
        console.log('rAI', i)
        this.saleItems.splice( i, 1 )
      }
    },
    watch: {
      folioId ( newVal ) {
        this.selectedSaleType = null
      }
    }
}
</script>
