import { Spinner } from "flowbite-react";
import { useFormik } from "formik";
import React, { useState } from "react";
import { BsEye, BsEyeSlash } from "react-icons/bs";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { register } from "../../../config/featrues/AuthSlice";

const Register = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(true);
  const [loading, setLoading] = useState(false);

  const handleShowPassword = () => {
    showPassword ? setShowPassword(false) : setShowPassword(true);
  };

  const { values, handleSubmit, handleChange, handleReset } = useFormik({
    initialValues: {
      nama: "",
      email: "",
      password: "",
    },
    onSubmit: async () => {
      setLoading(true);
      await dispatch(
        register({ values, toast, setLoading, navigate, handleReset })
      );
    },
  });

  return (
    <>
      <ToastContainer autoClose={3000} />
      <div className="flex h-[100vh]">
        <section className="w-1/2 my-auto mx-auto hidden lg:block">
          <div className="mb-20 text-green-600">
            <h1 className="text-5xl font-semibold">
              Selamat datang di buku kondangan
            </h1>
            <h4 className="text-3xl mt-5">
              Catat dan Cari kehadiran tamu lebih mudah
            </h4>
          </div>
        </section>
        <section className="mx-auto my-auto w-11/12 p-2 rounded-lg sm:w-2/3 lg:w-1/3 md:border-2 md:rounded-lg md:py-10 md:px-5 md:shadow-lg">
          <h1 className="text-3xl font-semibold mb-10 mt-5">Daftar</h1>
          <form onSubmit={handleSubmit}>
            <div className="mt-3">
              <input
                type="text"
                placeholder="Nama Lengkap"
                className="w-full p-3 border-2 shadow-md rounded-md border-green-600 focus:border-green-700"
                name="nama"
                value={values.nama}
                onChange={handleChange}
              />
            </div>
            <div className="mt-5">
              <input
                type="email"
                placeholder="Email"
                className="w-full p-3 border-2 shadow-md rounded-md border-green-600 focus:border-green-700"
                name="email"
                value={values.email}
                onChange={handleChange}
              />
            </div>
            <div className="mt-5 relative">
              <input
                type={showPassword ? "password" : "text"}
                placeholder="Kata sandi"
                className="w-full p-3 border-2 shadow-md rounded-md border-green-600 focus:border-green-700"
                name="password"
                value={values.password}
                onChange={handleChange}
              />
              <p
                className="absolute right-4 top-4 cursor-pointer"
                onClick={handleShowPassword}
              >
                {!showPassword ? <BsEye /> : <BsEyeSlash />}
              </p>
            </div>
            {loading ? (
              <button
                type="submit"
                className="mt-7 rounded-lg bg-green-600 p-3 w-full font-semibold text-white cursor-pointer hover:bg-green-700 text-lg"
              >
                Daftar{" "}
                <Spinner color="success" aria-label="Success spinner example" />
              </button>
            ) : (
              <button
                type="submit"
                className="mt-7 rounded-lg bg-green-600 p-3 w-full font-semibold text-white cursor-pointer hover:bg-green-700 text-lg"
              >
                Daftar
              </button>
            )}
          </form>
          <hr className="mt-7 border-t-2 w-4/5 mx-auto " />
          <p className="text-center mt-5 text-md font-semibold">
            Sudah punya akun?{" "}
            <span className="text-blue-600 hover:text-blue-700 cursor-pointer">
              <Link to="/login">Masuk disini</Link>
            </span>
          </p>
        </section>
      </div>
    </>
  );
};

export default Register;
