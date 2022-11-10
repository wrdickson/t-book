<template>
    <el-sub-menu class=userControl v-if="account.id > 0" index="12" :router="true">
      <template #title>{{ account.username }}</template>
      <el-menu-item @click="navToLogoff" index="Logoff">{{ $t('message.logoff')}}</el-menu-item>
    </el-sub-menu>
    <el-menu-item v-if="account.id < 1" @click="navToLogin" index="36">
      {{ $t('message.login') }}
    </el-menu-item> 
</template>

<script>
import { accountStore } from './../stores/account.js'
export default {
  props: [ 'account' ],
  components: {
    accountStore
  },
  name: 'userMenu',
  methods: {
    navToLogin () {
      this.$router.push('/Login')
    },
    navToLogoff () {
      this.$router.push('/Logoff')
    }
  }
}
</script>
<style>
.userControl{
  max-height: 40px !important;
}
</style>