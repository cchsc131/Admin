<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="index">

    <div class="login-con">
      <ul class="menu-tab">
        <li v-for="(item,i) in Tabs" :key="i" 
          :class="{ current: item.current }"

        @click="menuClick(item)"
        >{{item.txt}}</li>
      </ul> 
      <!-- 表单部分 -->
      <el-form
    ref="ruleFormRef"
    :model="ruleForm"
    status-icon
    :rules="rules"
    class="demo-ruleForm"
  >
    <div class="yhm">
      <el-form-item  label="邮箱" prop="username">
      <!-- <label for="">用户名</label> -->
      <el-input v-model="ruleForm.username" type="text"  />
    </el-form-item>
    </div>

    <div class="yhm">
      <el-form-item label="密码" prop="password">
      <!-- <label for="">密码</label> -->
      <el-input
        v-model="ruleForm.password"
        type="password"
        minlength="6"
            maxlength="15"
      />
    </el-form-item>
    </div>

    <div class="yhm">
      <el-form-item label="重复密码" prop="passwords" v-if="model==='register'">
      <el-input 
        type="password"
         v-model="ruleForm.passwords"
         minlength="6"
            maxlength="15" />
    </el-form-item>
    </div>

    <div class="yhm">
      <el-form-item>
      <el-button type="primary" class="login-btn block" @click="submitForm(ruleFormRef)"
        :disabled="btn"
        >{{model==='login'?"登录":"注册"}}</el-button
      >
      <!-- <el-button @click="resetForm(ruleFormRef)">Reset</el-button> -->
    </el-form-item>
    </div>
  </el-form>
    </div>
    
  </div>
</template>

<script lang="ts" setup>
import type { FormInstance}  from 'element-plus';
import { reactive, ref ,onMounted ,watch} from 'vue'
import * as ck from '../../util/verification.js'
import link from  "../../api/Link.js"
import apiUrl from '../../api/Url.js';
import md5User from '../../hook/index.js'
import type {ElMessage}  from 'element-plus'
import {useRouter} from 'vue-router'
let router=useRouter()

onMounted(() => {
  console.log(process.env.VUE_APP_API);
})
const Tabs = reactive([
  {txt:'登录',current:true,type:"login"},
  {txt:'注册',current:false,type:"register"}
])
// 用ref创建的要用.value
const model=ref("login")
const menuClick=(v:any)=>{
  Tabs.forEach(i=>{
    i.current=false
  })
  v.current=true
  model.value=v.type
}

// var uPattern = /^[a-zA-Z0-9_-]{4,16}$/;
// console.log(uPattern.test("iFat3"));
      // <!-- 表单部分 -->
const ruleFormRef = ref<FormInstance>()


const checkUser = (rule: any, value: any, callback: any) => {
  // var ckUser =  /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/
  if (value === '') {
    return callback(new Error('请输入邮箱!'))
  } else if(!ck.CkEmail(value)){
    callback(new Error('邮箱格式不正确！'))
  } else {
    callback()
  }
}
const password = (rule: any, value: any, callback: any) => {
  // var ckPwd=/^(?=.*\d)(?=.*[a-zA-Z])[\da-zA-Z~!@#$%^&*]{6,15}$/
  if (value === '') {
    callback(new Error('请输入密码！'))
  } else if (!ck.CkPwd(value)){
    callback(new Error("密码长度6-15位  字符串类型：数字 英文 特殊符号且必须包含数字及英文 !"))
  } else {
    callback()
  }
}
const checkpassword = (rule: any, value: any, callback: any) => {
  // 在登录时没有重复密码的校验
  if(model.value==='login'){
    callback()
  }
  // var ckUser =  /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/
  if (value === '') {
    return callback(new Error('请输入重复密码!'))
  } else if(value!=ruleForm.password){
    callback(new Error('两次密码不一致！'))
  } else {
    callback()
  }
}
const ruleForm = reactive({
  username:'',
  password: "",
  passwords: "",
  pass: '',
  checkPass: '',
  age: ''
})
let btn=ref(true)
// 监听数据的变化
watch(ruleForm,(newVal,oldVal)=>{
  console.log(newVal)
  if(model.value==='login'){
    if(newVal.username!="" && newVal.password!=""){
      btn.value=false
    }else{
      btn.value=true
    }
  }else{
    if(newVal.username!="" && newVal.password!="" && newVal.passwords!=""){
      btn.value=false
    }else{
      btn.value=true
    }
  }
})
const rules = reactive({
  username: [{ validator: checkUser, trigger: 'blur' }],
  password: [{ validator: password, trigger: 'blur' }],
  passwords: [{ validator: checkpassword, trigger: 'blur' }],
})

const submitForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.validate((valid) => {
    if (valid) {
      let data={
        name:ruleForm.username,
        pwd: md5User(ruleForm.password).value
      }
      if(model.value==='register'){
        console.log("注册");
        link(apiUrl.register,'POST',data).then((ok:any)=>{
        console.log(ok.data);
        if(Object.keys(ok.data).length!=0){
            ElMessage({
              message: '注册成功',
              type: 'success',
            })
           model.value='login'
        Tabs[0].current=true
        Tabs[1].current=false
        }else{
           ElMessage('注册失败')
        }
        
      })
      }else{
        // 按钮为登录时
         link(apiUrl.register,'GET',{},{name:ruleForm.username,pwd:md5User(ruleForm.password).value}).then((ok:any)=>{
         console.log(ok.data);
            if(Object.keys(ok.data).length!=0){
                ElMessage({
                  message: '登录成功',
                  type: 'success',
                })
                router.push('/home')
            }else{
              ElMessage.error('登录失败')

        }
        
      })
        console.log("登录");
      }
      
    } else {
      console.log('error submit!')
      return false
    }
  })
}

const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.resetFields()
}
</script>

<style lang="scss" scoped>
.index{
  background-color: #000066;
  height: 100%;
}
.menu-tab{
  // align-items: center;
  text-align: center;
  // display: flex;
  // justify-content: center;
    li {
    margin-top: 6.5625rem;
    display: inline-block;
    width: 5%;
    line-height: 2.5rem;
    font-size: 14px;
    color: #fff;
    border-radius: 2px;
    cursor: pointer;
  
  }
  
  
}
// .demo-ruleForm{
//     width: 50%;
//     margin: 1.625rem auto;
//     font-size: 14px;
//     color: #fff;
//     label{
//       display: block;
//       margin-bottom: .1875rem;
//     }
    .login-btn{
      // margin: 0 auto;
      align-items: center;
      width: 20%;
      margin: 0 auto;
      margin-top: 2.3125rem;
    }
//   }
.current {
    background-color: rgba(255, 255, 255, 0.5);
    // background-color:brown
}
// ::v-deep .el-form-item__content{
//   display: flex;
//   justify-content: space-around;
//   text-align: center;

// }
::v-deep .el-form-item__label{
  // display: inline-block;
  font-size: 14px;
    color: #fff;
    width: 20%;
}

.yhm{ 
      margin: 0 auto;
      margin-top: 1.8rem;
      
  width: 30%;
//   display: flex;
// // justify-content: space-around;
}
::v-deep .el-form-item__content{
    // display: inline-block;

      width: 12.5rem;
  // margin-right: 0;
}
</style>