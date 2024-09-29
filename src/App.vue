<template>
  <div
    id="app"
    style="
      display: flex;
      flex-direction: column;
      min-width: 1920px;
      min-height: 1080px;
      margin: 0;
      padding: 0;
      position: relative;
    "
  >
    <img class="back_image" :src="back_image" />
    <div class="header_view">
      <img class="logo_view" :src="logo_image" alt="" />
      <img class="header_image_a1" :src="a1" alt="" />
    </div>
    <!--  -->
    <div class="header_two_view">
      <div class="two_view_row" style="left: 70px">
        <img class="two_view_icon" :src="a7" alt="" />
        <div class="info_view">
          <div class="info_num">{{ totalNumber }}</div>
          <div class="info_title">库存总量</div>
        </div>
      </div>
      <!--  -->
      <div class="two_view_row" style="left: calc(50% - 513px / 2)">
        <img class="two_view_icon" :src="a8" alt="" />
        <div class="info_view">
          <div class="info_num">{{ totalWarning }}</div>
          <div class="info_title">库存预警</div>
        </div>
      </div>
      <!--  -->
      <div class="two_view_row" style="right: 70px">
        <img class="two_view_icon" :src="a9" alt="" />
        <div class="info_view">
          <div class="info_num">{{ lyWarning }}</div>
          <div class="info_title">领用预警</div>
        </div>
      </div>
    </div>
    <!--  -->
    <div class="three_view">
      <!--  -->
      <div class="three_view_one">
        <img class="three_view_icon" :src="a3" alt="" />
        <div class="three_view_title">智能柜</div>
        <EchartDivLeft></EchartDivLeft>
      </div>
      <!--  -->
      <div class="three_view_two">
        <!--  -->
        <div class="container">
          <div style="height: 20px"></div>
          <div class="chartsGl" id="charts"></div>
          <!-- 饼图下面的底座 -->
          <div class="buttomCharts">
            <img class="buttomCharts_image" :src="a6" alt="" />
          </div>
          <!-- 信息 -->
          <div class="leftChartsView">
            <div
              class="leftChartsRowView"
              v-for="row in optionData"
              :key="row.icon"
            >
              <img class="left_charts_row_icon" :src="row.icon" />
              <div class="left_charts_row_title">
                <span style="margin-right: 15px">{{ row.name }}</span>
                <span>{{ row.value }}</span>
              </div>
            </div>
          </div>
        </div>
        <!--  -->
        <div style="position: relative">
          <div class="three_bottom_view" style="left: 0">
            <div class="bottom_view_row">
              <img class="bottom_view_row_icon" :src="a10" alt="" />
              <div class="bottom_view_row_info_view">
                <div class="bottom_view_row_info_num">
                  {{ temperatyre + "℃" }}
                </div>
                <div class="bottom_view_row_info_title">温度</div>
              </div>
            </div>

            <div class="bottom_view_row" style="left: calc(50% - 215px / 2)">
              <img class="bottom_view_row_icon" :src="a11" alt="" />
              <div class="bottom_view_row_info_view">
                <div class="bottom_view_row_info_num">{{ humidity + "%" }}</div>
                <div class="bottom_view_row_info_title">湿度</div>
              </div>
            </div>

            <div class="bottom_view_row" style="right: 0">
              <img class="bottom_view_row_icon" :src="a12" alt="" />
              <div class="bottom_view_row_info_view">
                <div class="bottom_view_row_info_num">{{ network + "%" }}</div>
                <div class="bottom_view_row_info_title">网络</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!--  -->
      <div class="three_view_one" style="right: 0">
        <img class="three_view_icon" :src="a3" alt="" />
        <div class="three_view_title">智能架</div>
        <EchartDiv></EchartDiv>
      </div>
    </div>
    <!--  -->
    <div class="four_view">
      <!--  -->
      <div class="four_view_one" style="left: 0">
        <img class="four_view_icon" :src="a3" alt="" />
        <div class="four_view_title">领用量</div>
        <StackedLineViewLeft class="four_view_content"></StackedLineViewLeft>
      </div>
      <!--  -->
      <div class="four_list_view">
        <div class="list_header_view">
          <div class="list_row_one_view">领用人员</div>
          <div class="list_row_two_view">领用时间</div>
          <div class="list_row_three_view">领取设备</div>
        </div>

        <AutoScroll
          class="scroll-container"
          style="overflow-y: auto; position: relative; height: 250px"
          :speed="0.1"
          :waitTime="0"
          :singleHeight="100"
          :list="storageList"
        >
          <div
            :class="i % 2 == 0 ? 'list_row_s' : 'list_row'"
            v-for="(row, i) in storageList"
            :key="row.id ? row.id : i"
          >
            <div class="list_row_one_view">
              {{ row.storagePerson }}
            </div>
            <div class="list_row_two_view">{{ row.storageTime }}</div>
            <div class="list_row_three_view">{{ row.storageGoods }}</div>
          </div>
        </AutoScroll>
      </div>
      <!--  -->
      <div class="four_view_one" style="right: 0">
        <img class="four_view_icon" :src="a3" alt="" />
        <div class="four_view_title">库存量</div>
        <StackedLineView class="four_view_content"></StackedLineView>
      </div>
    </div>
  </div>
