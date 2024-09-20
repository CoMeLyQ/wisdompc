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
      xAxisData: ["1月", "2月", "3月", "4月", "5月", "6月", "7月"],
      yAxisData1: [0, 0, 0, 0, 0, 0, 0],
      yAxisData2: [0, 0, 0, 0, 0, 0, 0],
      legendData: ["领用", "返修"],
      echart: ref(),
    });
    const makeData = () => {
      axios
        .post("http://114.55.237.18:8086" + "/api/panel/get_line_num", {
          storeroomNumber: "00001",
        })
        .then((response) => {
          console.log("get_line_num");
          console.log(response.data);
          state.xAxisData = [];
          state.yAxisData1 = [];
          state.yAxisData2 = [];
          for (let i = 0; i < response.data.data.length; i++) {
            const element = response.data.data[i];
            state.xAxisData.push(element.month);
            state.yAxisData1.push(element.lyQuantity);
            state.yAxisData2.push(element.fxQuantity);
          }

          echartInit();
        })
        .catch((error) => {
          console.error(error);
        });
    };
    const echartInit = () => {
      // let barWidth = 20;
      var myChart = echarts.init(state.echart);

      // 指定图表的配置项和数据
      var option = {
        title: {
          text: "",
        },
        tooltip: {
          trigger: "axis",
        },
        legend: {
          data:state.legendData,
          right:"0",
          top: "10",
          //图例文字每项之间的间隔
          itemGap: 20,
          textStyle: {
            color: "#ffffff",
            fontSize: 14,
          },
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
              opacity: 0.5,
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
        yAxis: [
          {
            type: "value",
            scale:true,
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
            axisLabel: {
            //   show: false,
            },
          },
        ],
        series: [
          {
            name: "领用",
            type: "line",
            // stack: "Total",
            data: state.yAxisData1,
            
            color: "#FF7502",
            lineStyle:{
                width:1,
            },
            label: {
              show: true,
              position: "top", 
              formatter: "{c}", 
              textStyle: {
                color: "#ffffff",
              },
            },
          },
          {
            name: "返修",
            type: "line",
            // stack: "Total",
            data: state.yAxisData2,
            
            color: "#46F6FF",
            lineStyle:{
                width:1,
            },
            label: {
              show: true,
              position: "top", 
              formatter: "{c}", 
              textStyle: {
                color: "#ffffff",
              },
            },
          },
        ],
      };
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