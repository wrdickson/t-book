<template>
  <div>
    <el-button-group type="primary">
      <template v-for="group in groupSet">
        <el-button size="small" @click="handleGroupClick(group)" >
          {{group.groupTitle}}
        </el-button>
      </template>
    </el-button-group>
  </div>
</template>

<script>
  import { saleTypeGroupsStore } from '/src/stores/saleTypeGroups.js'
  import { saleTypesStore } from '/src/stores/saleTypes.js'
  import _ from 'lodash'
  export default {
    name: 'SaleGroupSelect',
    emits: [ 'sale-group-select:group-selected' ],
    computed: {
      //  generate an array that can be iterated for the group buttons
      groupSet () {
      let a = []
        _.each(this.saleTypeGroups, group => {
          let obj = {}
          obj.groupTitle = group.title
          obj.groupId = group.id
          let t = _.filter( this.saleTypes, o => {
            return o.sale_type_group == group.id
          })
          obj.saleTypes = t
          a.push(obj)
        })
        return a
      },
      saleTypeGroups () {
        return saleTypeGroupsStore().saleTypeGroups
      },
      saleTypes () {
        return saleTypesStore().saleTypes
      }
    },
    methods: {
      handleGroupClick ( e ) {
        console.log('group click', JSON.parse(JSON.stringify(e)))
        this.$emit('sale-group-select:group-selected', e)
      }
    }
  }
</script>