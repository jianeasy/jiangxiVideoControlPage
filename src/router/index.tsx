import React from "react";
import { createBrowserRouter } from "react-router-dom";
import Home from "@/pages/home";
import Map from "@/pages/Map";
import Cave from "@/pages/Cave";
import CaveText from "@/pages/CaveText";
import Play from "@/pages/Play";
import SlidingScreen from "@/pages/SlidingScreen";
const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <Home />,

      children: [
        {
          path: "map",
          element: <Map />,
        },

        {
          path: "cave",
          element: <Cave />,
        },
        {
          path: "cavetext",
          element: <CaveText />,
        },
        {
          path: "Play",
          element: <Play />,
        },
        {
          path: "SlidingScreen",
          element: <SlidingScreen />,
        },
      ],
    },
  ],
  {
    basename: "/videoMapControlPage",
  }
);
export default router;
