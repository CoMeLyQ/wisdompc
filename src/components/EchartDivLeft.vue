<template>
  <div>
    <div ref="echart" class="echartDiv"></div>
  </div>
</template>
 
<script>
import * as echarts from "echarts";
import { onMounted, toRefs, ref, reactive } from "vue";
import axios from "axios";
export default {
  setup() {
    let state = reactive({
      xAxisData: ["应有", "实有", "领有", "返修"],
      yAxisData: [4123, 2232, 1312, 3452],
      yAxisData1: [],
      echart: ref(),
    });
    const makeData = () => {
      axios
        .post("http://114.55.237.18:8086" + "/api/panel/get_boxtype_num", {
          storeroomNumber: "00001"
        })
        .then((response) => {
          console.log(response.data);
          let arr = [];
          let res_data = response.data.data;
          for (let i = 0; i < state.xAxisData.length; i++) {
            const element = state.xAxisData[i];
            if(element == "应有"){
              arr.push(res_data.gyyQuantity);
            }else if(element == "实有"){
              arr.push(res_data.gsyQuantity);
            }else if(element == "领有"){
              arr.push(res_data.glyQuantity);
            }else if(element == "返修"){
              arr.push(res_data.gfxQuantity);
            }
          }
          state.yAxisData = arr;
          echartInit();
        })
        .catch((error) => {
          console.error(error);
        });

    }
    const echartInit = () => {
      let barWidth = 20;
      var myChart = echarts.init(state.echart);
      let color = new echarts.graphic.LinearGradient(0, 0, 1, 0, [
        {
          offset: 0.5,
          color: "#00A0D4",
        },
        {
          offset: 0.5,
          color: "#05B5EE",
        },
        {
          offset: 1,
          color: "#00A0D4",
        },
      ]);

      new echarts.graphic.LinearGradient(0, 0, 0, 1, [
        {
          offset: 0,
          color: "#D8C601", // 上部颜色
        },
        {
          offset: 0.8,
          color: "#D8C60173", // 上部颜色
        },
        {
          offset: 1,
          color: "#00000073", // 下部颜色
        },
      ]);

      // 指定图表的配置项和数据
      var option = {
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "line", // 默认为直线，可选为：'line' | 'shadow'
          },
          formatter: function (parms) {
            var str =
              parms[0].axisValue + "</br>" + parms[0].marker + parms[0].value;
            return str;
          },
        },
        textStyle: {
          color: "#ffffff",
        },
        grid: {
          containLabel: false,
          left: "10%",
          top: "20%",
          bottom: "10%",
          right: "10%",
        },
        xAxis: {
          type: "category",
          data: state.xAxisData,
          axisLine: {
            lineStyle: {
              color: "#FFFFFF",
            },
          },
          axisTick: {
            show: false,
          },
          axisLabel: {
            margin: 20, //刻度标签与轴线之间的距离。
            textStyle: {
              color: "#ffffff",
            },
          },
        },
        yAxis: {
          type: "value",
          axisLine: {
            show: true,
            lineStyle: {
              color: "#B5B5B5",
            },
          },
          splitLine: {
            lineStyle: {
              // 使用深浅的间隔色
              color: ["#B5B5B5"],
              type: "dashed",
              opacity: 0.2,
            },
          },
          axisLabel: {},
        },
        series: [
          // (1)第二个柱子中间的正方形
          {
            type: "pictorialBar",
            symbol: "diamond",
            symbolSize: [barWidth, 8],
            // symbolOffset: [13, -3],
            symbolOffset: ["0", -3],
            symbolPosition: "end",
            z: 12,
            color: "#08B7E4",
            data: state.yAxisData,
          },

          // (3)第二个柱子 底部的正方形
          // {
          //   name: "",
          //   type: "pictorialBar",
          //   symbol: "diamond",
          //   symbolSize: [barWidth, 5],
          //   // symbolOffset: [13, 3],
          //   symbolOffset: ["0", 3],
          //   color: "#2095a3",
          //   z: 12,
          //   data: state.yAxisData,
          // },

          // (5)第二个柱子, 下方有颜色填充的的柱子
          {
            type: "bar",
            stack: "2",
            barWidth: barWidth,
            itemStyle: {
              opacity: 0.7,
              color: color,
              // barBorderRadius: 0,
              borderRadius: 0,
            },
            // 是否在每个柱子显示 相应的值
            label: {
              show: true,
              position: ["-5", "-25"],
              color: "#08B7E4",
              fontSize: 14,
              fontWeight: "bold",
             
            },
            data: state.yAxisData,
          },
        ],
        // series: [
        //   {
        //     data: state.yAxisData,
        //     stack: "zs",
        //     type: "bar",
        //     barMaxWidth: "auto",
        //     barWidth: 20,
        //     itemStyle: {
        //       color: {
        //         x: 0,
        //         y: 0,
        //         x2: 0,
        //         y2: 1,
        //         type: "linear",
        //         global: false,
        //         colorStops: [
        //           {
        //             offset: 0,
        //             color: "#E3C501",
        //           },
        //           {
        //             offset: 1,
        //             color: "#E3C50100",
        //           },
        //         ],
        //       },
        //     },
        //   },

        //   //下面的立体,控制颜色是color第一个
        //   {
        //     data: state.yAxisData1,
        //     type: "pictorialBar",
        //     barMaxWidth: "20",
        //     symbol: "diamond",
        //     symbolOffset: [0, "80%"],
        //     symbolSize: [20, 10],
        //     zlevel: 2,
        //   },
        //   //上面的立体,控制颜色是color第二个
        //   {
        //     data: state.yAxisData,
        //     type: "pictorialBar",
        //     barMaxWidth: "20",
        //     symbolPosition: "end",
        //     symbol: "diamond",
        //     symbolOffset: [0, "-50%"],
        //     symbolSize: [20, 10],
        //     zlevel: 2,
        //   },
        // ],
      };
      // 使用刚指定的配置项和数据显示图表。
      myChart.setOption(option);
    };

    //挂载
    onMounted(() => {
      makeData();
    });

    return {
      ...toRefs(state),
      echartInit,
      makeData
    };
  },
};
</script>
 
<style scoped>
.echartDiv {
  width: 100%;
  height: 300px;
}
aaa {
  color: #ffeb0f;
  text-align: center;
}
</style>