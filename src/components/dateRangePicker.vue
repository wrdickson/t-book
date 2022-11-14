<template>
  <div>
    <el-config-provider :locale="locale">
      <el-date-picker
        v-model="dRange"
        type="daterange"
        size="small"
        :clearable=false
        :range-separator="rSeperator"
        :start-placeholder="startPlaceholder"
        :end-placeholder="endPlaceholder"
      />
    </el-config-provider>
  </div>
</template>

<script>
import { localeStore } from './../stores/locale.js'
import dayjs from 'dayjs'
export default {
  name: 'DateRangePicker',
  emits: [ 'dateRangePicker:rangeSelected' ],
  data () {
    return {
      dRange: null
    }
  },
  computed: {
    endDate () {
      return dayjs(this.dRange[1]).format('YYYY-MM-DD')
    },
    endPlaceholder () {
      return this.$t('message.endDate')
    },
    locale () {
      return localeStore().selectedLocale
    },
    rSeperator () {
      return this.$t('message.to')
    },
    startDate () {
      return dayjs(this.dRange[0]).format('YYYY-MM-DD')
    },
    startPlaceholder () {
      return this.$t('message.startDate')
    }
  },
  watch: {
    dRange ( oldR, newR ) {
      this.$emit('dateRangePicker:rangeSelected', this.dRange)
    }
  }
  
}
</script>