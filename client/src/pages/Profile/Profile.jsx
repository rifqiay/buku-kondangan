import React from "react";
import { useNavigate } from "react-router-dom";
import NavbarComponent from "../../components/module/Navbar/Navbar";

const Profile = () => {
  const navigate = useNavigate();

  const handleLogOut = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };
  return (
    <>
      <NavbarComponent />
      <div>Profile</div>
      <button
        className="bg-red-600 font-semibold text-white px-4 py-2 rounded-md hover:bg-red-500"
        onClick={handleLogOut}
      >
        Keluar
      </button>
    </>
  );
};

export default Profile;
