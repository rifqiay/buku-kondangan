import React, { useEffect, useState } from "react";
import jwt_decode from "jwt-decode";
import NavbarComponent from "../../components/module/Navbar/Navbar";
import { BsSearch } from "react-icons/bs";
import Card from "../../components/module/Card/Card";
import { useDispatch, useSelector } from "react-redux";
import { api } from "../../config/api";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  DataBarangSelector,
  getDataBarang,
} from "../../config/featrues/DataBarangSlice";

const Barang = () => {
  const token = localStorage.getItem("token");
  const { id } = jwt_decode(token);
  const [key, setKey] = useState("");
  const [isDeleted, setIsDeleted] = useState(false);
  const dispatch = useDispatch();

  const barang = useSelector(DataBarangSelector.selectAll);

  const handleSearch = (e) => {
    e.preventDefault();
    getData();
  };

  const getData = async () => {
    dispatch(getDataBarang({ id, key }));
  };

  useEffect(() => {
    if (!key) {
      getData();
    }
  }, [key]);

  useEffect(() => {
    if (isDeleted) {
      getData();
    }
  }, [isDeleted]);

  return (
    <>
      <NavbarComponent />
      <ToastContainer />
      <div className="w-11/12 mx-auto">
        <div className="flex justify-end">
          <div className="mx-3 mt-5 w-full sm:w-1/2 relative">
            <form onSubmit={handleSearch}>
              <input
                type="text"
                placeholder="Cari nama"
                className="border-2 border-green-600 w-full focus:border-green-600 rounded-sm"
                onChange={(e) => setKey(e.target.value)}
              />
              <div
                className="absolute right-1 top-1 cursor-pointer bg-green-200 px-4 py-2"
                onClick={handleSearch}
              >
                <BsSearch size="20px" />
              </div>
            </form>
          </div>
        </div>
        <div className="md:px-4">
          <h1 className="text-2xl my-3 ml-3 font-semibold text-green-600">
            Barang
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {barang.length > 0 ? (
              barang.map((item, key) => (
                <div key={key}>
                  <Card
                    id={key}
                    className="flex justify-between mt-3"
                    nama={item.nama}
                    alamat={item.alamat}
                    barang={item.barang}
                    idTamu={item.id}
                    setIsDeleted={setIsDeleted}
                    toast={toast}
                  />
                </div>
              ))
            ) : (
              <div>
                <p>Data tidak ada</p>
              </div>
            )}
            {/* {getBarang.map((item, key) => (
              <div key={key}>
                <Card
                  id={key}
                  nama={item.nama}
                  alamat={item.alamat}
                  barang={item.barang}
                  idTamu={item.id}
                />
              </div>
            ))} */}
          </div>
        </div>
      </div>
    </>
  );
};

export default Barang;