</template>

<script>
import * as echarts from "echarts";
import "echarts-gl";
import axios from "axios";

import EchartDiv from "@/components/EchartDiv.vue";
import EchartDivLeft from "@/components/EchartDivLeft.vue";
import StackedLineViewLeft from "@/components/StackedLineViewLeft.vue";
import AutoScroll from "@/components/AutoScroll.vue";

import StackedLineView from "@/components/StackedLineView.vue";

import back_image from "@/assets/a4.png";
import logo_image from "@/assets/logo.png";
import a1 from "@/assets/a1.png";

import a3 from "@/assets/a3.png";
import a4 from "@/assets/a4.png";
import a5 from "@/assets/a5.png";
import a6 from "@/assets/a6.png";
import a7 from "@/assets/a7.png";
import a8 from "@/assets/a8.png";
import a9 from "@/assets/a9.png";
import a10 from "@/assets/a10.png";
import a11 from "@/assets/a11.png";
import a12 from "@/assets/a12.png";
import a13 from "@/assets/a13.png";
import a14 from "@/assets/a14.png";
import a15 from "@/assets/a15.png";
import a16 from "@/assets/a16.png";
export default {
  components: {
    EchartDiv,
    StackedLineView,
    EchartDivLeft,
    StackedLineViewLeft,
    AutoScroll,
  },
  data() {
    return {
      storeroomNumber: "000001",
      back_image: back_image,
      logo_image: logo_image,
      a1: a1,
      a3: a3,
      a4: a4,
      a5: a5,
      a6: a6,
      a7: a7,
      a8: a8,
      a9: a9,
      a10: a10,
      a11: a11,
      a12: a12,
      storageList: [],
      temperatyre: "",
      humidity: "0",
      network: "0",

      totalNumber: "0",
      totalWarning: "0",
      lyWarning: "0",
      optionData: [
        {
          name: "返修设备", //蓝色
          value: 100,
          itemStyle: {
            color: "rgba(0, 183, 255, 1)",
          },
          icon: a15,
        },
        {
          name: "领用设备", //绿色
          value: 200,
          itemStyle: {
            color: "rgba(101, 245, 255, 1)",
          },
          icon: a13,
        },
        {
          name: "实有设备", //橙色
          value: 300,
          itemStyle: {
            color: "rgba(253, 83, 40, 1)",
          },
          icon: a16,
        },
        {
          name: "应有设备", //黄色
          value: 40,
          itemStyle: {
            color: "rgba(255, 225, 50, 1)",
          },
          icon: a14,
        },
      ],
    };
  },
  methods: {
    get_circle_num() {
      var that = this;
      axios
        .post(this.$apiUrl + "/api/panel/get_circle_num", {
          storeroomNumber: this.storeroomNumber,
        })
        .then((response) => {
          console.log(response.data);
          let res_data = response.data.data;
          let arr = that.optionData.slice();
          that.optionData = [];
          for (let i = 0; i < arr.length; i++) {
            let optionData_row = arr[i];
            //颜色
            if (optionData_row.name == "实有设备") {
              optionData_row.value = res_data.syQuantity;
            } else if (optionData_row.name == "应有设备") {
              optionData_row.value = res_data.yyQuantity;
            } else if (optionData_row.name == "领用设备") {
              optionData_row.value = res_data.lyQuantity;
            } else if (optionData_row.name == "返修设备") {
              optionData_row.value = res_data.fxQuantity;
            }
            that.$set(that.optionData, i, optionData_row);
          }

          that.init();
        })
        .catch((error) => {
          console.error(error);
        });
    },
    get_total_data() {
      var that = this;
      axios
        .post(this.$apiUrl + "/api/panel/get_total_data", {
          storeroomNumber: this.storeroomNumber,
        })
        .then((response) => {
          console.log(response.data);
          that.totalNumber = response.data.data.totalNumber;
          that.totalWarning = response.data.data.totalWarning;
          that.lyWarning = response.data.data.lyWarning;
        })
        .catch((error) => {
          console.error(error);
        });
    },
    get_data() {
      var that = this;
      axios
        .post(this.$apiUrl + "/api/panel/get_data", {
          storeroomNumber: this.storeroomNumber,
        })
        .then((response) => {
          console.log(response.data);
          that.storageList = response.data.data.storageList;
          that.temperatyre = response.data.data.temperatyre;
          that.humidity = response.data.data.humidity;
          that.network = response.data.data.network;
        })
        .catch((error) => {
          console.error(error);
        });
    },
    //初始化构建
    init() {
      //构建3d饼状图
      let myChart = echarts.init(document.getElementById("charts"));
      // 传入数据生成 option ; getPie3D(数据，透明的空心占比（调节中间空心范围的0就是普通饼1就很镂空）)
      this.option = this.getPie3D(this.optionData, 0.85);
      //将配置项设置进去
      myChart.setOption(this.option);
      //鼠标移动上去特效效果
      this.bindListen(myChart);
    },
    //配置构建 pieData 饼图数据 internalDiameterRatio:透明的空心占比
    getPie3D(pieData, internalDiameterRatio) {
      let that = this;
      let series = [];
      let sumValue = 0;
      let startValue = 0;
      let endValue = 0;
      let legendData = [];
      let legendBfb = [];
      let k = 1 - internalDiameterRatio;
      pieData.sort((a, b) => {
        return b.value - a.value;
      });
      // 为每一个饼图数据，生成一个 series-surface(参数曲面) 配置
      for (let i = 0; i < pieData.length; i++) {
        sumValue += pieData[i].value;
        let seriesItem = {
          //系统名称
          name:
            typeof pieData[i].name === "undefined"
              ? `series${i}`
              : pieData[i].name,
          type: "surface",

          //是否为参数曲面（是）
          parametric: true,
          //曲面图网格线（否）上面一根一根的
          wireframe: {
            show: false,
          },
          pieData: pieData[i],
          pieStatus: {
            selected: false,
            hovered: false,
            k: k,
          },
          //设置饼图在容器中的位置(目前没发现啥用)
          // center: ['50%', '100%']
        };

        //曲面的颜色、不透明度等样式。
        if (typeof pieData[i].itemStyle != "undefined") {
          let itemStyle = {};
          typeof pieData[i].itemStyle.color != "undefined"
            ? (itemStyle.color = pieData[i].itemStyle.color)
            : null;
          typeof pieData[i].itemStyle.opacity != "undefined"
            ? (itemStyle.opacity = pieData[i].itemStyle.opacity)
            : null;
          seriesItem.itemStyle = itemStyle;
        }
        let label = {
          show: true,
          formatter: "{d}% ",
          textStyle: {
            color: "#595959", // 提示文字颜色
            fontSize: 18, // 提示文字大小
          },
        };
        let labelLine = {
          show: true,
          length: 50, // 指示线长度
          length2: 70,
          lineStyle: {
            color: "#ffffff", // 指示线颜色
          },
        };

        seriesItem.label = label;
        seriesItem.labelLine = labelLine;
        series.push(seriesItem);
      }

      // 使用上一次遍历时，计算出的数据和 sumValue，调用 getParametricEquation 函数，
      // 向每个 series-surface 传入不同的参数方程 series-surface.parametricEquation，也就是实现每一个扇形。
      legendData = [];
      legendBfb = [];
      for (let i = 0; i < series.length; i++) {
        endValue = startValue + series[i].pieData.value;
        series[i].pieData.startRatio = startValue / sumValue;
        series[i].pieData.endRatio = endValue / sumValue;
        series[i].parametricEquation = this.getParametricEquation(
          series[i].pieData.startRatio,
          series[i].pieData.endRatio,
          false,
          false,
          k,
          series[i].pieData.value
        );
        startValue = endValue;
        let bfb = that.fomatFloat(series[i].pieData.value / sumValue, 4);
        legendData.push({
          name: series[i].name,
          value: bfb,
        });
        legendBfb.push({
          name: series[i].name,
          value: bfb,
        });
      }
      //(第二个参数可以设置你这个环形的高低程度)
      let boxHeight = this.getHeight3D(series, 20); //通过传参设定3d饼/环的高度
      // 准备待返回的配置项，把准备好的 legendData、series 传入。
      let option = {
        //图例组件
        legend: {
          data: legendData,
          //图例列表的布局朝向。
          orient: "vertical",
          right: 40,
          top: 0,
          //图例文字每项之间的间隔
          itemGap: 40,
          textStyle: {
            color: "#A1E2FF",
            fontSize: 20,
          },
          show: false,
          icon: "circle",
          //格式化图例文本（我是数值什么显示什么）
          formatter: function (name) {
            var target;
            for (var i = 0, l = pieData.length; i < l; i++) {
              if (pieData[i].name == name) {
                target = pieData[i].value;
              }
            }
            return `${name}: ${target}`;
          },
          // 这个可以显示百分比那种（可以根据你想要的来配置）
          //   formatter: function(param) {
          //       let item = legendBfb.filter(item => item.name == param)[0];
          //       let bfs = that.fomatFloat(item.value * 100, 2) + "%";
          //       console.log(item.name)
          //       return `${item.name} :${bfs}`;
          //   }
        },
        //移动上去提示的文本内容(我没来得及改 你们可以根据需求改)
        tooltip: {
          formatter: (params) => {
            if (
              params.seriesName !== "mouseoutSeries" &&
              params.seriesName !== "pie2d"
            ) {
              let bfb = (
                (option.series[params.seriesIndex].pieData.endRatio -
                  option.series[params.seriesIndex].pieData.startRatio) *
                100
              ).toFixed(2);
              return (
                `${params.seriesName}<br/>` +
                `<span style="display:inline-block;margin-right:5px;border-radius:10px;width:10px;height:10px;background-color:${params.color};"></span>` +
                `${bfb + "%"}`
              );
            }
          },
        },
        //这个可以变形
        xAxis3D: {
          min: -1,
          max: 1,
        },
        yAxis3D: {
          min: -1,
          max: 1,
        },
        zAxis3D: {
          min: -1,
          max: 1,
        },
        //此处是修改样式的重点
        grid3D: {
          show: false,
          boxHeight: boxHeight, //圆环的高度
          //这是饼图的位置
          top: -30,
          left: -65,
          viewControl: {
            //3d效果可以放大、旋转等，请自己去查看官方配置
            alpha: 35, //角度(这个很重要 调节角度的)
            distance: 142, //调整视角到主体的距离，类似调整zoom(这是整体大小)
            rotateSensitivity: 0, //设置为0无法旋转
            zoomSensitivity: 0, //设置为0无法缩放
            panSensitivity: 0, //设置为0无法平移
            autoRotate: false, //自动旋转
          },
        },
        series: series,
      };

      return option;
    },

    //获取3d丙图的最高扇区的高度
    getHeight3D(series, height) {
      series.sort((a, b) => {
        return b.pieData.value - a.pieData.value;
      });
      return (height * 25) / series[0].pieData.value;
    },

    // 生成扇形的曲面参数方程，用于 series-surface.parametricEquation
    getParametricEquation(startRatio, endRatio, isSelected, isHovered, k, h) {
      // 计算
      let midRatio = (startRatio + endRatio) / 2;
      let startRadian = startRatio * Math.PI * 2;
      let endRadian = endRatio * Math.PI * 2;
      let midRadian = midRatio * Math.PI * 2;
      // 如果只有一个扇形，则不实现选中效果。
      if (startRatio === 0 && endRatio === 1) {
        isSelected = false;
      }
      // 通过扇形内径/外径的值，换算出辅助参数 k（默认值 1/3）
      k = typeof k !== "undefined" ? k : 1 / 3;
      // 计算选中效果分别在 x 轴、y 轴方向上的位移（未选中，则位移均为 0）
      let offsetX = isSelected ? Math.cos(midRadian) * 0.1 : 0;
      let offsetY = isSelected ? Math.sin(midRadian) * 0.1 : 0;
      // 计算高亮效果的放大比例（未高亮，则比例为 1）
      let hoverRate = isHovered ? 1.05 : 1;
      // 返回曲面参数方程
      return {
        u: {
          min: -Math.PI,
          max: Math.PI * 3,
          step: Math.PI / 32,
        },
        v: {
          min: 0,
          max: Math.PI * 2,
          step: Math.PI / 20,
        },
        x: function (u, v) {
          if (u < startRadian) {
            return (
              offsetX +
              Math.cos(startRadian) * (1 + Math.cos(v) * k) * hoverRate
            );
          }
          if (u > endRadian) {
            return (
              offsetX + Math.cos(endRadian) * (1 + Math.cos(v) * k) * hoverRate
            );
          }
          return offsetX + Math.cos(u) * (1 + Math.cos(v) * k) * hoverRate;
        },
        y: function (u, v) {
          if (u < startRadian) {
            return (
              offsetY +
              Math.sin(startRadian) * (1 + Math.cos(v) * k) * hoverRate
            );
          }
          if (u > endRadian) {
            return (
              offsetY + Math.sin(endRadian) * (1 + Math.cos(v) * k) * hoverRate
            );
          }
          return offsetY + Math.sin(u) * (1 + Math.cos(v) * k) * hoverRate;
        },
        z: function (u, v) {
          if (u < -Math.PI * 0.5) {
            return Math.sin(u);
          }
          if (u > Math.PI * 2.5) {
            return Math.sin(u) * h * 0.1;
          }
          return Math.sin(v) > 0 ? 1 * h * 0.1 : -1;
        },
      };
    },

    //这是一个自定义计算的方法
    fomatFloat(num, n) {
      var f = parseFloat(num);
      if (isNaN(f)) {
        return false;
      }
      f = Math.round(num * Math.pow(10, n)) / Math.pow(10, n); // n 幂
      var s = f.toString();
      var rs = s.indexOf(".");
      //判定如果是整数，增加小数点再补0
      if (rs < 0) {
        rs = s.length;
        s += ".";
      }
      while (s.length <= rs + n) {
        s += "0";
      }
      return s;
    },
    // 监听鼠标事件，实现饼图选中效果（单选），近似实现高亮（放大）效果。
    bindListen(myChart) {
      let that = this;
      let selectedIndex = "";
      let hoveredIndex = "";
      // 监听点击事件，实现选中效果（单选）
      myChart.on("click", function (params) {
        // 从 option.series 中读取重新渲染扇形所需的参数，将是否选中取反。
        let isSelected =
          !that.option.series[params.seriesIndex].pieStatus.selected;
        let isHovered =
          that.option.series[params.seriesIndex].pieStatus.hovered;
        let k = that.option.series[params.seriesIndex].pieStatus.k;
        let startRatio =
          that.option.series[params.seriesIndex].pieData.startRatio;
        let endRatio = that.option.series[params.seriesIndex].pieData.endRatio;
        // 如果之前选中过其他扇形，将其取消选中（对 option 更新）
        if (selectedIndex !== "" && selectedIndex !== params.seriesIndex) {
          that.option.series[selectedIndex].parametricEquation =
            that.getParametricEquation(
              that.option.series[selectedIndex].pieData.startRatio,
              that.option.series[selectedIndex].pieData.endRatio,
              false,
              false,
              k,
              that.option.series[selectedIndex].pieData.value
            );
          that.option.series[selectedIndex].pieStatus.selected = false;
        }
        // 对当前点击的扇形，执行选中/取消选中操作（对 option 更新）
        that.option.series[params.seriesIndex].parametricEquation =
          that.getParametricEquation(
            startRatio,
            endRatio,
            isSelected,
            isHovered,
            k,
            that.option.series[params.seriesIndex].pieData.value
          );
        that.option.series[params.seriesIndex].pieStatus.selected = isSelected;
        // 如果本次是选中操作，记录上次选中的扇形对应的系列号 seriesIndex
        isSelected ? (selectedIndex = params.seriesIndex) : null;
        // 使用更新后的 option，渲染图表
        myChart.setOption(that.option);
      });
      // 监听 mouseover，近似实现高亮（放大）效果
      myChart.on("mouseover", function (params) {
        // 准备重新渲染扇形所需的参数
        let isSelected;
        let isHovered;
        let startRatio;
        let endRatio;
        let k;
        // 如果触发 mouseover 的扇形当前已高亮，则不做操作
        if (hoveredIndex === params.seriesIndex) {
          return;
          // 否则进行高亮及必要的取消高亮操作
        } else {
          // 如果当前有高亮的扇形，取消其高亮状态（对 option 更新）
          if (hoveredIndex !== "") {
            // 从 option.series 中读取重新渲染扇形所需的参数，将是否高亮设置为 false。
            isSelected = that.option.series[hoveredIndex].pieStatus.selected;
            isHovered = false;
            startRatio = that.option.series[hoveredIndex].pieData.startRatio;
            endRatio = that.option.series[hoveredIndex].pieData.endRatio;
            k = that.option.series[hoveredIndex].pieStatus.k;
            // 对当前点击的扇形，执行取消高亮操作（对 option 更新）
            that.option.series[hoveredIndex].parametricEquation =
              that.getParametricEquation(
                startRatio,
                endRatio,
                isSelected,
                isHovered,
                k,
                that.option.series[hoveredIndex].pieData.value
              );
            that.option.series[hoveredIndex].pieStatus.hovered = isHovered;
            // 将此前记录的上次选中的扇形对应的系列号 seriesIndex 清空
            hoveredIndex = "";
          }
          // 如果触发 mouseover 的扇形不是透明圆环，将其高亮（对 option 更新）
          if (
            params.seriesName !== "mouseoutSeries" &&
            params.seriesName !== "pie2d"
          ) {
            // 从 option.series 中读取重新渲染扇形所需的参数，将是否高亮设置为 true。
            isSelected =
              that.option.series[params.seriesIndex].pieStatus.selected;
            isHovered = true;
            startRatio =
              that.option.series[params.seriesIndex].pieData.startRatio;
            endRatio = that.option.series[params.seriesIndex].pieData.endRatio;
            k = that.option.series[params.seriesIndex].pieStatus.k;
            // 对当前点击的扇形，执行高亮操作（对 option 更新）
            that.option.series[params.seriesIndex].parametricEquation =
              that.getParametricEquation(
                startRatio,
                endRatio,
                isSelected,
                isHovered,
                k,
                that.option.series[params.seriesIndex].pieData.value + 5
              );
            that.option.series[params.seriesIndex].pieStatus.hovered =
              isHovered;
            // 记录上次高亮的扇形对应的系列号 seriesIndex
            hoveredIndex = params.seriesIndex;
          }
          // 使用更新后的 option，渲染图表
          myChart.setOption(that.option);
        }
      });
      // 修正取消高亮失败的 bug
      myChart.on("globalout", function () {
        // 准备重新渲染扇形所需的参数
        let isSelected;
        let isHovered;
        let startRatio;
        let endRatio;
        let k;
        if (hoveredIndex !== "") {
          // 从 option.series 中读取重新渲染扇形所需的参数，将是否高亮设置为 true。
          isSelected = that.option.series[hoveredIndex].pieStatus.selected;
          isHovered = false;
          k = that.option.series[hoveredIndex].pieStatus.k;
          startRatio = that.option.series[hoveredIndex].pieData.startRatio;
          endRatio = that.option.series[hoveredIndex].pieData.endRatio;
          // 对当前点击的扇形，执行取消高亮操作（对 option 更新）
          that.option.series[hoveredIndex].parametricEquation =
            that.getParametricEquation(
              startRatio,
              endRatio,
              isSelected,
              isHovered,
              k,
              that.option.series[hoveredIndex].pieData.value
            );
          that.option.series[hoveredIndex].pieStatus.hovered = isHovered;
          // 将此前记录的上次选中的扇形对应的系列号 seriesIndex 清空
          hoveredIndex = "";
        }
        // 使用更新后的 option，渲染图表
        myChart.setOption(that.option);
      });
    },
  },
  mounted() {
    this.$nextTick(function () {
      this.get_total_data();
      this.get_circle_num();
      this.get_data();
    });
  },
};
</script>

