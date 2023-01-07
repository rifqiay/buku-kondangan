import React, { useState } from "react";
import { BsEye } from "react-icons/bs";
import { BsEyeSlash } from "react-icons/bs";
import { Spinner } from "flowbite-react";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { RegisterAction } from "../../../config/redux/action/Auth";

const Register = () => {
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
      nama: "",
      email: "",
      password: "",
    },
    // validation
    validationSchema: Yup.object({
      nama: Yup.string().required("harus diisi"),
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
      dispatch(RegisterAction(values, resetForm, setLoading, navigate));
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
          <h1 className="text-3xl font-semibold mb-10 mt-5">Daftar</h1>
          <form onSubmit={handleSubmit}>
            <div className="mt-3">
              <input
                type="text"
                placeholder="Nama Lengkap"
                className="w-full p-3 border-2 shadow-md rounded-md border-green-600 focus:border-green-700"
                value={values.nama}
                name="nama"
                onChange={handleChange}
              />
              {errors.nama ? (
                <p className="text-red-600" g>
                  {errors.nama}
                </p>
              ) : (
                ""
              )}
            </div>
            <div className="mt-5">
              <input
                type="email"
                placeholder="Email"
                className="w-full p-3 border-2 shadow-md rounded-md border-green-600 focus:border-green-700"
                value={values.email}
                name="email"
                onChange={handleChange}
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
                value={values.password}
                name="password"
                onChange={handleChange}
              />
              {errors.password ? (
                <p className="text-red-600" g>
                  {errors.password}
                </p>
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
