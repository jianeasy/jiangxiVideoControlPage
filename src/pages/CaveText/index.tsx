import React, { useEffect, useState, useRef } from "react";
import styles from "./index.module.scss";
import initWs from "../ws";
export default () => {
  const [Ws, setWs] = useState(null);

  const [text, setText] = useState("");
  const handleMessage = (event) => {
    const data = JSON.parse(event.data);
    console.log("data", data);
    if (
      data.name &&
      data.module == "cave" &&
      ["start_play", "resume_play"].includes(data.command)
    ) {
      setText(data.selected.name);
    }
  };
  useEffect(() => {
    // 发起ws
    const ws = initWs(import.meta.env.VITE_WS_URL, handleMessage);
    setWs(Ws);
    return () => {
      ws.close();
    };
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.text}>{text}</div>
    </div>
  );
};
