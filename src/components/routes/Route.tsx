// import { Routes } from "react-router-dom";

import Pages from "@/pages";
import Home from "@/pages/home";
import { Navigate, useRoutes } from "react-router-dom";
import Tip from "../Tip";

function MyRoute() {
  const element = useRoutes([
    {
      path: "/",
      element: <Pages />,
      children: [
        {
          path: "/",
          element: <Navigate to="/home" />,
        },
        {
          path: "/home",
          element: <Home />,
        },
        {
          path: "/tip",
          element: <Tip />,
        },
      ],
    },
  ]);
  return element;
}
export default MyRoute;
