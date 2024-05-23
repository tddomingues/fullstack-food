import { Outlet } from "react-router-dom";

import { ToastContainer } from "react-toastify";
function App() {
  return (
    <>
      <Outlet />
      <ToastContainer autoClose={2000} />
    </>
  );
}

export default App;
