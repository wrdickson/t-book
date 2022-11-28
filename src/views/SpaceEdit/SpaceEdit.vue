<template>
 
  <el-row>
    <el-col :span="12">
      <el-button @click="showCreateSpace = true" type="primary" size="small">{{$t('message.createSpace')}}</el-button>
      <el-divider/>
      <rootSpaceTree
        v-if="rootSpaces"
        :rootSpaces="rootSpaces"
        @node-selected="nodeSelected"
      ></rootSpaceTree>
    </el-col>
    <el-col :span="12">
      <p style="color: #ff0000;">This is for setup only.  If we are actually editing/ adding/ removing in a situation where we had reservations in db, we would need to recalculate all reservations to reflect changes.  Probably move some to an 'unassigned' category.  Complicated.</p>
      <editRootSpace
        v-if="rootSpaces && spaceTypes && selectedSpace"
        :rootSpaces="rootSpaces"
        :spaceTypes="spaceTypes"
        :selectedSpace="selectedSpace"
        @update-space="updateSpace"
        @emit-close="unselectSpace"
        @delete-space="deleteSpace"
      >
      </editRootSpace>
      <createRootSpace
        v-if="rootSpaces && spaceTypes && showCreateSpace"
        :rootSpaces="rootSpaces"
        :spaceTypes="spaceTypes"
        @emit-close="showCreateSpace = false"
        @create-space="createSpace"
      >
      </createRootSpace>
    </el-col>
  </el-row>
</template>

<script>
import { accountStore } from '/src/stores/account.js'
import _ from 'lodash'
import api from '/src/api/api.js'
import RootSpaceTree from '/src/views/SpaceEdit/rootSpaceTree.vue'
import editRootSpace from '/src/views/SpaceEdit/editRootSpace.vue'
import createRootSpace from '/src/views/SpaceEdit/createRootSpace.vue'
export default {
    name: 'SpaceEdit',
    components: { editRootSpace, RootSpaceTree, createRootSpace },
    data() {
      return {
        selectedSpace: null,
        showCreateSpace: false,
        rootSpaces: null,
        spaceTypes: null
      };
    },
    computed: {
        token() {
            return accountStore().token;
        },
        account() {
            return accountStore().account;
        }
    },
    created() {
    },
    methods: {
        createSpace( obj ) {
            const beds = obj.beds
            const childOf = obj.childOf
            const displayOrder = obj.displayOrder
            const people = obj.people
            const showChildren = obj.showChildren
            const spaceType = obj.spaceType
            const title = obj.title
            api.rootSpaces.createRootSpace( this.token, beds, childOf, displayOrder, people, showChildren, spaceType, title ).then( (response) => {
              if(response.data.create > 0){
              const sorted = _.sortBy(response.data.root_spaces_children_parents, 'displayOrder')
              this.rootSpaces = sorted
              } else {
                //error
                alert('error')
              }
            })
        },
        deleteSpace ( space ) {
          console.log('d:', space )
          api.engine.deleteSpace ( space.id, this.jwt ).then( (response) => {
            if(response.data.execute == true){
            const sorted = _.sortBy(response.data.root_spaces_children_parents, 'show_order')
            this.rootSpaces = sorted
            } else {
              //error
            }
          })
        },
        nodeSelected ( rootSpace ) {
          this.selectedSpace = rootSpace
        },
        unselectSpace () {
          this.selectedSpace = null
        },
        updateSpace ( uSpace ) {
          console.log('uSpace on parent', uSpace)
          api.rootSpaces.updateRootSpace( this.token, uSpace ).then( (response) => {
            console.log(response.data)
            //const sorted = _.sortBy(response.data.root_spaces_children_parents, 'displayOrder')
            //this.rootSpaces = sorted
          })
        }
    },
    mounted () {
      //  load root spaces
      api.rootSpaces.getRootSpaces( this.token ).then( response => {
        this.rootSpaces = response.data.root_spaces_children_parents
      })

      api.spaceTypes.getSpaceTypes().then( (response) => {
        console.log('st response', response)
        this.spaceTypes = response.data.space_types
      })

    }
}
</script>