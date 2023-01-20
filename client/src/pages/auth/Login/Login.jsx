import React, { useState } from "react";
import { BsEye } from "react-icons/bs";
import { BsEyeSlash } from "react-icons/bs";
import { Spinner } from "flowbite-react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useFormik } from "formik";
import { api } from "../../../config/api";
import { login } from "../../../config/featrues/AuthSlice";
import { useDispatch } from "react-redux";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(true);

  const handleShowPassword = () => {
    showPassword ? setShowPassword(false) : setShowPassword(true);
  };

  const { values, handleSubmit, handleChange, handleReset } = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: async () => {
      setLoading(true);
      dispatch(login({ values, toast, setLoading, navigate, handleReset }));
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
          <h1 className="text-3xl font-semibold mb-10 mt-5">Masuk</h1>
          <form onSubmit={handleSubmit}>
            <div className="mt-3">
              <input
                type="email"
                placeholder="Email"
                className="w-full p-3 border-2 border-green-600 shadow-md rounded-md focus:border-2 focus:border-green-700"
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
                Masuk{" "}
                <Spinner color="success" aria-label="Success spinner example" />
              </button>
            ) : (
              <button
                type="submit"
                className="mt-7 rounded-lg bg-green-600 p-3 w-full font-semibold text-white cursor-pointer hover:bg-green-700 text-lg"
              >
                Masuk
              </button>
            )}
          </form>
          <hr className="mt-7 border-t-2 w-4/5 mx-auto " />
          <p className="text-center mt-5 text-md font-semibold">
            Belum punya akun?{" "}
            <span className="text-blue-600 hover:text-blue-700 cursor-pointer">
              <Link to="/register">Daftar disini</Link>
            </span>
          </p>
        </section>
      </div>
    </>
  );
};

export default Login;
