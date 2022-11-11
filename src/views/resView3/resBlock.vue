<template>
  <div @click="resClicked(resId)" class="resBlock">
    <span v-if="startTruncated && isFirst"><b>&lt&lt</b></span>
    <span v-if="isFirst">{{ shortName }}</span>
    <span class="float-right" v-if="endTruncated && isLast"><b>&gt&gt</b></span>
    <span class="sameAsBackground">.</span>
  </div>
</template>

<script>
export default {
  props: [ 'isFirst', 'isLast', 'resId', 'start', 'end', 'name', 'span', 'startTruncated', 'endTruncated' ],
  name: 'resBlock',
  emits: [ 'resBlockClick' ],
  computed: {
    shortName () {
      if( this.name.length > 7) {
        return this.name.substring(0,7) + '...'
      } else { return this.name}
    }
  },
  methods: {
    resClicked (resId) {
      console.log('clicked', resId)
      this.$emit('resBlockClick', resId)
    }
  }
}
</script>

<style scoped>
.float-right {
  float: right;
}
.resBlock {
    background-color: rgb(166, 196, 149);
    color: rgb(53, 53, 53);
    width: 100%;
    padding-right: 4px;
    padding-left: 4px;
    margin-right: 0px;
    margin-left: 0px;
    border-radius: 0px;
    border-right: 1px solid green;
  }
  .sameAsBackground {
    color: rgb(166, 196, 149);
  }
</style>