<template>
  <div>
    <!-- <h2>住户人数统计</h2> -->
    <div class="one" id="eOne"></div>
  </div>
</template>

<script setup>
import { inject, onMounted, ref ,reactive} from "vue"
import apiUrl from '../api/Url.js';
import link from "../api/Link.js"
let $echarts = inject("echarts")
let xdata = reactive([])
let ydata=reactive([])

onMounted(() => {
  let myChart = $echarts.init(document.getElementById('eOne'))
  link(apiUrl.chartDataOne).then(ok => {
    console.log(ok);
    let  data  = ok.data
    console.log(data);
    xdata = data.map(v => v.title)
    ydata=data.map(v=>v.num)
    console.log(xdata);
    myChart.setOption({
    title: {
      text: "住户人数统计",
    },
    tooltip: {},
      xAxis: {
        // type:"category",
      data: xdata,

    },
    yAxis: {
      
    },
    series: [
      {
        name: "销量",
        type: "bar",
        data: ydata,
      },
    ],
  })
  })
  
})
</script>

<style lang="scss">
h2 {
  height: 0.2rem;
  line-height: 0.2rem;
  text-align: center;
  color: rgb(14, 0, 0);
}
.one {
  height: 18rem;
  width: 100%;
}
</style>
