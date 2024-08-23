import React, { useEffect, useState, useRef } from "react";
import styles from "./index.module.scss";
import initWs from "../ws";
import axios from "axios";
let timeId;
export default () => {
  const videoRef = useRef(null);
  const buttonRef = useRef(null);
  const [Ws, setWs] = useState(null);
  const [videoSrc, setVideoSrc] = useState("#");
  const videoUrlRef = useRef("");
  const cache = useRef<any>({
    map: {
      regionName: "无",
      isPlaying: false,
      command: "stop_play",
    },
    screen: {
      isPlaying: false,
      command: "stop_play",
    },
    cave: {
      selected: {},
      isPlaying: false,
      command: "stop_play",
    },
  });
  const wsRef = useRef<any>(null);
  const [isConnected, setIsConnected] = useState(false);
  const connect = () => {
    timeId = setInterval(() => {
      console.log("1111111111");
      console.log(wsRef.current);

      if (!wsRef.current) {
        // 如果socket不存在，则创建一个新的WebSocket实例
        const ws = new WebSocket(import.meta.env.VITE_WS_URL);
        console.log("ws", ws);
        wsRef.current = ws;

        wsRef.current.onopen = () => {
          console.log("Reconnected successfully.");
          setIsConnected(true);
          clearInterval(timeId);
        };
        wsRef.current.onclose = () => {
          wsRef.current = null;
          setIsConnected(false);
          console.log(" reconnect ");
        };
        wsRef.current.onmessage = (event: any) => {
          handleMessage(event);
        };
        wsRef.current.onerror = () => {
          wsRef.current = null;
          setIsConnected(false);
          console.log(" reconnect ");
        };
      }
    }, 1000);
  };

  const handleMessage = (event) => {
    console.log("event", event);

    let data = JSON.parse(event.data);
    cache.current = { ...data };
    data = data.map;
    console.log(data);

    if (data.mark == "done") {
      return;
    }
    if (data.name) {
      if (data.command == "start_play") {
        if (
          videoUrlRef.current !=
          `${import.meta.env.VITE_API_URL}/videos/${data.name}`
        ) {
          videoUrlRef.current = `${import.meta.env.VITE_API_URL}/videos/${
            data.name
          }`;
          videoRef.current.src = `${import.meta.env.VITE_API_URL}/videos/${
            data.name
          }`;
          videoRef.current.play();
          return;
        }
        videoRef.current.play();
      } else if (data.command == "stop_play") {
        videoRef.current.pause();
      } else if (data.command == "resume_play") {
        videoRef.current.currentTime = 0;
        videoRef.current.play();
      }
    }
  };
  const snedVideoStopWsMessage = async () => {
    const res = await axios.get(`${import.meta.env.VITE_API_URL}/getStatus`);
    cache.current = res.data;

    axios.post(`${import.meta.env.VITE_API_URL}/updateStatus`, {
      ...cache.current,
      map: {
        ...cache.current.map,
        command: "stop_play",
        mark: "done",
        isPlaying: false,
      },
    });
    console.log({
      ...cache.current,
      map: {
        ...cache.current.map,
        command: "stop_play",
        mark: "done",
        isPlaying: false,
      },
    });
  };
  useEffect(() => {
    connect();
    return () => {
      // 清理操作
      if (wsRef.current) {
        wsRef.current.close();
      }
    };
  }, []);

  return (
    <div className={styles.container}>
      <video
        className={styles.videoBox}
        ref={videoRef}
        id="videoElement"
        controls={false}
        autoPlay
        onEnded={() => {
          console.log("Video playback has ended!");
          snedVideoStopWsMessage();
        }}
      >
        <source src={videoSrc} type="video/mp4" />
      </video>
    </div>
  );
};
