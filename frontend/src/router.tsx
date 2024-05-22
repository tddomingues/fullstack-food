import { createBrowserRouter } from "react-router-dom";

import App from "./App";

import Drinks from "./pages/Products/Drinks/Drinks";
import Products from "./pages/Products/Products";

import Login from "./pages/Auth/Login/Login";
import Register from "./pages/Auth/Register/Register";
import Pizzas from "./pages/Products/Pizzas/Pizzas";
import Burguers from "./pages/Products/Burguers/Burguers";
import AllProducts from "./pages/Products/AllProducts/AllProducts";
import ProtectLoggedRoute from "./components/ProtectLoggedRoute";
import CheckOrderInformation from "./pages/CheckOrderInformation/CheckOrderInformation";
import Auth from "./pages/Auth/Auth";
import CreateProducts from "./pages/AdminPanel/CreateProducts/CreateProducts";
import EditProduct from "./pages/AdminPanel/EditProduct/EditProduct";
import AdminPanel from "./pages/AdminPanel/AdminPanel";

const AppRouter = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Products />,
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
        children: [
          {
            path: "create-product",
            element: <CreateProducts />,
          },
          {
            path: "edit-product",
            element: <EditProduct />,
          },
        ],
      },
      {
        path: "/check-order-information",
        element: <CheckOrderInformation />,
      },

      {
        path: "/",
        element: (
          <ProtectLoggedRoute>
            <Auth />
          </ProtectLoggedRoute>
        ),
        children: [
          {
            path: "login",
            element: <Login />,
          },
          {
            path: "register",
            element: <Register />,
          },
        ],
      },
      {
        path: "/register",
        element: (
          <ProtectLoggedRoute>
            <Register />
          </ProtectLoggedRoute>
        ),
      },
    ],
  },
]);

export default AppRouter;
