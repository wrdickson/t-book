<template>
  <h1>{{ $t('message.logoff')}}</h1>
  <p>{{ $t('message.loggedInAs') }} <b>{{ user }}</b></p>
  <el-button @click="logoff">{{ $t('message.logoff')}}</el-button>
</template>

<script>
import { accountStore } from './../stores/account.js'
export default {
  name: 'Logoff',
  computed: {
    user () {
      return accountStore().account.username
    }
  },
  methods: {
    logoff () {
      accountStore().setAccountToGuest()
      this.$router.push('/Login')
    }
  }
}
</script>