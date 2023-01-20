import React, { useEffect } from "react";
import NavbarComponent from "../../components/module/Navbar/Navbar";
import { useFormik } from "formik";
import jwt_decode from "jwt-decode";
import { useDispatch, useSelector } from "react-redux";
import {
  DataBarangSelector,
  getDataBarang,
  updateDataBarang,
} from "../../config/featrues/DataBarangSlice";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const EditBarang = () => {
  const token = localStorage.getItem("token");
  const { id } = jwt_decode(token);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const idTamu = useParams();
  const idsTamu = idTamu.id;

  const barang = useSelector((state) =>
    DataBarangSelector.selectById(state, idsTamu)
  );

  useEffect(() => {
    dispatch(getDataBarang({ id }));
  }, [idsTamu, dispatch, id]);

  // form
  const { values, handleChange, handleSubmit, handleReset } = useFormik({
    initialValues: {
      nama: barang.nama,
      alamat: barang.alamat,
      barang: barang.barang,
    },
    onSubmit: async () => {
      dispatch(
        updateDataBarang({ values, handleReset, idsTamu, navigate, toast })
      );
      // try {
      //   // const response = await api.post("barang/create", values);
      //   console.log(values);
      //   handleReset();
      //   // toast.success(response.data.message);
      // } catch (error) {
      //   console.log(error);
      // }
    },
  });
  return (
    <>
      <NavbarComponent />
      <div className="w-10/12 mx-auto">
        <h1 className="mt-20 mb-5 text-lg font-semibold">Edit Data Barang</h1>
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
              type="text"
              placeholder="Barang"
              className="w-full rounded-md border-green-600 border-2 focus:border-2 focus:border-green-600 p-3"
              value={values.barang}
              name="barang"
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

export default EditBarang;
