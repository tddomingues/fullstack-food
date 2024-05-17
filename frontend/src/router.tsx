import { createBrowserRouter } from "react-router-dom";

import App from "./App";
import Menu from "./pages/Menu/Menu";
import Drinks from "./pages/Menu/Drinks/Drinks";
import Home from "./pages/Home/Home";
import AdminPanel from "./pages/AdminPanel/AdminPanel";
import CreateProducts from "./pages/CreateProducts/CreateProducts";

const AppRouter = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/menu",
        element: <Menu />,
        children: [
          {
            path: "drinks",
            element: <Drinks />,
          },
        ],
      },
      {
        path: "/admin-painel",
        element: <AdminPanel />,
      },
      {
        path: "/create-products",
        element: <CreateProducts />,
      },
    ],
  },
]);

export default AppRouter;
