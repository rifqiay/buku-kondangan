import React from "react";
import jwt_decode from "jwt-decode";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { api } from "../../../config/api";
import { useDispatch } from "react-redux";
import { createDataBarang } from "../../../config/featrues/DataBarangSlice";

const TambahDataBarang = () => {
  const token = localStorage.getItem("token");
  const { id } = jwt_decode(token);
  const dispatch = useDispatch();

  // form
  const { values, handleChange, handleSubmit, handleReset } = useFormik({
    initialValues: {
      nama: "",
      alamat: "",
      barang: "",
      user_id: id,
    },
    onSubmit: async () => {
      dispatch(createDataBarang({ values, toast, handleReset }));
      // try {
      //   const response = await api.post("barang/create", values);
      //   handleReset();
      //   toast.success(response.data.message);
      // } catch (error) {
      //   console.log(error);
      // }
    },
  });

  return (
    <>
      <h1 className="text-2xl font-semibold text-green-600">Data Barang</h1>
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
            name="alamat"
            value={values.alamat}
            onChange={handleChange}
          />
        </div>
        <div className="mt-4">
          <input
            type="text"
            placeholder="Barang"
            className="w-full rounded-md border-green-600 border-2 focus:border-2 focus:border-green-600 p-3"
            name="barang"
            value={values.barang}
            onChange={handleChange}
          />
        </div>
        <button
          type="submit"
          className="bg-green-600 p-3 w-full mt-5 text-white font-semibold rounded-md cursor-pointer"
        >
          Tambah
        </button>
      </form>
    </>
  );
};

export default TambahDataBarang;
