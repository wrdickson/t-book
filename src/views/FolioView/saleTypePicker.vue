<template>
  <div class="sale-type-picker-wrapper">
    <div>
      <el-button-group type="primary">
        <template v-for="group in groupSet">
          <el-button size="small" @click="handleGroupClick(group)" >
            {{group.groupTitle}}
          </el-button>
        </template>
      </el-button-group>
    </div>
    <div style="margin-top: 2px;">
      <el-button-group v-if="selectedSaleTypes">
        <template v-for="saleType in selectedSaleTypes.saleTypes">
          <el-button type="primary" size="small" plain @click="handleSelectSaleType(saleType)">
            {{saleType.title}}
          </el-button>
        </template>
      </el-button-group>
    </div>
  </div>
</template>

<script>
import { saleTypesStore } from '/src/stores/saleTypes.js'
import { saleTypeGroupsStore } from '/src/stores/saleTypeGroups.js'
import { taxTypesStore } from '/src/stores/taxTypes.js'
import _ from 'lodash'
export default {
  name: 'SaleTypePicker',
  emits: [ 'sale-type-picker:sale-type-selected' ],
  data () {
    return {
      //  this holds the 'groupSet' object when user chooses a group
      selectedSaleTypes: null
    }
  },
  computed: {
    //  generate an array that can be iterated for the group buttons
    groupSet () {
    let a = []
      _.each(this.saleTypeGroups, group => {
        let obj = {}
        obj.groupTitle = group.title
        obj.groupId = group.id
        let t = _.filter( this.saleTypes, o => {
          return o.sale_type_group == group.id
        })
        obj.saleTypes = t
        a.push(obj)
      })
      return a
    },
    saleTypeGroups () {
      return saleTypeGroupsStore().saleTypeGroups
    },
    saleTypes () {
      return saleTypesStore().saleTypes
    },
    taxTypes () {
      return taxTypesStore().taxTypes
    }
  },
  methods: {
    handleGroupClick ( group ) {
      this.selectedSaleTypes = group
    },
    handleSelectSaleType ( e ) {
      //  get the reactivity off this
      const k = {...e}
      k.tax_types = {...k.tax_types}
      this.$emit('sale-type-picker:sale-type-selected', k)
    }
  }
}
</script>

<style scoped>
.sale-type-picker-wrapper{
  min-height: 66px;
}
</style>
