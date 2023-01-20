import { useFormik } from "formik";
import jwt_decode from "jwt-decode";
import React from "react";
import { useDispatch } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { createDataUang } from "../../../config/featrues/DataUangSlice";

const TambahDataUang = () => {
  const token = localStorage.getItem("token");
  const { id } = jwt_decode(token);
  const dispatch = useDispatch();

  // form
  const { values, handleChange, handleSubmit, handleReset } = useFormik({
    initialValues: {
      nama: "",
      alamat: "",
      jumlah: "",
      user_id: id,
    },
    onSubmit: async () => {
      dispatch(createDataUang({ values, toast, handleReset }));
    },
  });

  return (
    <>
      <ToastContainer autoClose={3000} />
      <h1 className="text-2xl font-semibold text-green-600">Data Uang</h1>
      <form onSubmit={handleSubmit}>
        <div className="mt-3">
          <input
            type="text"
            placeholder="Nama"
            className="w-full rounded-md border-green-600 border-2 focus:border-2 focus:border-green-600 p-3"
            value={values.nama}
            name="nama"
            onChange={handleChange}
          />
        </div>
        <div className="mt-4">
          <input
            type="text"
            placeholder="Alamat"
            className="w-full rounded-md border-green-600 border-2 focus:border-2 focus:border-green-600 p-3"
            value={values.alamat}
            name="alamat"
            onChange={handleChange}
          />
        </div>
        <div className="mt-4">
          <input
            type="number"
            inputMode="decimal"
            placeholder="Jumlah"
            className="w-full rounded-md border-green-600 border-2 focus:border-2 focus:border-green-600 p-3"
            value={values.jumlah}
            name="jumlah"
            onChange={handleChange}
          />
        </div>
        <button className="bg-green-600 p-3 w-full mt-5 text-white font-semibold rounded-md cursor-pointer">
          Tambah
        </button>
      </form>
    </>
  );
};

export default TambahDataUang;
