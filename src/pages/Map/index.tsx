import React, { useState } from 'react';
import styles from './index.module.scss';
import EchartsComponent from '@/components/EchartsComponent';
import { data as geoJsonData } from '@/components/EchartsComponent/geoJsonData';
import PlayController from '@/components/PlayController';

export default () => {
  const [selectedRegion, setSelectedRegion] = useState('无');
  const color = {
    袁州区: '#b6c4fc',
    铜鼓县: '#fcc4c0',
    万载县: '#b3edfc',
    上高县: '#c0fcb8',
    宜丰县: '#fcbbf4',
    靖安县: '#c0fcf4',
    奉新县: '#fcd7c2',
    高安市: '#b3fcde',
    樟树市: '#d9fcc7',
    丰城市: '#fcf4d7',
  };
  const option = {
    series: [
      {
        name: '区县地图',
        type: 'map',
        map: '宜春市',
        roam: true,
        data: geoJsonData.features.map((item) => {
          return {
            name: item.properties.name,
            value: item.properties.adcode,

            itemStyle: {
              normal: {
                areaColor: color[item.properties.name],
                emphasis: {
                  areaColor: 'red',
                  borderColor: 'red',
                },
              },
            },
          };
        }),
        label: {
          normal: {
            show: true,
          },
          emphasis: {
            show: true,
          },
        },
      },
    ],
  };
  const handleClick = (params) => {
    if (params.componentType === 'series') {
      console.log('点击的系列名称：', params.seriesName);
      console.log('点击的区域名称：', params.name);
      setSelectedRegion(params.name);
    }
  };
  return (
    <div className={styles.container}>
      <Bar regionName={selectedRegion} />
      <EchartsComponent options={option} onClick={handleClick} />
    </div>
  );
};

export const Bar = (props) => {
  const { regionName } = props;
  return (
    <div className={styles.bar}>
      <span>当前选中区域：</span>
      <span>{regionName}</span>
      <PlayController />
    </div>
  );
};
