function initWs(url, messageCallback) {
  const newWs = new WebSocket(url);
  newWs.addEventListener("open", () => {
    console.log("ws conencted");
  });
  newWs.addEventListener("error", () => {
    console.log("ws error");
  });
  newWs.addEventListener("close", () => {});

  newWs.addEventListener("message", (event) => {
    messageCallback && messageCallback(event);
  });
  return newWs;
}

export default initWs;
