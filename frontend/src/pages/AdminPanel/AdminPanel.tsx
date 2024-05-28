import { Outlet } from "react-router-dom";

//components
import Navbar from "../../components/Navbar";

const AdminPanel = () => {
  return (
    <>
      <Navbar />
      <main className="py-8 px-32 ">
        <Outlet />
      </main>
    </>
  );
};

export default AdminPanel;
