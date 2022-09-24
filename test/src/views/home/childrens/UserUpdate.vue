<template>
  <el-table :data="$store.state.home.upUserData.slice((currentPage4-1)*pageSize4,currentPage4*pageSize4)" stripe
    style="width: 100%">

    <el-table-column prop="id" label="编号" />
    <el-table-column prop="title" label="名称" />
    <!-- <el-table-column prop="type" label="类型" /> -->
    <el-table-column prop="num" label="门牌号" />
    <el-table-column prop="hometype" label="户型" />
    <el-table-column prop="name" label="户主" />
    <el-table-column label="操作">
      <template #default="scope">
        <el-button size="small" @click="handleEdit(scope.$index, scope.row)">修改</el-button>

        <el-popconfirm confirm-button-text="是" cancel-button-text="否" title="是否确定删除?"
          @confirm="confirmEvent(scope.$index, scope.row)" @cancel="cancelEvent">
          <template #reference>
            <el-button size="small" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
          </template>
          <!-- <el-button size="small" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button> -->
        </el-popconfirm>
      </template>
    </el-table-column>
  </el-table>
  <!-- 分页 -->
  <el-pagination v-model:currentPage="currentPage4" v-model:page-size="pageSize4" 
    layout="total, sizes, prev, pager, next, jumper" :total="$store.state.home.upUserData.length"
    @size-change="handleSizeChange" @current-change="handleCurrentChange" />
    
      <el-button class="add"  size="big" @click="addEdit">添加用户</el-button>

    
  <Dialog />
  <AddDialog />

</template>

<script lang="ts" setup>
// import { Search } from '@element-plus/icons-vue'
import { ref, onMounted, reactive } from 'vue'
import apiUrl from '../../../api/Url.js';
import link from "../../../api/Link.js"
import Dialog from '@/components/Dialog'
import AddDialog from '@/components/AddDialog'

import { useStore } from 'vuex'
let store = useStore()
interface User {
  date: string
  name: string
  address: string
}
let tableData = reactive({
  userData: []
})
const currentPage4 = ref(1)

const pageSize4 = ref(10)

const handleSizeChange = (val: number) => {
  pageSize4.value = val
  console.log(`${val} items per page`)
}
const handleCurrentChange = (val: number) => {
  console.log(`current page: ${val}`)
}
// 修改
const handleEdit = (index: number, row: User) => {
  // store.state.home.dialogFormVisible=true
  store.commit('UP_Dialog',row)
  console.log(index, row)
}
// 删除
const handleDelete = (index: number, row: User) => {
  console.log(index, row)
}
// 确定删除
const confirmEvent = (index: number, row: User) => {
  console.log(index, row)
  store.dispatch('deleteUser',row)
  console.log('confirm!')
}
// 取消删除
const cancelEvent = () => {
  console.log('cancel!')
}
let addEdit = () => {
  store.commit('addDialog')
}
onMounted(() => {
  store.dispatch('UPDATA')
  // store.dispatch('ADDDATA')

})

</script>

<style lang="scss" scoped>
.el-row {
  margin: 0;
  text-align: center;

}
.add{
  // overflow: hidden;
  // width: 100%;
  // height: .625rem;
  // display: flex;
  // // margin-right: .5rem;
  // align-items: center;
  // justify-content: center;
  // text-align: center;
  // margin-top: .625rem;
  position: absolute;
  top: .8rem;
  right: 1.5rem;
}
</style>