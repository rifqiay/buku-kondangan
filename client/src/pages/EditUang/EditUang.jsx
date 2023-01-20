import { useFormik } from "formik";
import jwt_decode from "jwt-decode";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import NavbarComponent from "../../components/module/Navbar/Navbar";
import {
  DataUangSelector,
  getDataUang,
  updateDataUang,
} from "../../config/featrues/DataUangSlice";

const EditUang = () => {
  const token = localStorage.getItem("token");
  const { id } = jwt_decode(token);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const idTamu = useParams();
  const idsTamu = idTamu.id;

  const uang = useSelector((state) =>
    DataUangSelector.selectById(state, idsTamu)
  );

  useEffect(() => {
    dispatch(getDataUang({ id }));
  }, [idsTamu, dispatch, id]);

  // form
  const { values, handleChange, handleSubmit, handleReset } = useFormik({
    initialValues: {
      nama: uang.nama,
      alamat: uang.alamat,
      jumlah: uang.jumlah,
    },
    onSubmit: () => {
      dispatch(
        updateDataUang({ values, handleReset, idsTamu, navigate, toast })
      );
    },
  });
  return (
    <>
      <NavbarComponent />
      <div className="w-10/12 mx-auto">
        <h1 className="mt-20 text-lg font-semibold mb-5">Edit Data Uang</h1>
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
          <button className="bg-green-600 p-3 w-full mt-5 text-white font-semibold rounded-md cursor-pointer hover:bg-green-500">
            Edit
          </button>
        </form>
      </div>
    </>
  );
};

export default EditUang;
