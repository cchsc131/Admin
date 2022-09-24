<template>
  <div class="content">
    <div class="input">
      <el-input v-model="input" placeholder="请输入缴费金额" clearable />
      <el-button type="success" round @click="MakeQrcode">点击生成二维码</el-button>
    </div>

    <div class="qrcode" ref="QR">

    </div>
  </div>
</template>

<script setup>
import QRcode from 'qrcodejs2'
import { ref,nextTick } from 'vue'
const input = ref('')
let QR = ref()
let MakeQrcode = () => {
  if (input.value == "") {
    alert('请输入缴费金额')
  }
  QR.value.innerHTML=""
  nextTick(() => {
    new QRcode(QR.value, {
      text: input.value,
      colorDark: '#000',
      colorLight: '#fff',
      // width:'.625rem'
    })
  })
}
</script>

<style lang="scss" scoped>
  .content {
    width: 16.1rem;
    text-align: center;
    // align-items: center;
    margin: 0 auto;
  }
  // .content{
  //   margin: 0 auto;

  // }
  .qrcode{
    // display: block;
    // width: 20.5rem;
    text-align: center;

    // width: 6rem;
    // height: 6rem;
    margin: 2.925rem auto;
  }
</style>