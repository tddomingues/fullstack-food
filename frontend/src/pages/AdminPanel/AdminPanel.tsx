import { Outlet } from "react-router-dom";
import Navbar from "../../components/Navbar";

const AdminPanel = () => {
  return (
    <>
      <Navbar />
      <main className="py-5 px-32 ">
        <Outlet />
      </main>
    </>
  );
};

export default AdminPanel;