<style scoped>
body html {
  margin: 0;
  padding: 0;
  min-width: 1920px;
  min-height: 1080px;
}
/* 背景图 */
.back_image {
  position: absolute;
  display: block;
  left: 0;
  top: 0;
  width: 100%;
}
.three_view_two {
  position: absolute;
  width: 760px;
  left: calc(50% - 760px / 2);
  top: 0;
  height: 90%;
}
/* 3d饼图 */
.container {
  position: relative;
  width: 100%;
  height: 100%;
}

.chartsGl {
  z-index: 999;
  position: relative;
  left: calc(50% - 600px / 2);
  height: 286px;
  width: 600px;
}

.buttomCharts {
  position: absolute;
  background-size: cover;
  height: 310px;
  width: 563px;
  left: calc(50% - 519px / 2 - 92px);
  top: 30px;
  text-align: center;
}
.buttomCharts_image {
  position: relative;
  width: 100%;
  height: 100%;
}
.leftChartsView {
  position: absolute;
  right: 45px;
  top: 30px;
  width: 150px;
}
.leftChartsRowView {
  position: relative;
  height: 51px;
  width: 100%;
  margin-bottom: 16px;
}
.left_charts_row_icon {
  position: absolute;
  left: 0;
  top: 0;
  width: 82px;
  height: 100%;
}
.left_charts_row_title {
  font-weight: 800;
  font-size: 13px;
  color: #ffffff;
  line-height: 51px;
  position: absolute;
  left: 30px;
  top: 0;
  height: 100%;
}

