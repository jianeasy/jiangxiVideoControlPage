import { MutableRefObject, useEffect, useRef } from "react";
// import ECharts from 'echarts-for-react';
import * as Echarts from "echarts";

// import * as echarts from 'echarts';
import { data as geoJsonData } from "./geoJsonData";
Echarts.registerMap("宜春市", geoJsonData);

export const ResponsiveEcharts = (props) => {
  console.log(1);

  const { options, onClick } = props;
  // 自适应的ECharts函数组件
  // const ResponsiveEcharts = ({ options, onClick }) => {
  const chart: MutableRefObject<any> = useRef(null);
  const echarts = useRef(null);
  const chartInit = () => {
    const mychar = Echarts.init(chart.current);
    echarts.current = mychar;
    mychar.setOption(options, true);
    mychar.on("click", onClick);
    window.onresize = () => {
      mychar.resize();
    };
  };
  useEffect(() => {
    echarts.current && echarts.current.setOption(options, true);
  }, [options]);
  useEffect(() => {
    chartInit();

    return () => {
      window.onresize = null;
    };
  }, []);

  return <div ref={chart} style={{ width: "100%", height: "100%" }}></div>;
};

export default ResponsiveEcharts;
