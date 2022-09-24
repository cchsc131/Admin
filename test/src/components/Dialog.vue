<!-- eslint-disable vue/multi-word-component-names -->
<template>


  <!-- Form -->
  <!-- </el-input> -->

  <el-dialog v-model="$store.state.home.dialogFormVisible" title="请输入修改信息">
    <el-form :model="form" :label-width="formLabelWidth">
      <!-- <el-form-item label="编号" :label-width="formLabelWidth">
        <el-input v-model="form.id" autocomplete="off" />
      </el-form-item> -->
      <el-form-item label="名称" :label-width="formLabelWidth">
        <el-input v-model="form.title" autocomplete="off" />
      </el-form-item>
      <el-form-item label="门牌号" :label-width="formLabelWidth">
        <el-input v-model="form.num" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="户型" :label-width="formLabelWidth">
        <el-input v-model="form.hometype" autocomplete="off" />
      </el-form-item>
      <el-form-item label="户主" :label-width="formLabelWidth">
        <el-input v-model="form.name" autocomplete="off" />
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="confirm(1)">取消</el-button>
        <el-button type="primary" @click="confirm(2)">确定</el-button>
      </span>
    </template>
  </el-dialog>
</template>
<script lang="ts" setup>
import { reactive, ref ,onMounted} from 'vue'
import {useStore} from 'vuex'
import apiUrl from '../api/Url.js';
import link from "../api/Link.js"
let store=useStore()
const dialogTableVisible = ref(false)
const dialogFormVisible = ref(false)
const formLabelWidth = '140px'

const form = reactive({
  // id:'',
  name: '',
  title: '',
  num: '',
  hometype: '',
})
let confirm=(v:number)=>{
  store.commit('Dialog')
  if(v===2){
    
    let data = {
      // id:form.id,
      name: form.name,
      title: form.title,
      num: form.num,
      hometype: form.hometype, 
    }
    link(apiUrl.userList + "/" + store.state.home.userData.id, 'put', data).then((ok:any)=>{
      console.log(ok.data);
      
    })
  }
}
onMounted(() => {
  console.log(form.name);
    console.log(store.state.home.userData);
})
</script>
<style lang="scss">
.el-button--text {
  margin-right: 15px;
}

.el-select {
  width: 300px;
}

.el-input {
  width: 300px;
}

.dialog-footer button:first-child {
  margin-right: 10px;
}
</style>
