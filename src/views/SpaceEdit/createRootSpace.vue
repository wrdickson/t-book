<template>
  <el-card>
    <template #header>
      <div class="card-header">
        <span>{{$t('message.createSpace')}}</span>
        <el-button class="button" size="small" @click="emitClose">{{$t('message.close')}}</el-button>
      </div>
    </template>
      <el-form
        :model="form" 
        size="small"
        label-position="right"
        label-width="160px">

        <el-form-item :label="i18Title">
          <el-input v-model="form.title"></el-input>
        </el-form-item>
        <el-form-item :label="i18ChildOf">
          <el-select v-model="form.childOf" placeholder="Select">
              <el-option label="0" value="0"/>
            <template v-for="space in rootSpaces">
              <el-option :label="space.title" :value="space.id" ></el-option>
            </template>
          </el-select>
        </el-form-item>
        <el-form-item :label="i18Type">
          <el-select v-model="form.spaceType">
            <template v-for="spaceType in spaceTypes">
              <el-option :label="spaceType.title" :value="spaceType.id"></el-option>
            </template>
          </el-select>
        </el-form-item>
        <el-form-item :label="i18DisplayOrder">
          <el-input v-model="form.displayOrder"></el-input>
        </el-form-item>
        <el-form-item :label="i18ShowChildren">
          <el-select v-model="form.showChildren" placeholder="Select">
            <el-option :label="i18True" value="1"/>
            <el-option :label="i18False" value="0"/>
          </el-select>
        </el-form-item>
        <el-form-item :label="i18People">
            <el-select v-model="form.people">
              <template v-for="people in peopleArr">
                <el-option :label="people" :value="people"></el-option>
              </template>
            </el-select>
        </el-form-item>
        <el-form-item :label="i18Beds">
          <el-select v-model="form.beds">
            <template v-for="beds in bedsArr">
              <el-option :label="beds" :value="beds"></el-option>
            </template>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button  @click="createSpace">{{$t('message.createSpace')}}</el-button>
        </el-form-item>
      </el-form>
  </el-card>
</template>

<script>
import _ from 'lodash'
export default {
  name: 'createRootSpace',
  props: [ 'rootSpaces', 'spaceTypes' ],
  data () {
    return {
      bedsArr: [1,2,3,4,5,6,7,8,9,10],
      peopleArr: [0,1,2,3,4,5,6,7,8,9,10],
      form: {
        title: null,
        childOf: null,
        spaceType: null,
        displayOrder: null,
        showChildren: null,
        people: null,
        beds: null
      }
    }
  },
  computed: {
    i18Beds () { return this.$i18n.t('message.beds') },
    i18ChildOf () { return this.$i18n.t('message.childOf') },
    i18ConfirmDelete () { return this.$i18n.t('message.confirmDelete') },
    i18CreateSpace () { return this.$i18n.t('message.createSpace') },
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
    createSpace () {
      this.$emit('create-space', this.form)
    },
    emitClose () {
      this.$emit('emit-close')
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