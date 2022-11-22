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
        <el-button type="primary" @click="submitForm('createCustomerForm')">Create</el-button>
        <el-button @click="resetForm('createCustomerForm')">Reset</el-button>
      </el-form-item>

    </el-form>
  </el-config-provider>
</template>
<script>
  import { localeStore } from './../stores/locale.js'
  import Schema from 'async-validator';
  Schema.warning = function(){};
  export default {
    name: 'CreateCustomer',
    data() {
      return {
        customerForm: {
          firstName: '',
          lastName: '',
          email: '',
          phone: ''
        },
        rules: {
          firstName: [
            { required: true, message: () => this.$t('message.firstNameIsRequired' ) },
            { min: 3, max: 5, message: 'Length should be 3 to 5' }
          ],
          lastName: [
            { required: true, message: () => this.$t('message.lastNameIsRequired') },
            { min: 1, max: 12, message: '1 to 12' }
          ],
          email: [
            { type:'email', message: () => this.$t('message.enterCorrectEmail') }
          ],
          phone: [
            { pattern: /^\+?[1-9][0-9]{7,14}$/,
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
      }
    },
    methods: {
      submitForm(createCustomerForm) {
        this.$refs[createCustomerForm].validate((valid) => {
          if (valid) {
            alert('submit!');
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(createCustomerForm) {
        this.$refs[createCustomerForm].resetFields();
      }
    }
  }
</script>