import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { hapusUangAction } from "../../../config/redux/action/Get";

const Hapus = ({ children, nama, idTamu }) => {
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);

  const handleDelete = () => {
    // dispatch(hapusUangAction(idTamu, setShow));
    console.log(idTamu);
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
