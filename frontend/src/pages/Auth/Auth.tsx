import { Outlet } from "react-router-dom";

const Auth = () => {
  return (
    <main className="h-svh flex items-center justify-center">
      <Outlet />
    </main>
  );
};

export default Auth;
