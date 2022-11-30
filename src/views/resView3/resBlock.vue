<template>
  <div v-if="status == 0" @click="resClicked(resId)" class="resBlockCheckedOut">
    <span v-if="startTruncated && isFirst"><b>&lt</b></span>
    <span v-if="isFirst">{{ shortName }}</span>
    <span class="float-right" v-if="endTruncated && isLast"><b>&gt</b></span>
    <span class="sameAsCheckoutBackground">.</span>
  </div>

  <div v-if="status == 1" @click="resClicked(resId)" class="resBlockCheckedIn">
    <span v-if="startTruncated && isFirst"><b>&lt</b></span>
    <span v-if="isFirst">{{ shortName }}</span>
    <span class="float-right" v-if="endTruncated && isLast"><b>&gt</b></span>
    <span class="sameAsCheckinBackground">.</span>
  </div>
</template>

<script>
export default {
  props: [ 'isFirst', 'isLast', 'resId', 'start', 'end', 'name', 'span', 'startTruncated', 'endTruncated', 'status' ],
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
      this.$emit('resBlockClick', resId)
    }
  }
}
</script>

<style scoped>
.float-right {
  float: right;
}
.resBlockCheckedIn {
    background-color: #67C23A;
    color: rgb(53, 53, 53);
    width: 100%;
    padding-right: 4px;
    padding-left: 4px;
    margin-right: 0px;
    margin-left: 0px;
    border-radius: 0px;
    border-right: 1px solid #000;
  }

  .resBlockCheckedOut {
    background-color: rgb(194, 194, 194);
    color: rgb(53, 53, 53);
    width: 100%;
    padding-right: 4px;
    padding-left: 4px;
    margin-right: 0px;
    margin-left: 0px;
    border-radius: 0px;
    border-right: 1px solid #000;
  }
  .sameAsCheckinBackground {
    color: #67C23A;
  }

  .sameAsCheckoutBackground {
    color: rgb(194, 194, 194);
  }


</style>