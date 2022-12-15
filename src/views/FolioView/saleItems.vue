<template>
  <el-table 
    size="small"
    :data="saleItems"
    style="width: 100%"
    >
      <el-table-column prop="saleTitle" width="140" label="Type"></el-table-column>
      <el-table-column prop="description" label="Description"></el-table-column>
      <el-table-column prop="saleQuantity" width="40" label="Qty"></el-table-column>
      <el-table-column prop="salePrice" width="60" label="Price"></el-table-column>
      <el-table-column prop="saleSubtotal" width="80" label="Subtotal"></el-table-column>
      <el-table-column prop="saleTax" width="60" label="Tax"></el-table-column>
      <el-table-column prop="saleTotal" width="60" label="Total"></el-table-column>
      <el-table-column width="40">
        <template #default="scope">
          <el-button @click="handleRemoveItem(scope)" type="danger" size="small">X</el-button>
        </template>
      </el-table-column>
  </el-table>
</template>

<script>
export default {
  name: 'SaleItems',
  props: [ 'saleItems' ],
  emits: [ 'sale-items:remove-at-index' ],
  data () {
    return {

    }
  },
  computed: {
    saleItemsExist () {
      if( this.saleItems.length > 0 ) {
        return true
      } else { return false }
    }
  },
  methods: {
    handleRemoveItem( scope ) {
      console.log(scope)
      this.$emit('sale-items:remove-at-index', scope.$index )
    }
  },
  watch: {
    saleItems ( newVal ) {
      console.log('new prop on saleItems component', newVal )
    }
  }
}
</script>
