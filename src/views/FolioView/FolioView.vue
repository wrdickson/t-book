<template>
  <div v-if="(taxTypes && saleTypes && saleTypeGroups)">
    <el-row>
      <el-col :span="24">
        <div style="font-size: 1.5em;">Sale items:</div>
        <el-table 
          size="small"
          :data="activeSaleItems"
          :height="200"
          style="width: 100%"
          >
            <el-table-column prop="saleTypeName" label="Type"></el-table-column>
            <el-table-column prop="saleDescription" label="Description"></el-table-column>
            <el-table-column prop="saleAmount" label="Amount"></el-table-column>
            <el-table-column prop="totalTax" label="Tax"></el-table-column>
            <el-table-column prop="totalWithTax" label="Total"></el-table-column>
            <el-table-column>
              <template #default="scope">
                <el-button @click="handleRemoveItem(scope)" type="danger" size="small">Remove</el-button>
              </template>
            </el-table-column>
        </el-table>
        <!--
        <div>selectedSaletype: {{ selectedSaleType }} </div>
        <div>taxRate: {{ taxRate }}</div>
        <div>totalWithTax: {{ totalWithTax }}</div>
        <div>selectedSaleTypeName: {{ selectedSaleTypeName }}</div>
        -->
        <div style="font-size: 1.5em;">Add sale items:</div>
        <div>
          <el-button-group type="primary">
            <template v-for="group in groupSet">
              <el-button @click="handleGroupClick(group)" >
                {{group.groupTitle}}
              </el-button>
            </template>
          </el-button-group>
        </div>
        <div>
          <el-button-group>
            <template v-for="saleType in selectedSaleTypes">
              <el-button @click="handleSelectSaleType(saleType)">
                {{saleType.title}}
              </el-button>
            </template>
          </el-button-group>
        </div>
        <el-form
          size="small"
          :inline="true"
          label-position="top"
          v-if="selectedSaleType"
        >
          <el-form-item label="Type">
            <el-input disabled v-model="selectedSaleType.title"></el-input>
          </el-form-item>
          <el-form-item label="Qty">
            <el-select v-model="selectedSaleType.quantity">
              <template v-for="n in 20">
                <el-option  :label="n" :value="n"></el-option>
              </template>
            </el-select>
          </el-form-item>
          <el-form-item v-if="selectedSaleType.is_fixed_price" label="Amount">
            <el-input disabled v-model="selectedSaleType.fixed_price"></el-input>
          </el-form-item>
          <el-form-item v-if="!selectedSaleType.is_fixed_price" label="Amount">
            <el-input v-model="selectedSaleType.amount"></el-input>
          </el-form-item>

          <el-form-item label="Subtotal">
            <el-input disabled v-model="subtotal"></el-input>
          </el-form-item>

          <el-form-item label="Tax">
            <el-input disabled v-model="totalTax" ></el-input>
          </el-form-item>

          <el-form-item label="Total">
            <el-input disabled v-model="saleTotal"></el-input>
          </el-form-item>

        </el-form>
        <el-form v-if="saleTotal">
          <el-form-item>
            <el-button size="small" type="success">Add to sale</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import { accountStore } from '/src/stores/account.js'
  import { saleTypesStore } from '/src/stores/saleTypes.js'
  import { taxTypesStore } from '/src/stores/taxTypes.js'
  import api from '/src/api/api.js'
  import _ from 'lodash'
  export default {
    name: 'FolioView',
    props: [ 'folioId', 'selectedReservation', 'componentKey' ],
    data () {
      return {
        activeSaleItems: [],
        taxTypes: null,
        saleAmount: null,
        saleDescription: '',
        selectedSaleType: null,
        saleTypes: null,
        saleTypeGroups: null,
        selectedSaleTypes: null
      }
    },
    computed: {
      activeTaxTypes () {
        const a = _.filter( this.taxTypes, o => {
          return o.is_current == 1
        })
        return a
      },
      groupSet () {
        if( this.saleTypeGroups && this.saleTypes ) {
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
        } else {
          return []
        }

      },
      saleItemReady () {
        if( this.selectedSaleType && this.saleDescription && this.totalWithTax > 0 ) {
          return true
        } else { return false }
      },
      saleTotal () {
        if( this.subtotal && this.totalTax ) {
          return Number(Number(this.subtotal) + Number(this.totalTax)).toFixed(2)
        } else {
          return null
        }
      },
      subtotal () {
        if( this.selectedSaleType && this.selectedSaleType.quantity ) {
          if( this.selectedSaleType.is_fixed_price ) {
            return this.selectedSaleType.quantity * this.selectedSaleType.fixed_price
          } else {
            if( this.selectedSaleType.amount ) {
              return Number(this.selectedSaleType.quantity * this.selectedSaleType.amount).toFixed(2)
            } else {
              return null
            }
          }
        } else {
          return null
        }
      },
      taxRate () {
        if( this.selectedSaleType ) {
          const selType = _.find( this.saleTypes, o => {
            return o.id == this.selectedSaleType.id
          })
          const taxArr = selType.tax_types
          let taxRate = 0
          _.each( taxArr, taxId => {
            const selTaxType = _.find(this.taxTypes, o => {
              return o.id == taxId
            })
            taxRate = Number(taxRate) + Number(selTaxType.tax_rate)
          })
          return Number(taxRate).toFixed(2)

        } else {
          return null
        }
      },
      token () {
        return accountStore().token
      },
      totalTax () {
        if(this.taxRate) {
          return (this.subtotal * Number(this.taxRate)).toFixed(2)
        } else {
          return null
        }
      },
      totalWithTax () {
        if(this.taxRate) {
          return (this.saleAmount * ( 1 + Number(this.taxRate))).toFixed(2)
        } else {
          return null
        }
      }
    },
    methods: {
      addSaleItem () {
        const saleItem = {
          saleType: this.selectedSaleType,
          saleTypeName: this.selectedSaleTypeName,
          saleAmount: this.saleAmount,
          totalWithTax: this.totalWithTax,
          taxRate: this.taxRate,
          totalTax: this.totalTax,
          saleDescription: this.saleDescription
        }
        //console.log(saleItem)
        this.activeSaleItems.push(saleItem)

        this.selectedSaleType = null
        this.saleDescription = ''
        this.saleAmount = null
      },
      handleGroupClick ( e ) {
        console.log(e)
        this.selectedSaleTypes = e.saleTypes
        this.selectedSaleType = null
      },
      handleRemoveItem ( scope ) {
        console.log( scope.$index )
        this.activeSaleItems.splice( scope.$index, 1 )
      },
      handleSelectSaleType( saleType ) {
        console.log(saleType)
        this.selectedSaleType = {...saleType}
        if( this.selectedSaleType.fixed_price ) {
          this.selectedSaleType.fixed_price = Number(this.selectedSaleType.fixed_price).toFixed(2)
        }
      }
    },
    created () {
      //  only load tax types if it is null (ie hasn't been loaded yet in store)
      const tTaxTypes = taxTypesStore().taxTypes
      if( !tTaxTypes ) {
        api.taxTypes.getTaxTypes( this.token ).then( response => {
        //  set the store
        taxTypesStore().setTaxTypes(response.data.all_tax_types)
        this.taxTypes = response.data.all_tax_types
        })
      }

      //  only load sale types if it is null ( hasn't been loaded in store)
      const tSaleTypes = saleTypesStore().saleTypes
      if( !tSaleTypes ) {
        api.saleTypes.getSaleTypes( this.token ).then( response => {
        //  set the store
        saleTypesStore().setSaleTypes(response.data.all_sale_types)
        this.saleTypes = response.data.all_sale_types
        })
      }

      api.saleTypeGroups.getSaleTypeGroups( this.token ).then( response => {
        this.saleTypeGroups = response.data.all_sale_type_groups
      })
    },
    watch: {
      folioId ( newVal ) {
        this.selectedSaleType = null
        this.saleDescription = ''
        this.saleAmount = null
        this.activeSaleItems = []
      }
    }
}
</script>