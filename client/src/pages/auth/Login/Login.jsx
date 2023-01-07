import React, { useState } from "react";
import { BsEye } from "react-icons/bs";
import { BsEyeSlash } from "react-icons/bs";
import { Spinner } from "flowbite-react";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useDispatch } from "react-redux";
import { LoginAction } from "../../../config/redux/action/Auth";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(true);
  const [loading, setLoading] = useState(false);

  const handleShowPassword = () => {
    showPassword ? setShowPassword(false) : setShowPassword(true);
  };

  const {
    values,
    handleChange,
    errors,
    handleSubmit,
    resetForm,
    handleBlur,
    touched,
  } = useFormik({
    // initial values
    initialValues: {
      email: "",
      password: "",
    },
    // validation
    validationSchema: Yup.object({
      email: Yup.string().required("harus diisi").email("email tidak valid"),
      password: Yup.string()
        .required("harus diisi")
        .min(5, "Minimal 5 karakter Maksimal 10 karakter")
        .max(10, "Maksimal 10 karakter")
        .matches(/[A-Z]/g, "Setidaknya mengandung 1 huruf Kapital"),
    }),
    // onSubmit
    onSubmit: () => {
      setLoading(true);
      dispatch(LoginAction(values, setLoading, navigate, resetForm));
      // axios
      //   .post(`http://localhost:5000/api/auth/login`, values)
      //   .then((res) => console.log(res))
      //   .catch((error) => console.error(error));
      // resetForm();
    },
  });

  return (
    <>
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
                onBlur={handleBlur}
              />
              {errors.email ? (
                <p className="text-red-600" g>
                  {errors.email}
                </p>
              ) : (
                ""
              )}
            </div>
            <div className="mt-5 relative">
              <input
                type={showPassword ? "password" : "text"}
                placeholder="Kata sandi"
                className="w-full p-3 border-2 shadow-md rounded-md border-green-600 focus:border-green-700"
                name="password"
                value={values.password}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {errors.password ? (
                <p className="text-red-600">{errors.password}</p>
              ) : (
                ""
              )}
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
