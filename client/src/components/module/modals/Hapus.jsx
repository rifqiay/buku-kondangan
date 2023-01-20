import React, { useState } from "react";
import jwt_decode from "jwt-decode";
import { useLocation } from "react-router-dom";
import { api } from "../../../config/api";
import { deleteDataUang } from "../../../config/featrues/DataUangSlice";
import { useDispatch } from "react-redux";
import { deleteDataBarang } from "../../../config/featrues/DataBarangSlice";

const Hapus = ({
  children,
  nama,
  idTamu,
  setIsDeleted,
  toast,
  setIsChecked,
}) => {
  const location = useLocation();
  const [show, setShow] = useState(false);
  const token = localStorage.getItem("token");
  const { id } = jwt_decode(token);
  const dispatch = useDispatch();

  const handleDelete = async () => {
    if (location.pathname === "/home") {
      dispatch(
        deleteDataUang({ idTamu, toast, setIsDeleted, setShow, setIsChecked })
      );
    } else {
      dispatch(
        deleteDataBarang({ idTamu, toast, setIsDeleted, setShow, setIsChecked })
      );
      // try {
      //   const response = await api.delete(`barang/delete/${idTamu}`);
      //   console.log(response);
      //   toast.success(response.data.message);
      //   setIsDeleted(true);
      //   setShow(false);
      //   setIsChecked();
      //   setTimeout(() => {
      //     setIsDeleted(false);
      //   }, 1000);
      // } catch (error) {
      //   console.log(error);
      // }
    }
  };

  return (
    <>
      <div onClick={() => setShow(true)}>{children}</div>
      {show ? (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white w-10/12 p-3 rounded-md  sm:w-1/3">
            <h1 className="text-xl font-semibold text-center">
              Yakin ingin menghapus{" "}
              <span className="font-bold uppercase">{nama}?</span>
            </h1>

            <p className="text-red-600 mt-3">
              Data yang sudah dihapus tidak dapat dikembalikan/hilang permanen
            </p>
            <div className="mt-5 flex justify-end gap-3">
              <button
                className="bg-red-600 text-white py-1 px-4 rounded-md font-semibold hover:bg-red-500"
                onClick={handleDelete}
              >
                Ya
              </button>
              <button
                className="bg-green-500 text-white py-1 px-4 rounded-md font-semibold hover:bg-green-400"
                onClick={() => setShow(false)}
              >
                Batal
              </button>
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
    </>
  );
};

export default Hapus;
