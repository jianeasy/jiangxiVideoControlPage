import React, { useEffect, useState, useRef } from "react";
import styles from "./index.module.scss";
import initWs from "../ws";
export default () => {
  const videoRef = useRef(null);
  const buttonRef = useRef(null);
  const [Ws, setWs] = useState(null);
  const [videoSrc, setVideoSrc] = useState("#");
  const videoUrlRef = useRef("");
  const handleMessage = (event) => {
    const data = JSON.parse(event.data);
    console.log("data", data);
    if (data.name && data.module == "cave") {
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
  const snedVideoStopWsMessage = () => {
    Ws.send(
      JSON.stringify({
        module: "cave",
        command: "stop_play",
      })
    );
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
