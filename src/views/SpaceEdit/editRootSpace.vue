<template>
  <el-card>
    <template #header>
      <div class="card-header">
        <span>{{$t('message.editSpace')}}</span>
        <el-button class="button" size="small" @click="emitClose">{{$t('message.close')}}</el-button>
      </div>
    </template>
      <el-form
        :model="selectedSpace" 
        size="small"
        label-position="right"
        label-width="160px">

        <el-form-item :label="i18Title">
          <el-input v-model="selectedSpace.title"></el-input>
        </el-form-item>
        <el-form-item :label="i18ChildOf">
          <el-select v-model="selectedSpace.childOf" placeholder="Select">
            <el-option label="0" value="0"></el-option>
            <template v-for="space in rootSpaces">
              <el-option :label="space.title" :value="space.id" ></el-option>
            </template>
          </el-select>
        </el-form-item>
        <el-form-item :label="i18Type">
          <el-select v-model="selectedSpace.spaceType">
            <template v-for="spaceType in spaceTypes">
              <el-option :label="spaceType.title" :value="spaceType.id"></el-option>
            </template>
          </el-select>
        </el-form-item>
        <el-form-item :label="i18DisplayOrder">
          <el-input v-model="selectedSpace.displayOrder"></el-input>
        </el-form-item>
        <el-form-item :label="i18ShowChildren">
          <el-select v-model="selectedSpace.showChildren" placeholder="Select">
            <el-option :label="i18True" value="1"/>
            <el-option :label="i18False" value="0"/>
          </el-select>
        </el-form-item>
        <el-form-item :label="i18People">
            <el-select v-model="selectedSpace.people">
              <template v-for="people in peopleArr">
                <el-option :label="people" :value="people"></el-option>
              </template>
            </el-select>
        </el-form-item>
        <el-form-item :label="i18Beds">
          <el-select v-model="selectedSpace.beds">
            <template v-for="beds in bedsArr">
              <el-option :label="beds" :value="beds"></el-option>
            </template>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="updateSpace">{{$t('message.update')}}</el-button>
        </el-form-item>
      </el-form>
      <el-divider/>
      <div>
        <el-popconfirm 
          :title="i18ConfirmDelete"
          :confirm-button-text="i18Yes"
          :cancel-button-text="i18No"
          @confirm="deleteSpace">
          <template #reference>
            <el-button size="small" style="float: right; margin-top: -15px; margin-bottom: 10px;" type="danger">{{i18DeleteSpace}}</el-button>
          </template>
        </el-popconfirm>
      </div>
  </el-card>

</template>

<script>
import _ from 'lodash'
export default {
  name: 'editRootSpace',
  props: [ 'rootSpaces', 'spaceTypes', 'selectedSpace' ],
  emits: [ 'update-space', 'emit-close', 'delete-space' ],
  data () {
    return {
      bedsArr: [1,2,3,4,5,6,7,8,9,10],
      peopleArr: [0,1,2,3,4,5,6,7,8,9,10],
      showSpaceEdit: false
    }
  },
  computed: {
    i18Beds () { return this.$i18n.t('message.beds') },
    i18ChildOf () { return this.$i18n.t('message.childOf') },
    i18ConfirmDelete () {return this.$i18n.t('message.confirmDelete') },
    i18DeleteSpace () {
      return this.$i18n.t('message.delete') + ' ' + this.$i18n.t('message.spaceLabel')
    },
    i18DisplayOrder () { return this.$i18n.t('message.displayOrder') },
    i18False () { return this.$i18n.t('message.false') },
    i18No () {return this.$i18n.t('message.no') },
    i18People () { return this.$i18n.t('message.people') },
    i18ShowChildren () { return this.$i18n.t('message.showChildren') },
    i18True () { return this.$i18n.t('message.true') },
    i18Title () { return this.$i18n.t('message.title') },
    i18Type () { return this.$i18n.t('message.type') },
    i18Yes () { return this.$i18n.t('message.yes') }
  },
  methods: {
    deleteSpace () {
      this.$emit('delete-space', this.selectedSpace)
    },
    emitClose () {
      this.$emit('emit-close')
    },
    updateSpace () {
      this.$emit( 'update-space', this.selectedSpace )
    }
  },
  created () {
  }
}
</script>

<style>
.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>