<template>
  <div>
    <el-config-provider :locale="locale">
      <el-select
        v-if="rootSpaces" v-model="selectedRootSpace" :placeholder="placeholder"
      >
        <template v-for="aSpace in availableSpaces">
          <el-option :label="aSpace.title" :value="aSpace.id"></el-option>
        </template>
      </el-select>
    </el-config-provider>
  </div>
</template>

<script>
import api from './../api/api.js'
import _ from 'lodash'
export default {
  name: 'allSpacePicker',
  props: [ 'availableSpaceIds'],
  data () {
    return {
      rootSpaces: null,
      selectedRootSpace: null
    }
  },
  computed: {
    availableSpaces () {
      //  create an array of available spaces, based on
      //  the avalableSpaceIds prop
      if(this.rootSpaces){
        let arr = []
        _.each(this.rootSpaces, (rootSpace) => {
          if( _.includes(this.availableSpaceIds, rootSpace.id) )
          arr.push(rootSpace)
        })
        return arr
      } else {
        return []
      }
    },
    initialSpaceIdSelected () {
      if(this.selectedSpaceId){
        return true
      } else {
        return false
      }

    },
    locale () {
      return this.$i18n
    },
    placeholder () {
      return this.$t('message.select')
    }
  },
  emits: [ 'allSpacePicker:spaceSelected' ],
  created () {
    api.engine.getRootSpaces().then (( response ) => {
      this.rootSpaces = response.data.root_spaces
    })
  },
  watch: {
    selectedRootSpace ( oldVal, newVal ) {
      console.log('dammit')
      this.$emit('allSpacePicker:spaceSelected', this.selectedRootSpace )
    },
    availableSpaceIds (oldval, newval) {
      //  clear the selection when available ids changes,
      //  ie when the dates have changed
      this.selectedRootSpace = null
    }
  }
}
</script>