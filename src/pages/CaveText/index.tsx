import React, { useEffect, useState, useRef } from "react";
import styles from "./index.module.scss";
import initWs from "../ws";
let timeId;
export default () => {
  const [Ws, setWs] = useState(null);

  const [text, setText] = useState("");
  const cache = useRef<any>({});
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
    let data = JSON.parse(event.data);

    cache.current = { ...data };
    data = data.cave;
    console.log("data", data);
    setText(data.selected.name);
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
      <div className={styles.text}>{text}</div>
    </div>
  );
};
