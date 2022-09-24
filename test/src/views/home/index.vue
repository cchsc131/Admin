<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="common-layout">
    <el-container>
      <el-aside width="auto">
        <LeftMenu />
      </el-aside>
      <el-container>
        <el-header>
          <HeaderTop/>
        </el-header>
        <el-main>
          <router-view/>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script lang="ts" setup>
import LeftMenu from '../../components/LeftMenu.vue'
import HeaderTop from '../../components/HeaderTop.vue'

</script>

<style lang="scss">


.el-aside{
  background-color: rgb(84, 92, 100);
  height: 100%;
}
.el-header{
  background-color: #fff;
}
.el-main{
  background-color:gainsboro
}
html,body,#app,.common-layout,.el-container,.el-aside{
  height: 100%;
}

</style>