.header_view {
  position: relative;
  left: 0;
  height: 78px;
  width: 100%;
}
.logo_view {
  position: absolute;
  left: 34px;
  top: 20px;
  width: 58px;
  height: 58px;
  border-radius: 50%;
}
.header_image_a1 {
  position: absolute;
  left: 144px;
  right: 144px;
  top: 0;
  width: calc(100% - 144px * 2);
}
.header_two_view {
  position: relative;
  height: 131px;
  margin-top: 36px;
}
.two_view_row {
  position: absolute;
  width: 513px;
  height: 131px;
}
.two_view_icon {
  position: absolute;
  width: 513px;
  height: 131px;
}
.info_view {
  position: relative;
  margin-left: 270px;
  color: white;
  top: calc(50% - 40px);
}
.info_num {
  position: relative;
  font-weight: 800;
  font-size: 34px;
  color: #ffffff;
  line-height: 50px;
  height: 50px;
  height: 50px;
}
.info_title {
  position: relative;
  height: 30px;
  font-size: 20px;
  color: #ffffff;
  line-height: 30px;
}
.three_view {
  position: relative;
  height: 400px;
  margin-top: 28px;
}
.three_view_one {
  position: absolute;
  width: calc((100% - 760px) / 2);
  top: 0;
  height: 100%;
}
.three_view_icon {
  height: 60px;
  width: 479px;
  position: absolute;
  left: 0;
  top: 0;
}
.three_view_title {
  position: absolute;
  left: 124px;
  top: 0;
  height: 30px;
  line-height: 30px;
  font-weight: 800;
  font-size: 20px;
  color: #ffffff;
}

