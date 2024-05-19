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
import ProtectedRoute from "./components/ProtectedRoute/ProtectLoggedRoute";
import ProtectLoggedRoute from "./components/ProtectedRoute/ProtectLoggedRoute";
import CheckOrderInformation from "./pages/CheckOrderInformation/CheckOrderInformation";

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
        path: "/check-order-information",
        element: <CheckOrderInformation />,
      },
      {
        path: "/create-products",
        element: <CreateProducts />,
      },
      {
        path: "/login",
        element: (
          <ProtectLoggedRoute>
            <Login />
          </ProtectLoggedRoute>
        ),
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
