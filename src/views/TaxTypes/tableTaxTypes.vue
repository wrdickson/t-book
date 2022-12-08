<template>
  <p>Tax Types</p>
  <el-table 
    :data="taxTypes" 
    stripe
    highlight-current-row
    height="200"
    size="small"
    style="width: 100%"
    cell-class-name="t-table-cell"
    table-layout="auto"
    @row-click="rowSelected"
    >
    <el-table-column prop="id" label="Id" width="50"></el-table-column>
    <el-table-column prop="tax_title" label="Title" width="150"></el-table-column>
    <el-table-column prop="tax_rate" label="Tax Rate" width="100"></el-table-column>
    <el-table-column prop="is_current" label="Is Current" width="80"></el-table-column>
    <el-table-column prop="display_order" label="Display Order" width="150"></el-table-column>


  </el-table>
</template>

<script>
  import api from '/src/api/api.js'
  import { accountStore } from '/src/stores/account.js'
  export default {
    name: "TableTaxTypes",
    data () {
      return {
        cellStyle: {
          padding: '5px'
        },
        taxTypes: [],
        tstriped: true
      }
    },
    computed: {
      token () {
        return accountStore().token
      }
    },
    methods: {
      rowSelected ( e ) {
        console.log(e)
      }
    },
    mounted () {
      api.taxTypes.getTaxTypes( this.token ).then( response => {
        console.log(response)
        this.taxTypes = response.data.all_tax_types
      })
    }
  }
</script>

<style>
.tax-table-header-row .cell {
   
  
}
.tax-table-header-row th {

}

.tax-table-header-row {
  background-color: #333 !important;
}

</style>