.three_bottom_view {
  position: relative;
  height: 91px;
}
.bottom_view_row {
  position: absolute;
  top: 0;
  width: 215px;
  height: 91px;
}
.bottom_view_row_icon {
  position: absolute;
  left: 0;
  top: 0;
  width: 215px;
  height: 91px;
}
.bottom_view_row_info_view {
  position: relative;
  margin-left: 128px;
  top: calc(50% - 25px);
}
.bottom_view_row_info_num {
  position: relative;
  height: 30px;
  line-height: 30px;
  font-weight: bold;
  font-size: 22px;
  color: #ffffff;
}
.bottom_view_row_info_title {
  position: relative;
  height: 20px;
  font-size: 13px;
  color: #ffffff;
}

.four_view {
  position: relative;
  height: 360px;
  margin-top: 28px;
}
.four_view_one {
  position: absolute;
  width: calc((100% - 760px) / 2);
  top: 0;
  height: 100%;
}
.four_view_icon {
  height: 60px;
  width: 479px;
  position: absolute;
  left: 0;
  top: 0;
}
.four_view_title {
  position: absolute;
  left: 124px;
  top: 0;
  height: 30px;
  line-height: 30px;
  font-weight: 800;
  font-size: 20px;
  color: #ffffff;
}
.four_view_content {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
}
.four_list_view {
  position: absolute;
  width: 760px;
  left: calc(50% - 760px / 2);
  top: 60px;
  height: 300px;
}
.list_header_view {
  margin: 0 20px;
  position: relative;
  background-color: #fffb002d;
  color: #fffb00;
  font-weight: 600;
  font-size: 18px;
  height: 50px;
  line-height: 50px;
  text-align: center;
}
.list_row_one_view {
  position: absolute;
  left: 0;
  width: calc(100% / 3 - 100px);
  height: 100%;
  /* background-color: #fffb00; */
}
.list_row_two_view {
  position: absolute;
  left: calc(100% / 3 - 100px);
  width: calc(100% / 3 - 50px);
  height: 100%;
  /* background-color: rebeccapurple; */
}
.list_row_three_view {
  position: absolute;
  right: 0;
  width: calc(100% / 3 + 150px);
  height: 100%;
  white-space: nowrap; /* 确保文本在一行内显示 */
  overflow: hidden; /* 隐藏超出容器的文本 */
  text-overflow: ellipsis; /* 使用省略号表示被截断的文本 */
  /* background-color: aqua; */
}
.list_row {
  margin: 0 20px;
  position: relative;
  height: 50px;
  line-height: 50px;
  text-align: center;
  font-size: 14px;
  color: #ffffff;
  text-align: center;
  background: #07b9ea18;
}
.list_row_s {
  margin: 0 20px;
  position: relative;
  height: 50px;
  line-height: 50px;
  text-align: center;
  font-size: 14px;
  color: #ffffff;
  text-align: center;
  background-color: #00010218;
}

.scroll-container::-webkit-scrollbar {
  display: none; /* 针对Webkit浏览器隐藏滚动条 */
}

.scroll-container {
  -ms-overflow-style: none; /* 针对IE和Edge隐藏滚动条 */
  scrollbar-width: none; /* 针对Firefox */
}
</style>