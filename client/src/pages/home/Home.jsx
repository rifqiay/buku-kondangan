import jwt_decode from "jwt-decode";
import React, { useEffect, useState } from "react";
import { BsSearch } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Card from "../../components/module/Card/Card";
import NavbarComponent from "../../components/module/Navbar/Navbar";
import {
  DataUangSelector,
  getDataUang,
} from "../../config/featrues/DataUangSlice";

const Home = () => {
  const token = localStorage.getItem("token");
  const { id } = jwt_decode(token);
  const [isDeleted, setIsDeleted] = useState(false);
  const dispatch = useDispatch();

  const dataUang = useSelector(DataUangSelector.selectAll);

  const [key, setKey] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    getData();
  };

  const getData = async () => {
    dispatch(getDataUang({ id, key }));
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
          <div className="mx-3 mt-5 relative w-full sm:w-1/2">
            <form onSubmit={handleSearch}>
              <input
                type="search"
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
            Uang
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {dataUang.length > 0 ? (
              dataUang.map((item, key) => (
                <div key={key}>
                  <Card
                    id={key}
                    className="flex justify-between mt-3"
                    nama={item.nama}
                    alamat={item.alamat}
                    jumlah={item.jumlah}
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
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
