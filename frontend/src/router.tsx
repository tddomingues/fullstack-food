import { createBrowserRouter } from "react-router-dom";

//components
import ProtectLoggedRoute from "./components/ProtectLoggedRoute";

//pages
import App from "./App";
import Drinks from "./pages/Products/Drinks/Drinks";
import Products from "./pages/Products/Products";
import Login from "./pages/Auth/Login/Login";
import Register from "./pages/Auth/Register/Register";
import Burguers from "./pages/Products/Burguers/Burguers";
import AllProducts from "./pages/Products/AllProducts/AllProducts";
import CheckOrder from "./pages/CheckOrder/CheckOrder";
import Auth from "./pages/Auth/Auth";
import CreateProducts from "./pages/AdminPanel/CreateProducts/CreateProducts";
import EditProduct from "./pages/AdminPanel/EditProduct/EditProduct";
import AdminPanel from "./pages/AdminPanel/AdminPanel";
import SuccessfulPayment from "./pages/SuccessfulPayment/SuccessfulPayment";
import Orders from "./pages/Orders/Orders";
import ProtectNonLoggedRoute from "./components/ProtectNonLoggedRoute";

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
            path: "edit-product/:id",
            element: <EditProduct />,
          },
        ],
      },
      {
        path: "/check-order",
        element: (
          <ProtectNonLoggedRoute>
            <CheckOrder />
          </ProtectNonLoggedRoute>
        ),
      },
      {
        path: "/successful-payment",
        element: <SuccessfulPayment />,
      },
      {
        path: "/orders/:id",
        element: (
          <ProtectNonLoggedRoute>
            <Orders />
          </ProtectNonLoggedRoute>
        ),
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
    ],
  },
]);

export default AppRouter;
