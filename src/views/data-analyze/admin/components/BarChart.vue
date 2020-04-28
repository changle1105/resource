<template>
  <div :class="className" :style="{height:height,width:width}" />
</template>

<script>
import echarts from 'echarts'
require('echarts/theme/macarons') // echarts theme
import resize from './mixins/resize'
import { getTypeList } from '../../../../api/resource'

export default {
  mixins: [resize],
  props: {
    className: {
      type: String,
      default: 'chart'
    },
    width: {
      type: String,
      default: '100%'
    },
    height: {
      type: String,
      default: '360px'
    }
  },
  data() {
    return {
      chart: null,
      data1: [],
      data2: [],
      data3: [],
      colname: [],
      option: {
        tooltip: {
          trigger: 'axis',
          axisPointer: { // 坐标轴指示器，坐标轴触发有效
            type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        legend: {
          data: ['资源总数', '浏览总数', '收藏总数']
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: {
          type: 'value'
        },
        yAxis: {
          type: 'category',
          data: []
        },
        series: [
          {
            name: '资源总数',
            type: 'bar',
            stack: '总量',
            label: {
              show: true,
              position: 'insideRight'
            },
            data: []
          },
          {
            name: '浏览总数',
            type: 'bar',
            stack: '总量',
            label: {
              show: true,
              position: 'insideRight'
            },
            data: []
          },
          {
            name: '收藏总数',
            type: 'bar',
            stack: '总量',
            label: {
              show: true,
              position: 'insideRight'
            },
            data: []
          }
        ]
      }
    }
  },
  watch: {
    colname: function(newVal, oldVal) {
      this.option.yAxis.data = this.colname
      this.option.series[0].data = this.data1
      this.option.series[1].data = this.data2
      this.option.series[2].data = this.data3
      this.chart.setOption(this.option)
    },
    immediate: true,
    deep: true
  },
  created() {
  },
  mounted() {
    this.fechData()
    this.$nextTick(() => {
      this.initChart()
    })
  },
  beforeDestroy() {
    if (!this.chart) {
      return
    }
    this.chart.dispose()
    this.chart = null
  },
  methods: {
    fechData() {
      getTypeList().then(res => {
        this.data1 = this.getArrayProps(res.data.items, 'files_num')
        this.data2 = this.getArrayProps(res.data.items, 'visit_num')
        this.data3 = this.getArrayProps(res.data.items, 'collect_num')
        this.colname = this.getArrayProps(res.data.items, 'type_name')
      })
    },
    getArrayProps(array, key) {
      var key1 = key || 'value'
      var res = []
      if (array) {
        array.forEach(function(t) {
          res.push(t[key1])
        })
      }
      return res
    },
    initChart() {
      this.chart = echarts.init(this.$el, 'macarons')
      this.chart.setOption(this.option)
    }
  }
}
</script>
