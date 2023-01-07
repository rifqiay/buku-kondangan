import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import jwt_decode from "jwt-decode";
import { useDispatch } from "react-redux";
import { CreateDataUang } from "../../../config/redux/action/Create";

const TambahDataUang = () => {
  const dispatch = useDispatch();
  const token = localStorage.getItem("token");
  const { id } = jwt_decode(token);
  const { handleChange, handleReset, errors, values, handleSubmit, resetForm } =
    useFormik({
      initialValues: {
        nama: "",
        alamat: "",
        jumlah: "",
        user_id: id,
      },
      validationSchema: Yup.object({
        nama: Yup.string().required("Harus diisi"),
        alamat: Yup.string().required("Harus diisi"),
        jumlah: Yup.number().required("Harus diisi"),
      }),
      onSubmit: () => {
        dispatch(CreateDataUang(values));
        resetForm();
      },
    });
  console.log(errors);
  return (
    <>
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
