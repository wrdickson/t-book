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
          <template v-for="n in saleQuantities">
            <el-option  :label="n" :value="n"></el-option>
          </template>
        </el-select>
      </el-form-item>
      <el-form-item v-if="Boolean(Number(iSale.is_fixed_price))" label="Amount" style="width: 80px">
        <el-input disabled v-model="iSale.price"></el-input>
      </el-form-item>
      <el-form-item v-if="!Boolean(Number(iSale.is_fixed_price))" label="Amount" style="width: 80px">
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
        <el-input v-model="iSale.description"></el-input>
      </el-form-item>
    </el-form>
    <el-form v-if="saleTotal && saleTotal > 0 || saleTotal < 0">
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
  props: [ 'saleType', 'processSaleTypeResetKey' ],
  emits: [ 'process-sale-type:add-sale-item' ],
  data () {
    return {
      description: '',
      saleQuantities: [-5, -4, -3, -2, -1, 1, 2, 3, 4, 5 ],
      //  this will be a non reactive copy of the prop
      //  we need to modify it, so see iSale in computed()
      iSale: null
      
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
          taxSpreadObj.i = taxTypeId
          taxSpreadObj.r = selTaxType.tax_rate
          taxSpreadObj.t = Number( selTaxType.tax_rate * this.subtotal ).toFixed(2)
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
        taxTypes: this.iSale.tax_types,
        taxSpread: this.taxSpread,
        description: this.iSale.description
      }
      this.$emit( 'process-sale-type:add-sale-item', saleItem )
    }
  },
  watch: {
    saleType (newVal ) {
      console.log('watch on process sale type', newVal)
      //  handle newval is null
      if( newVal ) {
        newVal.quantity = 1
        newVal.description = newVal.title
        if(newVal.is_fixed_price) {
          newVal.price = newVal.fixed_price
        } else {
          newVal.price = null
        }
        this.iSale = newVal
      } else {
        this.iSale = null
      }
    }
  }

}
</script>

<style>
</style>
