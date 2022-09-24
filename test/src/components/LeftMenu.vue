<template>
  <el-menu active-text-color="#ffd04b" background-color="#545c64" class="el-menu-vertical-demo" default-active="2"
    text-color="#fff" @open="handleOpen" @close="handleClose" :collapse="!$store.state.home.flag" router>
    <template v-for="(item,index) in router.options.routes[2].children" :key="index">
      <el-sub-menu :index="item.path" v-if="item.children">
        <template #title>
          <el-icon>
            <!-- 动态组件 -->
            <component :is="item.meta.icon"></component>
          </el-icon>
          <span>{{item.meta.title}}</span>
        </template>
        <el-menu-item-group v-for="(i,index) in item.children" :key="index">
          <el-menu-item :index="i.path">{{i.meta.title}}</el-menu-item>
        </el-menu-item-group>
      </el-sub-menu>

      <el-menu-item :index="item.path" v-else>
        <el-icon>
          <component :is="item.meta.icon"></component>
        </el-icon>
        <span>{{item.meta.title}}</span>
      </el-menu-item>
    </template>

  </el-menu>
</template>

<script lang="ts" setup>
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
let router =useRouter()
import {
  Document,
  Menu as IconMenu,
  Location,
  Setting,
} from '@element-plus/icons-vue'

onMounted(() => {
  console.log("路由规则",router.options.routes[2].children);
})
const handleOpen = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}
const handleClose = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}
</script>

<style lang="scss">

// .el-sub-menu__title{
//   position: relative;
// }
// ::v-deep .el-icon el-sub-menu__icon-arrow {
//   position: absolute;
//   display: inline-block;
//   color: #000;
//   background-color: aqua;
//   margin-right: 12.125rem;
// }

</style>