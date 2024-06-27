import React, { useEffect } from 'react';
import ECharts from 'echarts-for-react';
import * as echarts from 'echarts';
import { data as geoJsonData } from './geoJsonData';
echarts.registerMap('宜春市', geoJsonData);

// 自适应的ECharts函数组件
const ResponsiveEcharts = ({ options, onClick }) => {
  useEffect(() => {
    const resizeChart = () => {
      if (chartRef && chartRef.getEchartsInstance()) {
        chartRef.getEchartsInstance().resize();
      }
    };
    // chartRef.on('click', function (params) {
    //   if (params.componentType === 'series') {
    //     console.log('点击的系列名称：', params.seriesName);
    //     console.log('点击的区域名称：', params.name);
    //     onClick(params);
    //   }
    // });
    window.addEventListener('resize', resizeChart);
    return () => {
      window.removeEventListener('resize', resizeChart);
    };
  }, []);
  let chartRef;

  return (
    <div style={{ width: '100%', height: '100%' }}>
      <ECharts
        ref={(e) => {
          chartRef = e;
        }}
        onEvents={{
          click: (params) => {
            console.log(params);
            echarts.dispatchAction &&
            echarts.dispatchAction({
              type: 'select',
              seriesIndex: params.dataIndex, // 确保这是你地图系列的正确索引
              name: params.name,
            });
            onClick(params);
           
          },
         
        }}
        echarts={echarts}
        option={options}
        style={{ width: '100%', height: '100%' }}
      />
    </div>
  );
};

export default ResponsiveEcharts;
