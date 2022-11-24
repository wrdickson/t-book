<template>
  <div>Composables</div>
  <el-button type="success" @click="sayHello">sayHello</el-button>
  <hr/>
  <el-button type="primary" @click="v1 += 1">v1 Increment</el-button>
  <div>v1:{{v1}}</div>
</template>

<script>
import useBlah from '/src/composables/useBlah.js'
export default {
  setup () {
    const { v1, v2, sayHello } = useBlah()

    return { v1, v2, sayHello }
  },
  name: 'Composables',
  mounted () {
    console.log('created')
    console.log('sayh', sayHello )
  }

}
</script>