<template>
  <el-icon @click='change'>
    <ArrowRightBold v-if="$store.state.home.flag" />
    <ArrowLeftBold v-else />

  </el-icon>

</template>

<script  lang="ts" setup>
// import {ref} from 'vue'
import { useStore } from 'vuex'
import { ArrowRightBold, ArrowLeftBold } from '@element-plus/icons-vue'
let store=useStore()
// let flag=ref(true)
let change=()=>{
  store.commit('CHANGE')
  // vue2的为
  // this.$store.commit()
}
</script>
<style lang="scss">




.el-header>.el-icon{
  margin-top: 1.5rem;
}

</style>