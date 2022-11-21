<template>
  <div>
    <el-config-provider :locale="locale">
      <el-form
        label-width="120px"
        size="small"
        >
          <el-form-item :label="labelDates">
            <el-date-picker
              v-model="dRange"
              type="daterange"
              size="small"
              :clearable=false
              :range-separator="rSeperator"
              :start-placeholder="startPlaceholder"
              :end-placeholder="endPlaceholder"
            />
          </el-form-item>
        </el-form>
    </el-config-provider>
  </div>
</template>

<script>
import { localeStore } from './../stores/locale.js'
import { ElMessage } from 'element-plus'
import dayjs from 'dayjs'
export default {
  name: 'DateRangePicker',
  emits: [ 
    'dateRangePicker:rangeSelected',
    'dateRangePicker:clearDates'
  ],
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
    labelDates () {
      return this.$t('message.dates')
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
      if(this.startDate == this.endDate) {
        ElMessage( {
          type: 'warning',
          message: 'Start and end must be different'
        })
        this.$emit('dateRangePicker:clearDates')
      } else {
        const rVal = [
          dayjs(this.dRange[0]).format('YYYY-MM-DD'),
          dayjs(this.dRange[1]).format('YYYY-MM-DD')
        ]
        this.$emit('dateRangePicker:rangeSelected', rVal)
      }
        
    }
  }
  
}
</script>