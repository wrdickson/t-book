<template>
  <div>{{fCreateCustomer}}</div>
  <el-form
    label-width="120px"
    size="small"
  >
    <el-form-item :label="fFirstName">
      <el-input v-model="form.firstName" type="text"/>
    </el-form-item>
    <el-form-item :label="fLastName">
      <el-input v-model="form.lastName" type="text"/>
    </el-form-item>
    <el-form-item :label="fEmail">
      <el-input v-model="form.email" type="text"/>
    </el-form-item>
    <el-form-item :label="fPhone">
      <el-input v-model="form.phone" type="text"/>
    </el-form-item>
    <el-collapse>
      <el-collapse-item name="Additional customer fields">
        <template #title>
          <span style="margin-left: 120px">{{ $t('message.more') }}</span>
        </template>
        <el-form-item :label="fAddress1">
          <el-input v-model="form.address1" type="text"/>
        </el-form-item>
        <el-form-item :label="fAddress2">
          <el-input v-model="form.address2" type="text"/>
        </el-form-item>
        <el-form-item :label="fCity">
          <el-input v-model="form.city" type="text"/>
        </el-form-item>
        <el-form-item :label="fRegion">
          <el-input v-model="form.region" type="text"/>
        </el-form-item>
        <el-form-item :label="fCountry">
          <el-input v-model="form.country" type="text"/>
        </el-form-item>
        <el-form-item :label="fPostalCode">
          <el-input v-model="form.postalCode" type="text"/>
        </el-form-item>
      </el-collapse-item>
    </el-collapse>
    <el-form-item>
      <el-button :disabled="formIsValid" @click="addCustomer" type="primary">{{ $t('message.createCustomer') }}</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import api from './../api/api.js'
import { accountStore } from './../stores/account.js'
export default {
  name: 'CreateCustomer',
  data () {
    return {
      form: {
        firstName: '',
        lastName: '',
        address1: '',
        address2: '',
        city: '',
        region: '',
        country: '',
        postalCode: '',
        email: '',
        phone: ''
      }
    }
  },
  computed: {
    formIsValid () {
      if(this.form.firstName.length < 1 || this.form.lastName.length < 1){
        return true
      } else { return false }
    },
    fAddress1 () { return this.$i18n.t('message.address') + '1' },
    fAddress2 () { return this.$i18n.t('message.address') + '2' },
    fCity () { return this.$i18n.t('message.city') },
    fCountry () { return this.$i18n.t('message.country') },
    fCreateCustomer () { return this.$i18n.t('message.createCustomer') },
    fEmail () { return this.$i18n.t('message.email') },
    fFirstName () { return this.$i18n.t('message.firstName') },
    fLastName () { return this.$i18n.t('message.lastName') },
    fPhone () { return this.$i18n.t('message.phone') },
    fPostalCode () { return this.$i18n.t('message.postalCode') },
    fRegion () { return this.$i18n.t('message.region') },
    jwt () {
      return userStore().jwt
    }
  },
  methods: {
    addCustomer () {
      console.log('createCustomer()')
      /*
      api.engine.createCustomer(this.form, this.jwt).then( (response) => {
        console.log(response)
      })
      */
    }
  }
}
</script>