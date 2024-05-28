import { Outlet } from "react-router-dom";

import { Toaster } from "../src/components/ui/toaster";

function App() {
  return (
    <div className="max-w-[1272px] m-auto px-8">
      <Outlet />
      <Toaster />
    </div>
  );
}

export default App;
