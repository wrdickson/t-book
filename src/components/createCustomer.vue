<template>
  <el-config-provider :locale="locale">
    <el-form :model="customerForm" :rules="rules" size="small" ref="createCustomerForm" label-width="120px">
      <el-form-item :label="labelFirstName" prop="firstName">
        <el-input v-model="customerForm.firstName"></el-input>
      </el-form-item>
      <el-form-item :label="labelLastName" prop="lastName">
        <el-input v-model="customerForm.lastName"></el-input>
      </el-form-item>
      <el-form-item :label="labelEmail" prop="email">
        <el-input v-model="customerForm.email"></el-input>
      </el-form-item>
      <el-form-item :label="labelPhone" prop="phone">
        <el-input v-model="customerForm.phone"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('createCustomerForm')">{{ $t('message.createCustomer') }}</el-button>
        <el-button @click="resetForm('createCustomerForm')">{{ $t('message.reset') }}</el-button>
      </el-form-item>

    </el-form>
  </el-config-provider>
</template>
<script>
  import { localeStore } from '/src/stores/locale.js'
  import { accountStore } from '/src/stores/account.js'
  import api from '/src/api/api.js'
  import Schema from 'async-validator';
  Schema.warning = function(){};
  export default {
    name: 'CreateCustomer',
    props: [ 'componentKey' ],
    emits: [ 'createCustomer:customerCreated' ],
    data() {
      return {
        customerForm: {
          firstName: '',
          lastName: '',
          email: '',
          phone: ''
        },
        rules: {
          /*
          alph : [
            { required: true, message: 'pwd required' },
            { min: 8, max: 24, message: '8 to 24 characters'},
            { pattern: /^[A-Za-z0-9_*-]+$/,
              message: 'alphanumeric, underscore, dash & star only' }
          ],
          */
          firstName: [
            { required: true, message: () => this.$t('message.firstNameIsRequired' ) },
            { min: 1, max: 24, message: '1 to 24' }
          ],
          lastName: [
            { required: true, message: () => this.$t('message.lastNameIsRequired') },
            { min: 2, max: 24, message: '2 to 24' }
          ],
          email: [
            { type:'email', message: () => this.$t('message.enterCorrectEmail') }
          ],
          phone: [
            { pattern: /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/,
              message: 'enter a correct phone' }
          ]
        }
      };
    },
    computed: {
      labelEmail () {
        return this.$t('message.email')
      },
      labelFirstName () {
        return this.$t('message.firstName')
      },
      labelLastName () {
        return this.$t('message.lastName')
      },
      labelPhone () {
        return this.$t('message.phone') 
      },
      locale () {
        return localeStore().selectedLocale
      },
      token () {
        return accountStore().token
      }
    },
    methods: {
      submitForm(createCustomerForm) {
        this.$refs[createCustomerForm].validate((valid) => {
          if (valid) {
            api.customers.createCustomer( this.token,
                                          this.customerForm.lastName,
                                          this.customerForm.firstName,
                                          this.customerForm.email,
                                          this.customerForm.phone ).then ( response => {
              console.log(response)
              if(response.data.createCustomer && response.data.newCustomer) {
                this.$emit('createCustomer:customerCreated', response.data.newCustomer)
              }
            })
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(createCustomerForm) {
        this.$refs[createCustomerForm].resetFields();
      }
    },
    watch: {
      componentKey ( newVal ) {
        this.customerForm.firstName = ''
        this.customerForm.lastName = ''
        this.customerForm.email = ''
        this.customerForm.phone = ''
      }
    }
  }
</script>