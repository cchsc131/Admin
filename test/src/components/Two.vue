<template>
  <div>
    <!-- <h2>住户人数统计</h2> -->
    <div class="two" id="eTwo"></div>
  </div>
</template>

<script setup>
import { inject, onMounted, ref, reactive } from "vue"
import apiUrl from "../api/Url.js"
import link from "../api/Link.js"
let $echarts = inject("echarts")
let xdata = reactive([])
let ydata = reactive([])

onMounted(() => {
  let myChart = $echarts.init(document.getElementById("eTwo"))
  link(apiUrl.chartDataTwo).then((ok) => {
    console.log(ok)
    let data = ok.data
    console.log(data)
    console.log(data.num.外卖)

    myChart.setOption({
      title: {
        text: "每日访客统计",
      },
      tooltip: {},
      xAxis: {
        boundaryGap:false,
        type: "category",
        data: data.day,
      },
      yAxis: {
        type: "value",
      },
      series: [
        {
          name: "外卖",
          type: "line",
          data: data.num.外卖,
        },
        {
          name: "快递",
          type: "line",
          data: data.num.快递,
        },
        {
          name: "一般访客",
          type: "line",
          data: data.num.一般访客,
        },
        {
          name: "授权访客",
          type: "line",
          data: data.num.授权访客,
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
.two {
  height: 18rem;
  width: 100%;
}
</style>
