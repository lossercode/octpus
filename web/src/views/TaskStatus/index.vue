<script setup lang="ts">
import { ref, onMounted, reactive } from 'vue'
import * as echarts from 'echarts'
import { useRoute } from 'vue-router'
const container = ref<any>(null)
const categoryData = reactive<number[]>([])
const seriesData = reactive<number[]>([])
const router = useRoute()
let myChart: any = null

const option = {
  title: {
    text: '项目运行速度'
  },
  xAxis: {
    type: 'category',
    data: categoryData
  },
  yAxis: {},
  series: [
    {
      type: 'line',
      data: seriesData,
      large: true
    }
  ]
}

const getWebsocket = () => {
  const ws = new WebSocket('ws://127.0.0.1:7001')
  ws.onopen = () => {
    console.log('连接成功')
    ws.send('' + router.params.id)
  }
  ws.onmessage = (e) => {
    const data = JSON.parse(e.data)
    console.log(data)
    if (data.statu === 'end') {
      ws.close()
      return
    }
    categoryData.push(data.category)
    seriesData.push(data.seriesData)
    if (categoryData.length > 20) {
      categoryData.splice(0, 5)
      seriesData.splice(0, 5)
    }
    myChart.setOption({
      xAxis: {
        data: categoryData
      },
      series: {
        type: 'bar',
        data: seriesData,
        large: true
      }
    })
    setTimeout(() => {
      ws.send('' + router.params.id)
    }, 2000)
  }
  ws.onclose = () => {
    console.log('连接关闭')
  }
  ws.onerror = (e) => {
    console.log(e)
  }
}

onMounted(() => {
  myChart = echarts.init(container.value)
  myChart.setOption(option)
  getWebsocket()
})
</script>
<template>
  <div class="container" ref="container" style="width: 50vw; height: 42vh" />
</template>
<style scoped>
.container {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
</style>
