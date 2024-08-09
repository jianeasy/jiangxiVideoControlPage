import "./App.css";
import { RouterProvider } from "react-router-dom";
import router from "@/router";
function App() {
  console.log("init");

  return <RouterProvider router={router}></RouterProvider>;
}

export default App;
