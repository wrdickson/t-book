<template>
  <el-button-group>
    <template v-for="saleType in selectedGroup.saleTypes">
      <el-button type="primary" size="small" plain @click="handleSelectSaleType(saleType)">
        {{saleType.title}}
      </el-button>
    </template>
  </el-button-group>
</template>

<script>
  export default {
    name: 'SaleTypeSelect',
    props: ['selectedGroup'],
    emits: [ 'sale-type-picker:sale-type-selected' ],
    data () {
      return {
        
      }
    },
    methods: {
      handleSelectSaleType(saleType) {
        this.$emit('sale-type-picker:sale-type-selected', saleType )
      }
    }
  }
</script>