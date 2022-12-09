<template>
  <div class="process-sale-wrapper">
    <el-form
      size="small"
      :inline="true"
      label-position="top"
      v-if="iSale"
    >
      <el-form-item label="Type">
        <el-input disabled v-model="iSale.title"></el-input>
      </el-form-item>
      <el-form-item label="Qty" style="width: 60px">
        <el-select v-model="iSale.quantity">
          <template v-for="n in 20">
            <el-option  :label="n" :value="n"></el-option>
          </template>
        </el-select>
      </el-form-item>
      <el-form-item v-if="iSale.is_fixed_price" label="Amount" style="width: 80px">
        <el-input disabled v-model="iSale.price"></el-input>
      </el-form-item>
      <el-form-item v-if="!iSale.is_fixed_price" label="Amount" style="width: 80px">
        <el-input v-model="iSale.price"></el-input>
      </el-form-item>
      <el-form-item label="Subtotal" style="width: 80px">
        <el-input disabled v-model="subtotal"></el-input>
      </el-form-item>
      <el-form-item label="Tax" style="width: 80px">
        <el-input disabled v-model="totalTax" ></el-input>
      </el-form-item>
      <el-form-item label="Total" style="width: 80px">
        <el-input disabled v-model="saleTotal"></el-input>
      </el-form-item>
    </el-form>
    <el-form v-if="iSale" size="small">
      <el-form-item label="Description">
        <el-input v-model="description"></el-input>
      </el-form-item>
    </el-form>
    <el-form v-if="saleTotal && saleTotal > 0">
      <el-form-item>
        <el-button @click="addToSale" size="small" type="success">Add to sale</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { saleTypesStore } from '/src/stores/saleTypes.js'
import { taxTypesStore } from '/src/stores/taxTypes.js'
import _ from 'lodash'
export default {
  name: 'ProcessSaleType',
  props: [ 'saleType' ],
  emits: [ 'process-sale-type:add-sale-item' ],
  data () {
    return {
      iSale: this.saleType,
      description: ''
    }
  },
  computed: {
    subtotal () {
      return Number(this.iSale.price * this.iSale.quantity).toFixed(2)
    },
    saleTotal () {
      if( this.iSale && this.subtotal && this.totalTax ) {
        return Number(Number(this.subtotal) + Number(this.totalTax)).toFixed(2)
      } else {
        return null
      }
    },
    saleTypes () {
      return saleTypesStore().saleTypes
    },
    taxRate () {
      if( this.iSale ) {
        const taxArr = this.iSale.tax_types
        let taxRate = 0
        _.each( taxArr, taxId => {
          const selTaxType = _.find(this.taxTypes, o => {
            return o.id == taxId
          })
          taxRate = Number(taxRate) + Number(selTaxType.tax_rate)
        })
        return Number(taxRate)
      } else {
        return null
      }
    },
    taxSpread () {
      if( this.iSale && this.subtotal ) {
        let taxSpreadArr = []
        _.each( this.iSale.tax_types, taxTypeId => {
          let taxSpreadObj = {}
          const selTaxType = _.find(this.taxTypes, o => {
            return o.id == taxTypeId
          })
          taxSpreadObj.taxTypeId = taxTypeId
          taxSpreadObj.taxRate = selTaxType.tax_rate
          taxSpreadObj.tax = Number( selTaxType.tax_rate * this.subtotal ).toFixed(2)
          taxSpreadArr.push(taxSpreadObj)
        })
        return taxSpreadArr
      } else {
        return null
      }
    },
    taxTypes () {
      return taxTypesStore().taxTypes
    },
    totalTax () {
      if(this.taxRate != null) {
        return (this.subtotal * Number(this.taxRate)).toFixed(2)
      } else {
        return null
      }
    }
  },
  methods: {
    addToSale () {
      const saleItem = {
        saleType: this.iSale.id,
        saleTitle: this.iSale.title,
        saleQuantity: this.iSale.quantity,
        salePrice: this.iSale.price,
        saleSubtotal: this.subtotal,
        saleTax: this.totalTax,
        saleTotal: this.saleTotal,
        taxTypes: this.iSale.taxTypes,
        taxSpread: this.taxSpread,
        description: this.description
      }
      this.$emit( 'process-sale-type:add-sale-item', saleItem )
    }
  },
  watch: {
    saleType ( newVal ) {
      //  reset form when saleType prop changes . . .
      this.iSale = this.saleType
      //  give it an initial quantity
      this.iSale.quantity = 1
      //  set a price property, changes whether this is fixed price or not
      if(this.iSale.is_fixed_price) {
        this.iSale.price = Number(this.iSale.fixed_price).toFixed(2)
      } else {
        this.iSale.price = null
      }
      //  set the initial description property as sale type title . . .can be changed
      this.description = this.saleType.title
      
    }
  }
}
</script>

<style scoped>
.process-sale-wrapper {
  min-height: 95px;
}
</style>
