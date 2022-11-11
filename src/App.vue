<template>
  <!-- IMPORTANT!!!!
    DO NOT LOAD UNTIL WE HAVE A TOKEN !!!!!
    it is null when pinia instantiates, will be set to 0 when account (user) is set
  -->
  <div v-if="authCompleted && token">
    <el-drawer
      v-model="drawerVisible"
      size="180px"
      direction="ltr"
      :with-header="false"
      :show-close="false"
      >
        <MainMenu @mainMenu-select="hideDrawer"/>
    </el-drawer>
    <el-container>
      <el-aside width="180px" class="hidden-sm-and-down navAside">
        <MainMenu/>
      </el-aside>
      <el-container>
        <el-header class="navHeader">
            <el-menu
              mode="horizontal"
              :ellipsis="false"
            >
              <span class="hidden-md-and-up"><el-menu-item @click="showDrawer"><font-awesome-icon icon="fa-solid fa-bars" size="2x" /></el-menu-item></span>
              <el-menu-item class="navbarBrand" index="1">Trekbill.com</el-menu-item>
              <div class="flex-grow"/>
              <userMenu :account="account"/>
              <localeSwitch/>
            </el-menu>
        </el-header>
        <el-main style="margin-top: 0px !important;">
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import { accountStore } from './stores/account.js'
import api from './api/api.js'
import MainMenu from './components/mainMenu.vue'
import userMenu from './components/userMenu.vue'
import localeSwitch from './components/localeSwitch.vue'
import _ from 'lodash'
export default {
  components: {
    MainMenu, userMenu, localeSwitch
  },
  data () {
    return {
      drawerVisible: false,
      //  we don't want the app to start until we have completed
      //  the auth process, the v-if in the wrapper div above
      //  will accomplish this
      authCompleted: true
    }
  },
  computed: {
    account: () => {
      return accountStore().account
    },
    token: () => {
      return accountStore().token
    }
  },
  methods: {
    hideDrawer () {
      this.drawerVisible = false
    },
    showDrawer () {
      this.drawerVisible = true
    }
  },
  created() {
    //  check for a user in localstorage
    const account = JSON.parse(localStorage.getItem('account'))
    const token = localStorage.getItem('token')
    
    if (account && token) {
      api.account.authorizeToken( token ).then( (response) => {
        console.log('auth token @ refresh', token)
        console.log('response', response)
        if(response.data.decoded.account){
          accountStore().setAccount( response.data.decoded.account )
          accountStore().setToken( token )
        }
      }).catch( err => {
        console.log(err)
        accountStore().setAccountToGuest()
        this.$router.push('/Login')
      })
    }
  }
}
</script>

<style>
  body{
    font-family: Tahoma, Verdana, sans-serif;
  }
  .navAside {
    background-color: rgb(39, 105, 8);
  }
  .flex-grow {
    flex-grow: 1;
  }
  .el-drawer__header{
    display: none !important;
  }
  .navbarBrand {
    font-size: 20px;
  }
  .el-main {
    padding-top: 0px !important;
  }
</style>
