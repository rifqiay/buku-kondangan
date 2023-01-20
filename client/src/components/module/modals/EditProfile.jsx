import { useFormik } from "formik";
import jwt_decode from "jwt-decode";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { editProfile } from "../../../config/featrues/ProfileSlice";

const EditProfile = ({ children }) => {
  const [show, setShow] = useState(false);
  const token = localStorage.getItem("token");
  const { id } = jwt_decode(token);
  const dispatch = useDispatch();

  const user = useSelector((state) => state.profile.user);

  const { values, handleSubmit, handleChange, handleReset } = useFormik({
    initialValues: {
      nama: user.nama,
      nomortelepon: user.nomortelepon,
      kota: user.kota,
    },
    onSubmit: () => {
      dispatch(editProfile({ id, values }));
      handleReset();
      setShow(false);
    },
  });

  return (
    <>
      <div
        className="bg-green-600 font-semibold text-white px-4 py-2 mt-10 w-7/12 rounded-md flex justify-center hover:bg-green-500"
        onClick={() => setShow(true)}
      >
        {children}
      </div>
      {show ? (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white w-10/12 p-3 rounded-md  sm:w-1/3">
            <form>
              <input
                type="text"
                name="nama"
                className="w-full p-3 rounded-md focus:outline-none mt-3"
                placeholder="nama"
                value={values.nama}
                onChange={handleChange}
              />
              <input
                type="text"
                name="nomortelepon"
                className="w-full p-3 rounded-md focus:outline-none mt-3"
                placeholder="Nomor Telepon"
                value={values.nomortelepon}
                onChange={handleChange}
              />
              <input
                type="text"
                name="kota"
                className="w-full p-3 rounded-md focus:outline-none mt-3"
                placeholder="Kota"
                value={values.kota}
                onChange={handleChange}
              />
            </form>
            <div className="mt-5 flex justify-end gap-3">
              <button
                className="bg-red-600 text-white py-1 px-4 rounded-md font-semibold hover:bg-red-500"
                onClick={handleSubmit}
              >
                Ya
              </button>
              <button
                className="bg-green-500 text-white py-1 px-4 rounded-md font-semibold hover:bg-green-400"
                onClick={() => {
                  setShow(false);
                  handleReset();
                }}
              >
                Batal
              </button>
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
    </>
  );
};

export default EditProfile;
