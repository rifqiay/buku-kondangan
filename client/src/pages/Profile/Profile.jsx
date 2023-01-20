import React from "react";
import { useNavigate } from "react-router-dom";
import NavbarComponent from "../../components/module/Navbar/Navbar";
import { CgProfile } from "react-icons/cg";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { useEffect } from "react";
import { getProfile } from "../../config/featrues/ProfileSlice";
import jwt_decode from "jwt-decode";
import EditProfile from "../../components/module/modals/EditProfile";

const Profile = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isFulfiled = useSelector((state) => state.profile.isFulfiled);
  const user = useSelector((state) => state.profile.user);
  const [saveImage, setSaveImage] = useState(null);
  const token = localStorage.getItem("token");
  const { id } = jwt_decode(token);

  const getData = () => {
    dispatch(getProfile(id));
  };
  useEffect(() => {
    getData();
  }, [id]);

  const handlePhoto = (e) => {
    const selectedFile = e.target.files[0];
    setSaveImage(selectedFile);
  };

  const submitPhoto = () => {
    const formData = new FormData();
    formData.append("photo", saveImage);
  };

  const handleLogOut = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <>
      <NavbarComponent />
      <div className="w-10/12 mx-auto flex flex-col items-center  mt-16">
        <div className="text-gray-600 ">
          <input
            type="file"
            name="photo"
            id="photo"
            className="hidden"
            onChange={handlePhoto}
          />
          <label
            htmlFor="photo"
            className="hover:cursor-pointer"
            title="Edit Foto"
          >
            {user?.photo ? (
              <img src={user?.photo} alt="foto" />
            ) : (
              <CgProfile size="112px" />
            )}
          </label>
        </div>
        {isFulfiled ? (
          <></>
        ) : (
          <div className="mt-10 w-7/12 text-center flex flex-col gap-1">
            <h1 className="text-xl   uppercase">{user?.nama}</h1>
            <h1 className="text-xl">{user?.nomortelepon}</h1>
            <h1 className="text-xl uppercase">{user?.kota}</h1>
          </div>
        )}
        <EditProfile
          nama={user?.nama}
          nomortelepon={user?.nomortelepon}
          kota={user?.kota}
        >
          <button onClick={submitPhoto}>Edit Profile</button>
        </EditProfile>
        <button
          className="bg-red-600 font-semibold text-white px-4 py-2 mt-3 w-7/12 rounded-md hover:bg-red-500"
          onClick={handleLogOut}
        >
          Keluar
        </button>
      </div>
    </>
  );
};

export default Profile;
