import { Outlet } from "react-router-dom";

import { Toaster } from "../src/components/ui/toaster";

function App() {
  return (
    <>
      <Outlet />
      <Toaster />
    </>
  );
}

export default App;
