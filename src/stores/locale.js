import { defineStore } from 'pinia'
import es from 'element-plus/lib/locale/lang/es'
import en from 'element-plus/lib/locale/lang/en'

export const localeStore = defineStore({
  id: 'locale',
  state: () => ({
    /*
    **  <el-config-provider> components that wrap element components
    **  will bind to this value and change locale on the fly
    **  if the value is changed . . . NICE!
    */
    selectedLocale: en
  }),
  actions: {
    setComponentLocale (localeCode) {
      switch(localeCode) {
        case 'en': 
          this.selectedLocale = en
          break;
        case 'es':
          this.selectedLocale = es
          break;
        default:
          this.selectedLocale = en
      }
    }
  }

})