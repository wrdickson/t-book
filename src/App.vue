<template>
  <!-- IMPORTANT!!!!
    DO NOT LOAD UNTIL WE HAVE A TOKEN !!!!!
    Token is null when pinia instantiates, will be set to 0 when account (user) is set
    after checking if we have a user/token in localStorage, and verifying that.
    It's an async operation, so we have to wait . . . 
  -->
  <div v-if="authCompleted">
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
      <el-aside width="180px" class="hidden-lg-and-down navAside">
        <MainMenu/>
      </el-aside>
      <el-container>
        <el-header class="navHeader" height="40px">
            <el-menu
              mode="horizontal"
              :ellipsis="true"
            >
              <span class="hidden-xl-and-up"><el-button type="primary" link @click="drawerVisible = true"><font-awesome-icon icon="fa-solid fa-bars" size="2x" /></el-button></span>
              <el-menu-item class="navbarBrand" index="1" style="border-bottom: 0px;">Trekbill.com</el-menu-item>
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
import { saleTypesStore } from './stores/saleTypes.js'
import { saleTypeGroupsStore } from './stores/saleTypeGroups.js'
import { taxTypesStore } from './stores/taxTypes.js'
import { rootSpacesStore } from './stores/rootSpaces.js'
import { paymentTypesStore } from './stores/paymentTypes.js'
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
      authCompleted: false,
      rootSpaces: null,
      saleTypes: null,
      saleTypeGropus: null,
      taxTypes: null
    }
  },
  computed: {
    account() {
      return accountStore().account
    },
    dataLoaded() {
      if( this.authCompleted && this.rootSpaces && this.saleTypes && this.saleTypeGroups && this.taxTypes ) {
        return true
      } else {
        return false
      }
    },
    token() {
      return accountStore().token
    }
  },
  methods: {
    hideDrawer () {
      this.drawerVisible = false
    },
    loadInitialData () {
      //  rootSpaces
      api.rootSpaces.getRootSpaces( this.token ).then( response => {
          rootSpacesStore().setRootSpaces( response.data.root_spaces_children_parents )
          this.rootSpaces = response.data.root_spaces_children_parents
      })

      //  saleTypes
      api.saleTypes.getSaleTypes( this.token ).then( response => {
        //  set the store
        saleTypesStore().setSaleTypes(response.data.all_sale_types)
        this.saleTypes = response.data.all_sale_types
      })

      //  sale type groups
      api.saleTypeGroups.getSaleTypeGroups( this.token ).then( response => {
        saleTypeGroupsStore().setSaleTypeGroups( response.data.all_sale_type_groups )
        this.saleTypeGroups = response.data.all_sale_type_groups
      })

      // tax types
      api.taxTypes.getTaxTypes( this.token ).then( response => {
        //  set the store
        taxTypesStore().setTaxTypes(response.data.all_tax_types)
        this.taxTypes = response.data.all_tax_types
      })

      // payment types
      api.paymentTypes.getActivePaymentTypes( this.token ).then ( response => {
        paymentTypesStore().setActivePaymentTypes( response.data.active_payment_types )
        this.activePaymentTypes = response.data.active_payment_types
      })
    },
    showDrawer () {
      this.drawerVisible = true
    }
  },
  created() {
    //  check for a user in localstorage
    const account = JSON.parse(localStorage.getItem('account'))
    const token = localStorage.getItem('token')
    
    if (account && token != 0) {
      api.account.authorizeToken( token ).then( (response) => {
        console.log('auth token @ refresh', token)
        console.log('response', response)
        if(response.data.decoded.account){
          accountStore().setAccount( response.data.decoded.account )
          accountStore().setToken( token )
          this.authCompleted = true
          this.loadInitialData()
        }
      }).catch( err => {
        accountStore().setAccountToGuest()
        this.authCompleted = true
        this.loadInitialData
        this.$router.push('/Login')
      })
    } else {
      accountStore().setAccountToGuest()
      this.authCompleted = true
      this.loadInitialData
      this.$router.push('/Login')
    }
  }
}
</script>

<style>
  body{
    font-family: Tahoma, Verdana, sans-serif;
  }
  .navAside {
    background-color: rgb(12, 34, 2);
  }
  .flex-grow {
    flex-grow: 1;
  }
  .navbarBrand {
    font-size: 20px;
  }
  .el-main {
    padding-top: 0px !important;
  }
</style>
