<template>
  <el-menu @select="menuSelect" :router="true">
    <el-menu-item index="/Home">{{ $t('message.homePage') }}</el-menu-item>
    <el-menu-item
      v-if="account.permission > 0" 
      index="/resView3">
        resView3
    </el-menu-item>
    <el-menu-item
      v-if="account.permission > 1"
      index="/CreateReservation">
        CreateReservation
    </el-menu-item>
    <el-menu-item
      index="/Composables">
        Composables
    </el-menu-item>
  </el-menu>
</template>

<script>
  import { accountStore } from './../stores/account.js'
  export default {
    name: 'MainMenu',
    emits: [ 'mainMenu-select' ],
    computed: {
      account () {
        return accountStore().account
      }
    },
    methods: {
      menuSelect (a,b,c,d) {
        this.$emit('mainMenu-select')
      }
    }
  }
</script>

<style>
.el-menu-item {
  height: 40px !important;
}
</style>