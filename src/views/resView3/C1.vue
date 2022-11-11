<template>
  <div @click="divClick" class="c1-wrapper">
    <div v-if="hasChildren">
      <font-awesome-icon v-if="showChildren == false" icon="fa-chevron-right" size="sm"/>
      <font-awesome-icon v-if="showChildren == true" icon="fa-chevron-down" size="sm"/>
    </div>
  </div>

</template>

<script>
import { ElMessage } from 'element-plus'
export default {
  name: "c1",
  props:[ 'spaceId', 'showChildren', 'children'],
  emits: [ 'c1-toggle-show-children' ],
  computed: {
    hasChildren () {
      if( this.children.length > 0){
        return true
      } else { return false }
    }
  },
  methods: {
    divClick (e) {
      console.log('divClick', this.spaceId)
      this.$emit( 'c1-toggle-show-children', this.spaceId )
      return false
    }
  }
}
</script>

<style scoped>
  .c1-wrapper {
    min-width: 60px;
    max-width: 60px;
    max-height: 23px;
  }

</style>