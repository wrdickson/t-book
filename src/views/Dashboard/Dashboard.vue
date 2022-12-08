<template>
  <el-container style="height: 500px;">
    <el-aside width="200px">
      <el-menu class="el-menu-dashboard">
        <el-menu-item @click="hideAllViews(), showSpaceEdit=true" index="1-1">Space Edit</el-menu-item>
        <el-menu-item @click="hideAllViews(), showTaxTypes=true" index="1-2">Tax Types</el-menu-item>
        <el-menu-item index="1-3">item three</el-menu-item>
      </el-menu>
    </el-aside>
    <el-main>
      <SpaceEdit
        v-if="showSpaceEdit"
      >
      </SpaceEdit>
      <TaxTypes v-if="showTaxTypes"></TaxTypes>
    </el-main>
  </el-container>
</template>

<script>
import SpaceEdit from '/src/views/SpaceEdit/SpaceEdit.vue'
import TaxTypes from '/src/views/TaxTypes/TaxTypes.vue'
export default {
  name: 'Dashboard',
  components: {
    SpaceEdit,
    TaxTypes
  },
  data () {
    return {
      showSpaceEdit: false,
      showTaxTypes: false
    }
  },
  methods: {
    hideAllViews () {
      this.showSpaceEdit = false
      this.showTaxTypes = false
    }
  }
}
</script>

<style>

</style>