<template>
  <el-config-provider>
  <el-form
    label-width="120px"
    size="small"
  >
    <el-form-item :label="labelCustomer">
      <el-col :span="11">
        <el-input v-model="form.lastName" :placeholder="labelLastName">
        </el-input>
      </el-col>
      <el-col :span="11">
        <el-input v-model="form.firstName" :placeholder="labelFirstName">
        </el-input>
      </el-col>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="searchC">{{ $t('message.searchCustomers') }}</el-button>
    </el-form-item>
  </el-form>
  <el-table
    :data="customers"
    size="small"
    style="width: 100%"
    height="200px"
    @row-click="selectCustomer"
    >
    <el-table-column
      fixed
      prop="lastName"
      :label="labelLastName"
      width="100"
    ></el-table-column>
    <el-table-column
      fixed
      prop="firstName"
      :label="labelFirstName"
      width="100"
    >
    </el-table-column>
    <el-table-column
      prop="email"
      label="Email"
      width="120"
    >
    </el-table-column>
    <el-table-column
      prop="address1"
      label="Address 1"
      width="120"
    >
    </el-table-column>
    <el-table-column
      prop="address2"
      label="Address 2"
      width="120"
    >
    </el-table-column>
    <el-table-column
      prop="city"
      label="City"
      width="120"
    >
    </el-table-column>
    <el-table-column
      prop="region"
      label="Region"
      width="120"
    >
    </el-table-column>
    <el-table-column
      prop="country"
      label="Country"
      width="120"
    >
    </el-table-column>
    <el-table-column
      prop="postalCode"
      label="PostalCode"
      width="120"
    >
    </el-table-column>
  </el-table>
  <el-pagination
    v-model:current-page="currentPage"
    v-model:page-size="pageSize"
    background layout="sizes, prev, pager, next" 
    :total="rowCount" 
    :page-sizes="[1,10,20,30,40,50]"
    />
  <!--
  <div>RowCount: {{rowCount}}</div>
  <div>CurrentPage: {{currentPage}}</div>
  <div>PageSize: {{pageSize}}</div>
  <div>Offset: {{offset}}</div>
  -->
  </el-config-provider>
</template>

<script>
import api from '/src/api/api.js'
import { accountStore } from '/src/stores/account.js'
import { ElNotification } from 'element-plus'
export default {
  name: 'SearchCustomers',
  props: [ 'componentKey' ],
  emits: [ 'searchCustomers:customerSelected' ],
  data () {
    return {
      customers: [],
      form: {
        firstName: '',
        lastName: ''
      },
      currentPage: 1,
      pageSize: 10,
      rowCount: 0
    }
  },
  computed: {
    labelCustomer () {
      return this.$t('message.customer')
    },
    labelFirstName () {
      return this.$t('message.firstName')
    },
    labelLastName () {
        return this.$t('message.lastName')
    },
    offset () {
      return (this.currentPage -1) * this.pageSize
    },
    token () {
      return accountStore().token
    }
  },
  methods: {
    searchC () {
      try {
        api.customers.searchCustomers(this.form.lastName, this.form.firstName, this.token, this.offset, this.pageSize).then( (response) => {
        console.log(response.data)
        this.customers = response.data.customers
        this.rowCount = response.data.count
        }).catch( (error) => {
         ElNotification({
          message: error,
          type: 'warning'
         })
        })
      }
      catch ( error ) {
        //  handle server error here
        ElNotification({
          message: 'Error requesting data from server',
          type: 'warning'
        })
      }
    },
    selectCustomer (e) {
      this.$emit('searchCustomers:customerSelected', e)
    }
  },
  watch: {
    componentKey ( newVal ) {
      this.form.firstName = ''
      this.form.lastName = ''
      this.rowCount = 0
      this.customers = []
      //  reset selectdCustomer
    },
    currentPage ( newval ) {
      this.currentPage = newval
    },
    offset ( newval ) {
      this.searchC()

    },
    pageSize (newval ) {
      this.searchC()
    }
  }
}
</script>

<style>
</style>