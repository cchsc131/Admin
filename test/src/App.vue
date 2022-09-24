<template>
<!-- 路由出口 -->
    <router-view />

  <!-- <div id="app"> -->
    <!--要  缓存的路由-->
    <!-- <keep-alive> -->
        <!-- <router-view v-if="$route.meta.keepAlive"></router-view> -->
    <!-- </keep-alive> -->

    <!--不  缓存的路由-->
    <!-- <router-view v-if="!$route.meta.keepAlive"></router-view> -->

  <!-- </div> -->
</template>
<script setup>
import * as echarts from 'echarts'
import {provide} from 'vue'
provide("echarts",echarts)
</script>
<style lang="scss">
html,
body,
#app {
  height: 100%;
}
</style>
