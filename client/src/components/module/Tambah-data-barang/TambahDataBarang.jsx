import React from "react";
import * as Yup from "yup";
import jwt_decode from "jwt-decode";
import { useFormik } from "formik";
import { useDispatch } from "react-redux";
import { CreateDataBarang } from "../../../config/redux/action/Create";

const TambahDataBarang = () => {
  const dispatch = useDispatch();
  const token = localStorage.getItem("token");
  const { id } = jwt_decode(token);
  const { handleChange, handleReset, handleSubmit, values, errors, resetForm } =
    useFormik({
      initialValues: {
        nama: "",
        alamat: "",
        barang: "",
        user_id: id,
      },
      validationSchema: Yup.object({
        nama: Yup.string().required("Harus diisi"),
        alamat: Yup.string().required("Harus diisi"),
        barang: Yup.string().required("Harus diisi"),
      }),
      onSubmit: () => {
        dispatch(CreateDataBarang(values));
        resetForm();
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
            name="nama"
            value={values.nama}
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
