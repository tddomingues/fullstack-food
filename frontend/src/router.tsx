import { createBrowserRouter } from "react-router-dom";

import App from "./App";
import Menu from "./pages/Menu/Menu";
import Drinks from "./pages/Home/Drinks/Drinks";
import Home from "./pages/Home/Home";
import AdminPanel from "./pages/AdminPanel/AdminPanel";
import CreateProducts from "./pages/CreateProducts/CreateProducts";
import Login from "./pages/Auth/Login/Login";
import Register from "./pages/Auth/Register/Register";
import Pizzas from "./pages/Home/Pizzas/Pizzas";
import Burguers from "./pages/Home/Burguers/Burguers";
import AllProducts from "./pages/Home/AllProducts/AllProducts";

const AppRouter = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
        children: [
          {
            path: "/",
            element: <AllProducts />,
          },
          {
            path: "pizzas",
            element: <Pizzas />,
          },
          {
            path: "drinks",
            element: <Drinks />,
          },
          {
            path: "burguers",
            element: <Burguers />,
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
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
    ],
  },
]);

export default AppRouter;
