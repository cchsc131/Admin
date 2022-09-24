<template>
  <el-table :data="tableData.userData.slice((currentPage4-1)*pageSize4,currentPage4*pageSize4)" stripe
    style="width: 100%">
    <!-- <el-table-column prop="id" label="编号" />
    <el-table-column prop="title" label="名称" />
    <el-table-column prop="type" label="类型" />
    <el-table-column prop="num" label="门牌号" />
    <el-table-column prop="hometype" label="户型" />
    <el-table-column prop="name" label="户主" /> -->
    <el-table-column prop="id" label="编号" />
    <el-table-column prop="title" label="名称" />
    <!-- <el-table-column prop="type" label="类型" /> -->
    <el-table-column prop="num" label="门牌号" />
    <el-table-column prop="hometype" label="户型" />
    <el-table-column prop="name" label="户主" />
    <el-table-column>
      <template #header>
        <el-row :gutter="0">
          <el-col :span="18">
            <el-input border-color="red" v-model="search" size="small" placeholder="请输入查询的内容" />
          </el-col>
          <el-col :span="5">
            <el-button @click='searchBtn' :icon="Search" size="small" circle />
          </el-col>
        </el-row>

      </template>
    </el-table-column>
  </el-table>
  <!-- 分页 -->
  <el-pagination v-model:currentPage="currentPage4" v-model:page-size="pageSize4" 
        :current-page="currentPage4"
    layout="total, sizes, prev, pager, next, jumper" :total="tableData.userData.length"
    @size-change="handleSizeChange" @current-change="handleCurrentChange" />
</template>

<script lang="ts" setup>
import {Search} from '@element-plus/icons-vue'
import { ref, onMounted, reactive } from 'vue'
import apiUrl from '../../../api/Url.js';
import link from "../../../api/Link.js"

const currentPage4 = ref(1)

const pageSize4 = ref(10)
let search=ref("")

let searchBtn=()=>{
  console.log(search.value);
  link(apiUrl.userList, 'get', {}, { name:search.value}).then((ok: any) => {
    console.log(ok)
    tableData.userData = ok.data
  })
}
const handleSizeChange = (val: number) => {
  pageSize4.value=val
  console.log(`${val} items per page`)
}
const handleCurrentChange = (val: number) => {
  console.log(`current page: ${val}`)
}
let tableData= reactive({
  userData:[]
})
onMounted(() => {
  link(apiUrl.userList).then((ok:any)=>{
    console.log(ok)  
    tableData.userData =ok.data
  })
})

</script>

<style lang="scss">



.el-row {
  margin:  0;
  text-align: center;
  
}



</style>