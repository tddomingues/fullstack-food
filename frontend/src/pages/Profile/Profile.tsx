import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../../components/Navbar";

const Profile = () => {
  return (
    <>
      <Navbar />
      <main className="py-6 px-32 ">
        <Outlet />
      </main>
    </>
  );
};

export default Profile;
