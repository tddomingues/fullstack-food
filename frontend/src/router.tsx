import { createBrowserRouter } from "react-router-dom";

import App from "./App";

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
            path: "category/pizza",
            element: <Pizzas />,
          },
          {
            path: "category/drink",
            element: <Drinks />,
          },
          {
            path: "category/burguer",
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
