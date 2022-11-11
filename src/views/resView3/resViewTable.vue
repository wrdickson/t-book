<template>

  <el-table
    ref="resViewTable"
    :data="tableData"
    :row-style="rowStyle"
    height="450"
    style="width: 100%"
    @cell-click="cellClick"
    @empty-block-click="emptyBlockClick">

    <el-table-column fixed prop="title" :label="spaceLabel" width="120">
    </el-table-column>

    <el-table-column prop="expand" fixed width="20">
      <template #default="scope">
        <div data-rel-day="0" style="display: flex; align-items: center;">
          <c1
            :spaceId="scope.row.id"
            :showChildren="scope.row.showChildren"
            :children="scope.row.children"
            @c1-toggle-show-children="c1ToggleShowChildren"
            ></c1>
        </div>
      </template>
    </el-table-column>
    <template v-for="day in tDateArray">
      <el-table-column :prop=day.dayString :label=day.dayLabel width="100">
      <template #default="scope">
        <div style="display: flex; align-items: center;">
          <resBlock
            @resBlockClick="resBlockClick"
            v-if="scope.row[day.dayString + 'resid']"
            :resId="scope.row[day.dayString + 'resid']"
            :start="scope.row[day.dayString + 'start']"
            :end="scope.row[day.dayString + 'end']"
            :name="scope.row[day.dayString + 'customer']"
            :span="scope.row[day.dayString + 'span']"
            :startTruncated="scope.row[day.dayString + 'starttruncated']"
            :endTruncated="scope.row[day.dayString + 'endtruncated']"
            :isFirst = "scope.row[day.dayString + 'isfirst']"
            :isLast = "scope.row[day.dayString + 'islast']"
          />
          <emptyBlock
            @emptyBlockClick="emptyBlockClick"
            v-if="scope.row[day.dayString + 'blocked']"
            :resIdRef="scope.row[day.dayString + 'resIdRef']"
            :start="scope.row[day.dayString + 'start']"
            :end="scope.row[day.dayString + 'end']"
            :span="scope.row[day.dayString + 'span']"
            :startTruncated="scope.row[day.dayString + 'starttruncated']"
            :endTruncated="scope.row[day.dayString + 'endtruncated']"
          />
        </div>
      </template>
      </el-table-column>
    </template>
  </el-table>

</template>

<script>
import resBlock from './resBlock.vue'
import emptyBlock from './emptyBlock.vue'
import c1 from './C1.vue'
import dayjs from 'dayjs'
import _ from 'lodash'
export default {
  name: 'ResViewTable',
  components: { c1, resBlock, emptyBlock },
  emits: [ 'resview-toggle-show-children', 'resBlockClick', 'emptyBlockClick', 'emptyCellClick' ],
  props: [
    'tDateArray',
    'tableData',
    'trigger',
    'resSpaceCopy'
  ],
  data () {
    return {
      iloading: false
    }
  },
  computed: {
    spaceLabel() {
      return this.$t('message.spaceLabel')
    }
  },
  methods: {
    c1ToggleShowChildren ( spaceId ) {
      console.log('resViewTable toggle', spaceId)
      //  tell resView to toggle this
      this.$emit('resview-toggle-show-children', spaceId)
    },
    cellClick ( row, column ) {
      //  get the 'prop' of the colun
      let colProp = column.property
      //  if there's no res data from that column, emit the click
      let resIdKey = colProp + 'resid'
      let blockedKey = colProp + 'blocked'
      if (! row[resIdKey] ){
        let obj = {
          spaceId: row.id,
          selectedDate: dayjs(column.property.substr(1)).format('YYYY-MM-DD')
        }
        //  finally, don't emit from clicks on first two rows:
        //  prop = "description", prop = "expand"
        if( column.property != 'description' && column.property != 'expand') {
          this.$emit( 'emptyCellClick', obj )
        }
      }
    },
    emptyBlockClick ( row, column ) {
      console.log('emptyBlockClick on resViewTable', row, column)
    },
    getChildrenIds( spaceId ) {
      const childrenArr = []
      const getChildren = (spaceId) => {
        let children = _.find(this.resSpaceCopy, (o) => {
          return o.childOf == spaceId
        })
        if( children ) {
          _.each(children, ( child ) => {
            console.log('child', child.id)
            childrenArr.push( child.id )
            getChildren( child.id )
          })
        } else {
          console.log('cArr', childrenArr)
          return childrenArr
        }
      }
      getChildren(spaceId)
    },
    resBlockClick( resId ) {
      //  pass the emitted event up to the parent
      this.$emit('resBlockClick', resId)
    },
    rowStyle ( obj ) {
      //  exclude level 0 items
      if(obj.row.childOf > 0) {
        const childOfRecord = _.find(this.tableData, (o) => {
          return o.id == obj.row.childOf
        })
        if(  childOfRecord.showChildren == true ) {
          return ''
        } else {
          return 'display: none;'
        }
      }
    }
  },
  watch: {
    resSpaceCopy (old, newd){
      console.log('resSpaceCopy change on resViewTable')
    }
  }
}

</script>

<style>
.cell {
  padding: 0px !important;
}
.el-table .el-table__cell{
  padding: 0px !important;
}
.el-scrollbar__bar.is-horizontal{
  height:23px !important;
}
</style>