import React, { useState, useEffect, useRef } from "react";
import styles from "./index.module.scss";
import EchartsComponent from "@/components/EchartsComponent";
import { data as geoJsonData } from "@/components/EchartsComponent/geoJsonData";
import axios from "axios";
const sendMessageToRN = (data) => {
  console.log(data);
  let message = { regionName: data };
  const query = new URLSearchParams({ data });
  // axios.get(`${import.meta.env.VITE_API_URL}/region?${query}`);
  window.postMessage(message); // 发送消息给React Native
};

const genOption = (option, selectedRegion) => {
  const newOp = { ...option };
  newOp.series[0].data = newOp.series[0].data.map((item) => {
    return {
      ...item,
      selected: item.name == selectedRegion,
    };
  });

  return newOp;
};

export default () => {
  const [selectedRegion, setSelectedRegion] = useState("无");
  const selectedRegionRef = useRef("无");
  const [option, setOption] = useState({
    series: [
      {
        name: "宜春市地图",
        roam: false,
        type: "map",
        map: "宜春市",
        label: {
          normal: {
            show: true,
            color: "#e3e3e3",
          },
          emphasis: {
            show: false,
          },
        },

        select: {
          label: {
            show: true, // 显示选中区域的标签
            fontSize: 16, // 标签字体大小
            color: "#fff", // 标签颜色
          },
          itemStyle: {
            areaColor: "#1677cc", // 选中区域的填充颜色
            borderColor: "#fff", // 选中区域的边框颜色
            borderWidth: 2, // 选中区域的边框宽度
          },
        },
        data: geoJsonData.features.map((item) => {
          return {
            name: item.properties.name,
            value: item.properties.adcode,
            // selected: item.properties.name == "靖安县",
            itemStyle: {
              normal: {
                type: "pattern",
                // areaColor: color[item.properties.name],
                areaColor: "#1a1a1a",
                borderColor: "#e3e3e3", // 选中区域的边框颜色
                borderWidth: 1, // 选中区域的边框宽度
              },
            },
          };
        }),
      },
    ],
  });
  // const color = {
  //   袁州区: "rgba(255, 255, 0, 0.5)",
  //   铜鼓县: "#fcc4c0",
  //   万载县: "#b3edfc",
  //   上高县: "#c0fcb8",
  //   宜丰县: "#fcbbf4",
  //   靖安县: "#c0fcf4",
  //   奉新县: "#fcd7c2",
  //   高安市: "#b3fcde",
  //   樟树市: "#d9fcc7",
  //   丰城市: "#fcf4d7",
  // };

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_API_URL}/getStatus`).then((res) => {
      console.log("res", res?.data?.map?.regionName || "无");

      const lastRegionName = res?.data?.map?.regionName || "无";
      setSelectedRegion(lastRegionName);
      let newOption = genOption(option, lastRegionName);
      setOption(newOption);
      selectedRegionRef.current = lastRegionName;
      // sendMessageToRN(lastRegionName);
    });
  }, []);
  const handleClick = (params) => {
    if (params.componentType === "series") {
      console.log("点击的区域名称：", params.name);
      const newName =
        params.name == selectedRegionRef.current ? "无" : params.name;
      setSelectedRegion(newName);
      selectedRegionRef.current = newName;
      sendMessageToRN(newName);
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
    </div>
  );
};
