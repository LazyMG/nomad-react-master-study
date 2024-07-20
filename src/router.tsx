import { createBrowserRouter } from "react-router-dom";
import Layout from "./Layout";
import Home from "./routes/Home";
import ComingSoon from "./routes/ComingSoon";
import NowPlaying from "./routes/NowPlaying";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "",
        element: <Home />,
        children: [
          {
            path: "movies/:movieId",
            element: <Home />,
          },
        ],
      },
      {
        path: "coming-soon",
        element: <ComingSoon />,
        children: [
          {
            path: "movies/:movieId",
            element: <ComingSoon />,
          },
        ],
      },
      {
        path: "now-playing",
        element: <NowPlaying />,
        children: [
          {
            path: "movies/:movieId",
            element: <NowPlaying />,
          },
        ],
      },
    ],
  },
]);
