<template>
  <el-config-provider :locale="locale">
    <el-date-picker
      v-model="selectedDate"
      type="date"
      :placeholder="datepickerPlaceholder"
      :size="size"
    />
  </el-config-provider>
</template>

<script>
import dayjs from 'dayjs'
import { localeStore } from '/src/stores/locale.js'
import { resViewStore } from '/src/stores/resView.js'
export default {
  name: 'singelDatePicker',
  emits: ['singleDatePicker:dateSelected'],
  data () {
    return {
      //selectedDate: dayjs().format('YYYY-MM-DD'),
      selectedDate: resViewStore().startDate,
      size: 'default'
    }
  },
  computed: {
    datepickerPlaceholder () {
      return this.$t('message.datepickerPlaceholder')
    },
    locale () {
      return localeStore().selectedLocale
    },
    resViewStoreStart () {

    }
  },
  mounted () {
    
    //  send a signal to parent that this is date selected
    //this.$emit('singleDatePicker:dateSelected', this.selectedDate)
  },
  watch: {
    selectedDate( newDate, oldDate ) {
      this.$emit('singleDatePicker:dateSelected', this.selectedDate)
    }
  }
}

</script>

<style>
</style>